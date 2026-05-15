#!/usr/bin/env node
/**
 * Sync events from src/data/events.json to Google Business Profile posts.
 *
 *   GBP_CLIENT_ID=... GBP_CLIENT_SECRET=... GBP_REFRESH_TOKEN=... \
 *     node scripts/gbp-sync.mjs
 *
 * By default runs in DRY_RUN mode (no API writes).
 * To execute for real:   DRY_RUN=0 node scripts/gbp-sync.mjs
 *
 * Idempotency strategy:
 * - scripts/.gbp-sync-state.json tracks which event-hash maps to which post-name
 * - On each run: CREATE for new hashes, DELETE for removed hashes,
 *   KEEP unchanged hashes untouched
 * - State file is committed to git so CI runs share knowledge
 *
 * The Posts API runs on legacy v4 mybusiness.googleapis.com endpoint.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { google } from 'googleapis'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DRY_RUN = process.env.DRY_RUN !== '0'
const VERBOSE = process.env.VERBOSE === '1'

const log = (...a) => console.log(...a)
const dbg = (...a) => VERBOSE && console.log('  [dbg]', ...a)

if (DRY_RUN) log('DRY_RUN mode — no API writes. Set DRY_RUN=0 to execute.')

// --- Load config files ------------------------------------------------------

const eventsPath = path.join(ROOT, 'src', 'data', 'events.json')
const locsPath = path.join(ROOT, 'src', 'data', 'locations.json')
const statePath = path.join(__dirname, '.gbp-sync-state.json')

const events = JSON.parse(await fs.readFile(eventsPath, 'utf8'))
const locations = JSON.parse(await fs.readFile(locsPath, 'utf8'))
let state = { version: 1, byLocation: {} }
try { state = JSON.parse(await fs.readFile(statePath, 'utf8')) } catch {}

// --- Auth -------------------------------------------------------------------

for (const v of ['GBP_CLIENT_ID', 'GBP_CLIENT_SECRET', 'GBP_REFRESH_TOKEN']) {
  if (!process.env[v]) { console.error(`Missing env ${v}`); process.exit(1) }
}
const oauth2 = new google.auth.OAuth2(process.env.GBP_CLIENT_ID, process.env.GBP_CLIENT_SECRET)
oauth2.setCredentials({ refresh_token: process.env.GBP_REFRESH_TOKEN })
const { token } = await oauth2.getAccessToken()

// --- API helper -------------------------------------------------------------

async function gbpFetch(method, urlPath, body) {
  const url = urlPath.startsWith('http')
    ? urlPath
    : `https://mybusiness.googleapis.com/v4/${urlPath.replace(/^\//, '')}`
  dbg(`${method} ${url}`)
  const r = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await r.text()
  if (!r.ok) throw new Error(`${method} ${urlPath} → ${r.status}: ${text}`)
  return text ? JSON.parse(text) : {}
}

// --- Hashing & transformation ----------------------------------------------

function eventHash(ev) {
  // Hash everything that ends up in the post — title, desc, dates, link, image.
  const payload = {
    titel: ev.titel,
    beschreibung: ev.beschreibung,
    datum: ev.datum,
    uhrzeit: ev.uhrzeit ?? null,
    bild: ev.bild ?? null,
    link: ev.link ?? null,
    dauerausstellung: !!ev.dauerausstellung,
  }
  return crypto.createHash('sha1').update(JSON.stringify(payload)).digest('hex').slice(0, 12)
}

function eventToPost(ev) {
  const fullSummary = ev.beschreibung || ev.titel
  // GBP-Post-Summary-Limit ist 1500 Zeichen — gut beschnitten für Twitter-ähnliche Posts
  const summary = fullSummary.length > 1400 ? fullSummary.slice(0, 1397) + '...' : fullSummary

  const post = {
    languageCode: 'de-AT',
    summary,
    topicType: ev.dauerausstellung ? 'STANDARD' : (ev.datum ? 'EVENT' : 'STANDARD'),
  }

  if (ev.bild) {
    post.media = [{ mediaFormat: 'PHOTO', sourceUrl: `https://cafemitherz.at${ev.bild}` }]
  }
  if (ev.link) {
    post.callToAction = { actionType: 'LEARN_MORE', url: ev.link }
  }

  if (!ev.dauerausstellung && ev.datum) {
    const d = new Date(ev.datum)
    const ymd = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() }
    post.event = {
      title: ev.titel,
      schedule: { startDate: ymd, endDate: ymd },
    }
  }

  return post
}

// --- Diff & sync per location ----------------------------------------------

let totalCreate = 0, totalDelete = 0, totalKeep = 0, totalErr = 0

for (const loc of locations.filter(l => l.active)) {
  log('')
  log(`=== ${loc.label} (${loc.id}) ===`)
  if (!loc.name || loc.name.startsWith('TBD')) {
    log('  ⚠ location.name nicht gesetzt — überspringe (zuerst gbp-list-locations.mjs ausführen)')
    continue
  }

  const locState = state.byLocation[loc.id] || []
  const locStateByHash = new Map(locState.map(s => [s.hash, s]))

  const wantedForLoc = events.filter(e =>
    e.aktiv &&
    (e.locations || ['all']).some(l => l === 'all' || l === loc.id)
  )
  const wantedByHash = new Map()
  for (const ev of wantedForLoc) {
    const h = eventHash(ev)
    wantedByHash.set(h, ev)
  }

  const nextLocState = []

  // CREATE / KEEP
  for (const [h, ev] of wantedByHash) {
    const existing = locStateByHash.get(h)
    if (existing) {
      log(`  = KEEP   ${ev.titel} (hash ${h})`)
      nextLocState.push(existing)
      totalKeep++
    } else {
      log(`  + CREATE ${ev.titel} (hash ${h})`)
      if (DRY_RUN) {
        nextLocState.push({ eventId: ev.id, hash: h, postName: `dry:${h}`, syncedAt: new Date().toISOString() })
      } else {
        try {
          const post = eventToPost(ev)
          const created = await gbpFetch('POST', `${loc.name}/localPosts`, post)
          nextLocState.push({ eventId: ev.id, hash: h, postName: created.name, syncedAt: new Date().toISOString() })
          totalCreate++
        } catch (e) {
          console.error(`    ✗ create failed:`, e.message)
          totalErr++
        }
      }
    }
  }

  // DELETE: posts present in state but no longer wanted
  for (const [h, s] of locStateByHash) {
    if (!wantedByHash.has(h)) {
      log(`  - DELETE old post (hash ${h}, name ${s.postName})`)
      if (!DRY_RUN && !s.postName.startsWith('dry:')) {
        try {
          await gbpFetch('DELETE', s.postName)
          totalDelete++
        } catch (e) {
          console.error(`    ✗ delete failed:`, e.message)
          totalErr++
        }
      }
    }
  }

  state.byLocation[loc.id] = nextLocState
}

// --- Persist state ---------------------------------------------------------

state.lastSync = new Date().toISOString()
state.lastSyncDryRun = DRY_RUN

if (!DRY_RUN) {
  await fs.writeFile(statePath, JSON.stringify(state, null, 2) + '\n', 'utf8')
  log(`\nState written: ${path.relative(ROOT, statePath)}`)
}

log(`\nDone. CREATE=${totalCreate}  DELETE=${totalDelete}  KEEP=${totalKeep}  ERR=${totalErr}` + (DRY_RUN ? ' (DRY_RUN)' : ''))
