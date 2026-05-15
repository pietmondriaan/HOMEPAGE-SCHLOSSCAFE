#!/usr/bin/env node
/**
 * Listet alle Locations + Account-IDs auf, auf die der OAuth-User Zugriff hat.
 * Einmalig ausführen, dann die Location-Namen (Format: "accounts/{aid}/locations/{lid}")
 * in src/data/locations.json hinterlegen.
 */
import { google } from 'googleapis'

const oauth2 = new google.auth.OAuth2(
  process.env.GBP_CLIENT_ID,
  process.env.GBP_CLIENT_SECRET
)
oauth2.setCredentials({ refresh_token: process.env.GBP_REFRESH_TOKEN })

const accountMgmt = google.mybusinessaccountmanagement({ version: 'v1', auth: oauth2 })
const bizInfo = google.mybusinessbusinessinformation({ version: 'v1', auth: oauth2 })

const { data: { accounts = [] } } = await accountMgmt.accounts.list()
if (!accounts.length) {
  console.log('Keine Accounts gefunden.')
  process.exit(0)
}

for (const acc of accounts) {
  console.log(`\nAccount: ${acc.name}  (${acc.accountName || acc.type})`)
  const locResp = await bizInfo.accounts.locations.list({
    parent: acc.name,
    readMask: 'name,title,storefrontAddress,phoneNumbers,websiteUri,categories',
  })
  for (const loc of locResp.data.locations || []) {
    console.log(`  - ${loc.name}`)
    console.log(`    title:   ${loc.title}`)
    console.log(`    addr:    ${loc.storefrontAddress?.addressLines?.join(', ')}, ${loc.storefrontAddress?.locality}`)
    console.log(`    phone:   ${loc.phoneNumbers?.primaryPhone}`)
    console.log(`    website: ${loc.websiteUri}`)
    console.log(`    cats:    ${loc.categories?.primaryCategory?.displayName}`)
  }
}
