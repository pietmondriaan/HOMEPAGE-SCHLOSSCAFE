# Stack-Entscheidung: Astro 5

## Gewählt: Astro 5 (Static Site Generation)

## Warum Astro und nicht Next.js?

| Kriterium | Astro | Next.js App Router |
|-----------|-------|-------------------|
| Initial JS | ~0 KB (Zero JS default) | ~90–150 KB (React runtime) |
| Build-Output | Statisches HTML pro Route | SSR oder Static Export |
| Deployment | Cloudflare Pages — direkter Upload | Cloudflare Pages (Workers) — komplexer |
| Lernkurve für bestehenden React-Code | Gering — `.astro`-Templates, React Components als Islands | Gering — aber andere Routing-Konventionen |
| Lighthouse Performance | ≥ 90 realistisch | 80–90, je nach Config |
| Café-Website Anforderungen | ✅ Statische Inhalte, selten geändert | Overkill für rein statische Seiten |
| Bestehende Komponenten | React-Komponenten nutzbar via Islands | Native React |

## Was Astro konkret bringt

1. **Zero JS per default**: Jede Astro-Seite ist reines HTML+CSS. React wird nur geladen, wo interaktive Komponenten (`client:idle`, `client:visible`) es brauchen — z.B. FruehstueckModal oder TortenShop.

2. **Datei-basiertes Routing**: `src/pages/torten.astro` → `/torten` (nicht `/#/torten`). Google indexiert jede Seite eigenständig.

3. **Astro Image**: Automatische WebP-Konvertierung, `width`/`height` immer gesetzt → kein CLS.

4. **Self-hosted Fonts**: Fonts als statische Assets → kein externer Roundtrip, `font-display: swap` automatisch.

5. **Cloudflare Pages**: Deploy via `wrangler pages deploy dist --project-name=schlosscafe` — identisch zum aktuellen Workflow.

## Was vom aktuellen Stack erhalten bleibt

- Design-System: braun/creme/gold Tokens → in `global.css` 1:1 übernommen
- Tailwind CSS v4 → identische Klassen
- Schriften: Playfair Display, Lora, Inter → jetzt self-hosted
- JSON-LD Structured Data → in Layout.astro
- Alle Inhalte/Texte → direkt übernommen
- Deploy via Cloudflare Pages → unverändert

## Migrationsaufwand

- **Einfach**: Statische Sektionen (Hero, Standorte, Klassiker, Events) → reine .astro-Dateien, ~2h
- **Mittel**: FruehstueckModal, Tortenshop-Filter → React Islands mit `client:idle`, ~4h
- **Aufwändig**: SpiralAnimation (GSAP) → entweder als React Island oder durch CSS-Animation ersetzen, ~2h

**Gesamtaufwand Migration**: ca. 1–2 Arbeitstage für vollständige Umstellung.
