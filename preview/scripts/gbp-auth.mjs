#!/usr/bin/env node
/**
 * Einmaliger OAuth2-Flow für Google Business Profile.
 * Öffnet Browser, holt User-Consent, gibt Refresh-Token aus.
 *
 *   GBP_CLIENT_ID=xxx GBP_CLIENT_SECRET=xxx node scripts/gbp-auth.mjs
 *
 * Den ausgegebenen REFRESH_TOKEN in
 *   C:/brain/11 Zugänge & Sicherheit/API PRIVAT.txt
 * als `gbp_refresh_token` ablegen.
 */
import http from 'node:http'
import { exec } from 'node:child_process'
import { google } from 'googleapis'

const PORT = 8723
const REDIRECT = `http://localhost:${PORT}/oauth`

const CLIENT_ID = process.env.GBP_CLIENT_ID
const CLIENT_SECRET = process.env.GBP_CLIENT_SECRET
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing GBP_CLIENT_ID / GBP_CLIENT_SECRET env vars')
  process.exit(1)
}

const oauth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT)

const authUrl = oauth2.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: ['https://www.googleapis.com/auth/business.manage'],
})

console.log('\nOpening browser for Google consent...')
console.log('If it does not open: ' + authUrl + '\n')

const opener = process.platform === 'win32' ? 'start ""' :
               process.platform === 'darwin' ? 'open' : 'xdg-open'
exec(`${opener} "${authUrl}"`)

http.createServer(async (req, res) => {
  if (!req.url.startsWith('/oauth')) {
    res.writeHead(404); return res.end()
  }
  const code = new URL(req.url, REDIRECT).searchParams.get('code')
  if (!code) { res.writeHead(400); return res.end('no code') }
  try {
    const { tokens } = await oauth2.getToken(code)
    console.log('\n=== SUCCESS ===')
    console.log('GBP_REFRESH_TOKEN=' + tokens.refresh_token)
    console.log('Scope: ' + tokens.scope)
    console.log('Expiry: ' + new Date(tokens.expiry_date).toISOString())
    console.log('===============\n')
    res.end('Done. Check your terminal for the refresh token.')
    setTimeout(() => process.exit(0), 500)
  } catch (e) {
    console.error('Token-Exchange fehlgeschlagen:', e.message)
    res.writeHead(500); res.end(e.message)
    process.exit(1)
  }
}).listen(PORT, () => console.log(`Listening on ${REDIRECT}`))
