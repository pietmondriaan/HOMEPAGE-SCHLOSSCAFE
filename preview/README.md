# cafemitherz.at — Modernisierungs-Preview

**Stack:** Astro 5 (Static Site Generation) + Tailwind CSS v4  
**Branch:** `feature/homepage-modernization-v1`  
**Seiten:** `/` (Home), `/torten`, `/standort`

## Lokal starten (auf HP)

```bash
cd preview
npm install
npm run dev
# → http://100.109.175.125:4321 (vom ThinkPad erreichbar)
```

## Build

```bash
npm run build
# → dist/ enthält statisches HTML, bereit für Cloudflare Pages
```

## Was diese Preview zeigt

| Verbesserung | Detail |
|---|---|
| Zero JS | Kein React-Bundle — Astro generiert reines HTML+CSS |
| Echte URLs | `/torten` statt `/#/torten` — Google indexiert jede Seite eigenständig |
| LCP preload | `<link rel="preload" fetchpriority="high">` im `<head>` |
| Kein Layout-Shift | Alle `<img>` haben `width`/`height` |
| Reduced Motion | `prefers-reduced-motion` in global.css respektiert |
| Hover only devices | `card-hover` nur bei `@media (hover: hover)` aktiv |
| ARIA | `aria-current`, `aria-label`, `address`-Element für Adressen |

## Build-Output Vergleich

| | Aktuell (React SPA) | Preview (Astro) |
|---|---|---|
| JavaScript | ~350 KB (gzip) | **0 KB** |
| CSS | ~30 KB | 39 KB |
| Initial Request | index.html + JS bundle | index.html + CSS only |
| Sub-pages | JavaScript-Rendering | Statisches HTML |

## Nächste Schritte für vollständige Migration

1. **Interaktive Komponenten** als React Islands einbinden:
   - `FruehstueckModal` → `client:idle`
   - Torten-Filter im Shop → `client:visible`
2. **Fonts self-hosten** (woff2) → kein externer DNS-Request
3. **Alle Seiten** migrieren (Kontakt, Impressum, Datenschutz, Vermietung, Karten)
4. **EventTicker** als Astro-Komponente (CSS-only Animation)
5. **Deploy** via bestehenden Wrangler-Workflow: `wrangler pages deploy dist --project-name=schlosscafe`

## Dokumente

- [`STACK_DECISION.md`](STACK_DECISION.md) — Warum Astro (nicht Next.js)
- [`lighthouse-preview.json`](lighthouse-preview.json) — Geschätzte Lighthouse-Werte
- [`../audit/AUDIT_REPORT.md`](../audit/AUDIT_REPORT.md) — Vollständiger Audit der Live-Site
