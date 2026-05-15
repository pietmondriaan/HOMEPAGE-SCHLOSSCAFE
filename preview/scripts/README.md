# GBP Sync Scripts — Google Business Profile Integration

Synct Events/Updates aus der Astro-Site nach Google Business Profile
für **Cafe Reinhart** (später auch **Schloss-Café Bleiburg**).

## Setup (einmalig)

1. **API-Zugriff beantragen** bei Google
   → https://developers.google.com/my-business/content/prereqs#request-access
   Mailadresse: `m.pietrowski@gmail.com` · GCP-Projekt-ID eintragen

2. **APIs aktivieren** in der Google Cloud Console (Project von Michael)
   - My Business Account Management API
   - My Business Business Information API
   - My Business Posts API ← die wichtigste fürs Sync
   - Business Profile Performance API

3. **OAuth2 Credentials anlegen** → Desktop App Client
   - `client_id` + `client_secret` → in `11 Zugänge & Sicherheit/API PRIVAT.txt`
     als `gbp_client_id` / `gbp_client_secret`

4. **Refresh-Token holen** (einmalig im Browser-Flow):
   ```sh
   GBP_CLIENT_ID=... GBP_CLIENT_SECRET=... node scripts/gbp-auth.mjs
   ```
   Ausgabe `REFRESH_TOKEN=...` in API PRIVAT.txt als `gbp_refresh_token`

5. **Locations auflisten** (einmalig, Location-Name in events-Daten hinterlegen):
   ```sh
   node scripts/gbp-list-locations.mjs
   ```

## Sync ausführen

```sh
GBP_CLIENT_ID=... GBP_CLIENT_SECRET=... GBP_REFRESH_TOKEN=... \
node scripts/gbp-sync.mjs
```

## Trigger

- **Manuell:** lokal ausführen wenn Events ändern
- **Automatisch:** GitHub Action `.github/workflows/gbp-sync.yml` läuft bei Push zu `main`
- **Wöchentlich:** Cloudflare Worker mit Cron-Trigger (alternativ)

## Daten-Quelle

Single Source of Truth: `src/data/events.json` — wird sowohl von `index.astro`
importiert als auch von diesem Script gelesen. Bei Änderung also EINMAL editieren.

## Status

⏳ Wartet auf:
- API-Access-Freischaltung von Google (1-2 Wochen üblich)
- Oli muss Schloss-Café-Listing übergeben (separater GBP-Account)

→ Setup-Doku: `C:/brain/06 Web & Software/schlosscafe/GBP-Setup-Cafe-Reinhart.md`
