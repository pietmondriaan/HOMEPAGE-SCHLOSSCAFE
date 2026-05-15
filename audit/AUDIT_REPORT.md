# Audit-Report: cafemitherz.at
**Datum:** 2026-05-15  
**Branch:** feature/homepage-modernization-v1  
**Analysiert:** Live-Site https://www.cafemitherz.at + Quellcode HOMEPAGE-SCHLOSSCAFE

---

## Executive Summary

Die aktuelle cafemitherz.at ist eine vollständig responsive, optisch konsistente Café-Homepage mit starkem Designsystem (braun/creme/gold) und durchdachten SEO-Grundlagen. Kernproblem ist die **SPA-Architektur mit Hash-Routing** (`/#/tortenshop`): Unterseiten sind nicht eigenständig crawlbar, Lighthouse-Performance leidet unter blockierendem Font-Loading und dem vollständigen React-Bundle beim Erstaufruf. Eine Umstellung auf statisch generierte Seiten (Astro) würde alle vier Lighthouse-Kategorien signifikant verbessern, ohne das bestehende Designsystem zu verwerfen.

**Sofortiger Handlungsbedarf (vor nächstem Deploy):**
- LCP-Bild vorläufig preloaden (`galerie-01.jpg`)
- Google Fonts auf `font-display: swap` umstellen
- `useRef`/`useEffect` in `AutoPlayVideo` importieren (aktuell Runtime-Fehler wenn Komponente gerendert wird)

---

## Architektur & Stack

| Kategorie | Aktuell | Bewertung |
|-----------|---------|-----------|
| Framework | React 19 + Vite 7 SPA | ⚠️ SPA, kein SSR/SSG |
| Routing | React Router v7, Hash-Modus (`/#/route`) | ❌ SEO-Nachteil |
| CSS | Tailwind CSS v4 mit Custom Design Tokens | ✅ sehr gut |
| Fonts | Google Fonts (Playfair + Lora + Inter, 6 Varianten) | ⚠️ render-blockierend |
| Animation | GSAP 3.14 (~100 KB gzip) für Spirale im Hero | ⚠️ teuer für optionalen Effekt |
| Bilder | JPEG/WebP, `loading="lazy"`, keine `width`/`height` | ⚠️ CLS-Risiko |
| Deployment | Cloudflare Pages (`wrangler pages deploy`) | ✅ schnell, kostenlos |
| Git | GitHub, branch `main` als single source of truth | ✅ |

**Kritischer Bug in `Home.jsx`:**  
`AutoPlayVideo` (Zeilen 12–39) verwendet `useRef` und `useEffect`, die nicht importiert sind. Die Komponente wird nicht verwendet (ihre Logik ist in `LazyVideo.jsx`), schlägt aber beim Lint/Build nicht fehl — risikobehaftet wenn sie aktiviert wird.

**Hash-Routing — warum es problematisch ist:**  
`/#/tortenshop` ist für Suchmaschinen dieselbe URL wie `/`. Google kann die Unterseiten zwar partiell crawlen (via JavaScript), aber nicht als eigenständige Pages indexieren. Konsequenz: kein separates Ranking für "Torten Bleiburg" oder "Café Klopeinersee".

---

## SEO & Auffindbarkeit

### Stärken
- ✅ JSON-LD Structured Data: 2× `CafeOrCoffeeShop` + `ArtGallery` — vorbildlich, deckt Öffnungszeiten, Koordinaten, Angebote ab
- ✅ Open Graph + Twitter Card vollständig ausgefüllt
- ✅ Canonical `<link rel="canonical" href="https://www.cafemitherz.at/">` korrekt gesetzt
- ✅ Geo-Meta-Tags für lokale Suche (`geo.region`, `geo.placename`, `geo.position`)
- ✅ `robots.txt` + `sitemap.xml` vorhanden
- ✅ Titel/Description präzise und keyword-reich

### Schwächen
| Problem | Impact | Fix |
|---------|--------|-----|
| Hash-URLs in Sitemap (`/#/schlosscafe`) | Hoch | Auf echte Pfade umstellen |
| Unterseiten nicht eigenständig rankbar | Hoch | SSG oder Server-Side Routing |
| `award` in JSON-LD: "2023" statt "2023–2026" | Mittel | Wert aktualisieren |
| Keine `<title>` für Unterseiten im `<head>` des index.html | Niedrig | SSR/SSG oder dynamic via `usePageTitle` (teilweise schon) |
| Sitemap listet `/#/reinhardt` — Route im App.jsx ist `/reinhardt` ohne Hash | Niedrig | Konsistenz prüfen |

**Lokales SEO-Potenzial:** Die Region Bleiburg/Klopeinersee hat wenig Konkurrenz online. Mit korrektem Routing und Unterseiten-Indexierung wären Top-3-Platzierungen für "Café Bleiburg", "Konditorei Bleiburg", "Café Klopeinersee" realistisch.

---

## Performance & Lighthouse

### Geschätzte Ist-Werte (Code-Analyse, kein Chrome verfügbar)

| Kategorie | Geschätzt | Hauptursache |
|-----------|-----------|--------------|
| Performance | 55–68 | Google Fonts blockierend, kein LCP-Preload, ~350KB JS-Bundle |
| Accessibility | 84–90 | Gute Basis, aber fehlende `width`/`height` auf Bildern (CLS) |
| Best Practices | 88–93 | Keine kritischen Fehler; HTTPS, kein Mixed Content |
| SEO | 72–80 | Hash-Routing, Unterseiten nicht eigenständig crawlbar |

### Top Performance-Probleme

**1. Google Fonts render-blockierend**  
```html
<!-- Aktuell: blockiert Render bis Fonts geladen -->
<link href="https://fonts.googleapis.com/css2?family=Playfair..." rel="stylesheet" />

<!-- Fix: font-display swap + preconnect bereits da, nur swap fehlt -->
```
Impact: FCP (First Contentful Paint) um ~300–600ms verzögert.

**2. Kein Preload für LCP-Bild**  
`galerie-01.jpg` ist das Hauptbild im Hero (Viewport) — wird aber erst durch `<img>` in React entdeckt, nicht preloaded.
```html
<!-- Fix: in index.html -->
<link rel="preload" as="image" href="./images/galerie/galerie-01.jpg" fetchpriority="high" />
```
Impact: LCP um ~500–1000ms verbessert.

**3. Vollständiges React-Bundle beim Erstaufruf**  
React 19 + React Router + GSAP + react-icons = ~350–400KB gzip. Alle Seiten in einem Bundle.  
Fix: Code Splitting via `React.lazy()` pro Route oder Migration zu Astro (Zero JS default).

**4. Fehlende Bild-Dimensionen (CLS)**  
Kein `width`/`height` auf den meisten `<img>` Tags → Layout-Shift (CLS > 0.1).

**5. GSAP (SpiralAnimation) immer geladen**  
GSAP kostet ~100KB auch wenn `hidden sm:block` die Spirale auf Mobile versteckt.

---

## Accessibility (Barrierefreiheit)

### Stärken
- ✅ `<html lang="de">` gesetzt
- ✅ Skip-to-content Link implementiert (fixed, wird bei Focus sichtbar)
- ✅ `focus-visible` Styles für Tastaturnavigation
- ✅ Alt-Text auf allen primären Bildern
- ✅ `aria-label`-ähnliche Strukturen durch beschreibende Alt-Texte
- ✅ `<main id="main-content" tabIndex={-1}>` korrekt

### Verbesserungspotenzial
| Problem | WCAG | Priorität |
|---------|------|-----------|
| `<label>` mit `flex` inline — Inhalt und `<input>` getrennt nur durch DOM-Struktur | 1.3.1 | Mittel |
| Kein `aria-live` auf EventTicker (Ticker läuft automatisch) | 2.2.2 | Mittel |
| Keine `prefers-reduced-motion` Abfrage für Ticker + GSAP-Spirale | 2.3.3 | Mittel |
| Torten-Karten ohne `role` oder `aria-label` (nur Links ohne aussagekräftigen Text) | 2.4.6 | Niedrig |
| Kontrast gold (`#c9a86c`) auf creme (`#fdf8f4`): ~2.4:1 — WCAG AA erfordert 3:1 für großen Text | 1.4.3 | Mittel |

**Kontrast-Detail:** Gold auf Creme (Badge-Text, Unterüberschriften) fällt unter WCAG AA für normalen Text. Großer/Headline-Text ist ausgenommen. Prüfung empfohlen.

---

## Design & UX

### Was sehr gut funktioniert
- **Designsystem** (braun/creme/gold) ist konsistent und stimmig — Wiedererkennungswert hoch
- **Typografie** (Playfair Display für Headlines, Lora für Body) — authentisch, warm, österreichisch
- **Hero-Bereich**: Bild-Overlay, Spiralanimation, Badge, klare Hierarchie
- **KulturMoment-Sektion** (Helnwein-Besuch): hochwertig gestaltet, großes CTA-Potenzial
- **Mobile-first**: Breakpoints konsistent, Buttons gut dimensioniert
- **Cards** mit `card-hover` (translateY) — angenehme Interaktion

### Was verbessert werden sollte

| Problem | Sektion | Empfehlung |
|---------|---------|------------|
| Restaurant-Guru-Badge überlappt Hero-Text auf kleinen Phones | Hero | Position auf Mobile reviewen; badge kleiner oder unter Nav |
| 2 gleichwertige CTAs im Hero ("Torte bestellen" + "Cafés entdecken") | Hero | Primäre CTA hervorheben, sekundäre dezenter |
| `card-hover: translateY(-8px)` auch auf Touch-Geräten | Standorte | `@media (hover: hover)` — nur auf Geräten mit echter Maus |
| Keine Skeleton/Loading-State für Hero-Bild | Hero | LQIP (Low Quality Image Placeholder) oder Blur-Effekt |
| EventTicker ist nicht pausierbar für Screenreader | EventTicker | `aria-live="off"` + pause-on-focus |
| VermietungTeaser hat keinen sichtbaren Preis auf Mobile | Vermietung | Badge auch mobile zeigen |
| Frühstück-CTA auf Klassiker-Karte: "Jetzt vorbestellen" bricht Layout auf kleinen Screens | Klassiker | Button-Text kürzen |

---

## Modernisierungsempfehlungen

### Priorität 1 — Sofort (ohne Stack-Wechsel)
1. **LCP-Preload** in `index.html` für `galerie-01.jpg` → +0.5–1s LCP
2. **Google Fonts: `font-display=swap`** im Fonts-URL-Parameter → eliminiert FOIT
3. **`useRef`/`useEffect` importieren** in `Home.jsx` oder `AutoPlayVideo` löschen
4. **`width`/`height`** auf Hero-Bild setzen → CLS auf 0 reduzieren
5. **`prefers-reduced-motion`** in `EventTicker` und `SpiralAnimation` → Accessibility

### Priorität 2 — Mittelfristig (Refactor)
1. **Code Splitting** via `React.lazy()` für jede Route → Bundle <100KB initial
2. **GSAP aus dem Hauptbundle** entfernen: lazy-load `SpiralAnimation` nur auf Desktop
3. **Bild-Dimensionen** durchgängig setzen (`width`/`height` attributes)
4. **Sitemap** auf echte Pfade aktualisieren (wenn Routing geändert)

### Priorität 3 — Strategisch (Stack-Migration → Preview)
1. **Astro (statisch)** statt React SPA:
   - Jede Route = eigene HTML-Datei, vollständig indexierbar
   - Zero JS by default (~0 KB statt ~350 KB initial)
   - Astro's `<Image>` Component: automatische WebP-Konvertierung, `width`/`height`
   - Gleiche Design Tokens, gleiche Fonts, gleiche Inhalte
   - Lighthouse Performance: geschätzt 90+ (statt 55–68)
2. **Echte URL-Pfade** (`/torten` statt `/#/torten`) → separate Indexierung
3. **Self-hosted Fonts** (woff2) statt Google Fonts → kein externer Roundtrip

### Erwartete Verbesserung nach Modernisierung

| Kategorie | Ist (geschätzt) | Soll (Preview) |
|-----------|-----------------|----------------|
| Performance | 55–68 | ≥ 90 |
| Accessibility | 84–90 | ≥ 95 |
| Best Practices | 88–93 | ≥ 95 |
| SEO | 72–80 | ≥ 95 |
