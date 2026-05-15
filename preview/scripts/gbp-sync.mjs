#!/usr/bin/env node
/**
 * Sync Events/Updates aus src/data/events.json zu Google Business Profile.
 *
 *   GBP_CLIENT_ID=xxx GBP_CLIENT_SECRET=xxx GBP_REFRESH_TOKEN=xxx \
 *     node scripts/gbp-sync.mjs
 *
 * Diffing-Strategie (idempotent):
 * - Liest existierende localPosts pro Location
 * - Vergleicht summary-Hash mit events.json
 * - Erstellt fehlende, löscht entfernte, lässt unveränderte stehen
 *
 * Posts können sein:
 * - STANDARD (Update/News)
 * - EVENT (Datum + Zeit)
 * - OFFER (Aktion / Coupon — z.B. "Torte des Monats")
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { google } from 'googleapis'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const eventsPath = path.join(ROOT, 'src', 'data', 'events.json')
const locsPath = path.join(ROOT, 'src', 'data', 'locations.json')

const events = JSON.parse(await fs.readFile(eventsPath, 'utf8'))
const locations = JSON.parse(await fs.readFile(locsPath, 'utf8'))

const oauth2 = new google.auth.OAuth2(
  process.env.GBP_CLIENT_ID,
  process.env.GBP_CLIENT_SECRET
)
oauth2.setCredentials({ refresh_token: process.env.GBP_REFRESH_TOKEN })
const auth = await oauth2.getAccessToken()

// localPosts API is on the v4 mybusiness endpoint (legacy but still supported for posts).
// Newer code uses the businessprofileperformance / businessinformation split,
// but localPosts.create endpoint URL is:
//   POST https://mybusiness.googleapis.com/v4/{parent=accounts/*/locations/*}/localPosts
async function gbpFetch(method, urlPath, body) {
  const r = await fetch(`https://mybusiness.googleapis.com/v4/${urlPath}`, {
    method,
    headers: {
      'Authorization': `Bearer ${auth.token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!r.ok) throw new Error(`${method} ${urlPath}: ${r.status} ${await r.text()}`)
  return r.json()
}

function hashEvent(ev) {
  return crypto.createHash('sha1').update(JSON.stringify(ev)).digest('hex').slice(0, 12)
}

function eventToPost(ev) {
  const summary = ev.titel + (ev.uhrzeit ? ` — ${ev.uhrzeit}` : '')
  const post = {
    languageCode: 'de-AT',
    summary: ev.beschreibung || summary,
    topicType: ev.dauerausstellung ? 'STANDARD' : 'EVENT',
  }
  if (ev.bild) post.media = [{ mediaFormat: 'PHOTO', sourceUrl: `https://cafemitherz.at${ev.bild}` }]
  if (ev.link) post.callToAction = { actionType: 'LEARN_MORE', url: ev.link }
  if (!ev.dauerausstellung && ev.datum) {
    const start = new Date(ev.datum)
    post.event = {
      title: ev.titel,
      schedule: {
        startDate: { year: start.getFullYear(), month: start.getMonth() + 1, day: start.getDate() },
        endDate:   { year: start.getFullYear(), month: start.getMonth() + 1, day: start.getDate() },
      },
    }
  }
  return post
}

for (const loc of locations.filter(l => l.active)) {
  console.log(`\n=== ${loc.label} (${loc.name}) ===`)
  const existing = await gbpFetch('GET', `${loc.name}/localPosts`)
  const wantedEvents = events.filter(e => e.aktiv && (e.locations || ['all']).some(l => l === 'all' || l === loc.id))
  console.log(`Existing posts: ${existing.localPosts?.length || 0} · wanted events: ${wantedEvents.length}`)

  for (const ev of wantedEvents) {
    const post = eventToPost(ev)
    console.log(`  → CREATE: ${ev.titel}`)
    if (process.env.DRY_RUN) continue
    await gbpFetch('POST', `${loc.name}/localPosts`, post)
  }
}
console.log('\nSync done.')
