# Audit-Report: cafemitherz.at
**Datum:** 2026-05-15  
**Branch:** feature/homepage-modernization-v1  
**Analysiert:** https://www.cafemitherz.at + Quellcode HOMEPAGE-SCHLOSSCAFE  
**Screenshots:** `audit/screenshots/` (6 Dateien: Desktop 1440px + Mobile 390px, 3 Seiten)

---

## Design/Modernität

### Status quo
Konsistentes Designsystem (braun/creme/gold) mit warmer österreichischer Anmutung. Playfair Display als Display-Schrift und Lora als Body-Schrift ergeben eine gastliche, handwerklich-authentische Atmosphäre. Hero-Sektion mit Overlay-Gradient und Restaurant-Guru-Badge. Dunkle Sektion für KulturMoment (Helnwein-Besuch) ist hochwertig gesetzt.

### Schwächen
- Kein expliziter `loading` State für Hero-Bild → leerer weißer Bereich beim Laden auf langsamen Verbindungen
- Card-Hover `translateY(-8px)` ist ein 2018er Pattern, wirkt auf Touch-Geräten nicht
- Font-Ladestrategie ohne `font-display: swap` → unsichtbarer Text (FOIT) bis Fonts geladen
- Keine `width`/`height` Attribute auf Bildern → Layout-Verschiebungen (CLS)
- Sektion "Unsere Klassiker" und "Unsere Torten" visuell zu ähnlich — fehlende Differenzierung
- VermietungTeaser-Badge (€ 500) nur auf Desktop sichtbar (lg:flex)

### Verbesserungen
| Priorität | Maßnahme |
|-----------|----------|
| P0 | `font-display=swap` zu Google Fonts URL hinzufügen |
| P0 | `width`/`height` auf alle `<img>` Tags |
| P1 | Hero-Bild: LQIP-Platzhalter (blur-up) als Ladeindikator |
| P1 | Badge in VermietungTeaser auch für Mobile sichtbar machen |
| P2 | Card-Hover auf `@media (hover: hover)` beschränken |
| P2 | Klassiker vs. Torten visuell klarer trennen (z. B. Hintegrundfarbe differenzieren) |

---

## UX/Übersichtlichkeit

### Status quo
Single-Page-App mit Hash-Routing (`/#/torten`). Navigation fixiert, am Desktop vollständig, am Mobile als Burger-Menü. 7 Sektionen auf der Startseite: Hero → Standorte → Klassiker → KulturMoment → Torten → Vermietung → Events. Drei primäre CTAs im Hero (Torte bestellen / Cafés entdecken / Restaurant Guru Badge als Link). EventTicker am unteren Bildschirmrand als fortlaufendes Band.

### Schwächen
- Zu viele konkurrierende CTAs im Hero — kein klares primäres Ziel
- EventTicker am unteren Bildschirmrand überlagert den Scroll-Indicator und wird von Nutzern ignoriert
- Seitenstruktur mit 7+ Sektionen auf der Startseite belastet die kognitive Last
- Navigation hat keinen aktiven Zustand für aktuelle Route (Highlight fehlt)
- Frühstück-Vorbestellung versteckt in einem Modal hinter einem kleinen Button in der Klassiker-Sektion
- Keine Breadcrumb-Navigation auf Unterseiten
- Kein Feedback nach WhatsApp-Tortenbestellung (Nutzer landet in WhatsApp, kein Bestätigungsscreen)

### Verbesserungen
| Priorität | Maßnahme |
|-----------|----------|
| P0 | Hero: primären CTA (Torte bestellen) klar hervorheben, sekundären (Cafés entdecken) dezenter |
| P0 | Aktiver Nav-Link hervorheben (color/font-weight) |
| P1 | EventTicker: von Bildschirmrand entfernen, in Hero-Sektion oder eigene Sektion integrieren |
| P1 | Frühstück-CTA direkter zugänglich machen (eigene Karte oder prominenter Button) |
| P2 | Startseite auf 5 Sektionen reduzieren, restliche auf Unterseiten auslagern |
| P2 | Bestellprozess mit Schritt-für-Schritt-Visualisierung (3 Schritte: wählen → WhatsApp → abholen) |

---

## Mobile

### Status quo
Responsive Design mit `sm:`, `md:`, `lg:`-Breakpoints. Schriftgrößen skalieren (z. B. `text-4xl sm:text-6xl lg:text-8xl`). Buttons sind touch-freundlich (min. 44px Höhe). Mobile-Viewport-Einheit `100svh` korrekt verwendet (iOS Safe Area).

### Schwächen
- Restaurant-Guru-Badge (`absolute top-20 right-3`) überlappt auf kleinen Phones (< 380px) den Hero-Titel
- Navbar-Hamburger-Button fehlt im aktuellen Code (kein mobiles Menü sichtbar in Playwright-Screenshot)
- SpiralAnimation mit `hidden sm:block` geladen trotzdem im JS-Bundle auf Mobile
- Google Fonts: alle 6 Varianten für alle Viewports geladen — Mobile braucht oft weniger
- `card-hover: translateY(-8px)` bei `:hover` — auf Touch-Geräten triggert hover beim ersten Touch, zweiter Touch navigiert → verwirrend
- VermietungTeaser Preis-Badge (`hidden lg:flex`) fehlt auf Mobile komplett
- Kein `prefers-reduced-data` Media Query — Bilder und Videos laden auf mobilen Datentarifen voll

### Verbesserungen
| Priorität | Maßnahme |
|-----------|----------|
| P0 | `card-hover` mit `@media (hover: hover)` wrappen |
| P0 | GSAP/SpiralAnimation nicht auf Mobile laden (dynamic import mit Breakpoint-Check) |
| P1 | Restaurant-Guru-Badge auf Mobile kleiner oder unter der Navbar positionieren |
| P1 | Preis-Badge Vermietung auch für Mobile anzeigen (kompaktere Version) |
| P1 | Google Fonts: `display=swap` + nur benötigte Varianten laden |
| P2 | `prefers-reduced-data` respektieren: Videos nicht autoplay auf Mobilverbindungen |

---

## Klassisches SEO (Meta, Sitemap, robots, JSON-LD, Performance)

### Status quo
- ✅ `<title>` und `<meta name="description">` auf Startseite
- ✅ JSON-LD: 2× `CafeOrCoffeeShop` + `ArtGallery` vollständig mit Öffnungszeiten, Koordinaten, Telefon
- ✅ Open Graph (og:type, og:title, og:description, og:image, og:url)
- ✅ Twitter Card (summary_large_image)
- ✅ Canonical `<link rel="canonical" href="https://www.cafemitherz.at/">`
- ✅ Geo-Meta-Tags (`geo.region`, `geo.position`)
- ✅ `sitemap.xml` vorhanden, `robots.txt` vorhanden
- ✅ `usePageTitle()` Hook setzt dynamisch `<title>` pro Route
- ⚠️ Sitemap enthält Hash-URLs (`/#/schlosscafe`) — nicht als eigenständige Pages indexierbar
- ⚠️ Hash-Routing: Unterseiten teilen sich URL `/` mit Startseite aus Google-Sicht
- ❌ Kein `<meta name="description">` für Unterseiten im statischen HTML (nur nach JS-Ausführung)
- ❌ `award` im JSON-LD: "2023" veraltet, sollte "2023–2026" sein
- ❌ Sitemap-URL `/#/reinhardt` → App-Route ist `/reinhardt` ohne Hash: Inkonsistenz

### Verbesserungen
| Priorität | Maßnahme |
|-----------|----------|
| P0 | Auf dateibasiertes Routing (Astro/Next.js) umstellen — jede Seite = eigenständige URL |
| P0 | Sitemap auf echte Pfade aktualisieren (nach Routing-Umstellung) |
| P0 | `award` im JSON-LD auf "2023–2026" aktualisieren |
| P1 | Jede Seite mit eigenem `<meta name="description">` im statischen HTML |
| P1 | `hreflang` falls mehrsprachige Erweiterung geplant |
| P2 | Google Business Profile-Daten mit JSON-LD synchronisieren |

---

## AI/LLM-SEO (llms.txt, schema.org, semantisches HTML, Bot-Freundlichkeit)

### Status quo
- **Kein `llms.txt`** — AI-Crawlers (Claude, GPT, Perplexity) erhalten keinen strukturierten Überblick über die Site
- JSON-LD vorhanden und detailliert — eine gute Grundlage für AI-Verständnis
- HTML ist JavaScript-rendered (React SPA) — AI-Crawler die kein JS ausführen sehen nur leeres `<div id="root">`
- `robots.txt` von Cloudflare generiert, enthält generische Content-Signals aber keine Bot-spezifischen Direktiven
- Semantisches HTML: `<main>`, `<nav>`, `<footer>` vorhanden; aber innerhalb der Sektionen nur `<div>` und `<section>`, kaum `<article>`, `<header>`, `<time>`, `<address>`

### Überprüfung robot-spezifischer Direktiven
Aktuell in `robots.txt` (Cloudflare-generiert): keine expliziten Einträge für `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Googlebot-Extended`. AI-Crawler folgen dem Standard `User-agent: *`-Eintrag — derzeit nicht blockiert.

### Schwächen
- ❌ Kein `/llms.txt` — Perplexity, ChatGPT, Claude können Site-Struktur nicht strukturiert erfassen
- ❌ React SPA: bei fehlendem JS-Rendering zeigen AI-Crawlers nur `<div id="root"></div>`
- ❌ Veranstaltungen ohne `<time datetime="...">` Attribute — nicht maschinenlesbar
- ❌ Torten-Produkte ohne `Product`-Schema auf der Tortenshop-Seite
- ❌ `address`-Element nicht für physische Adressen verwendet
- ⚠️ Kein explizites `GPTBot: allow`, `ClaudeBot: allow` in robots.txt
- ⚠️ Keine `speakable` Schema.org-Eigenschaft für Voice-Search

### Verbesserungen
| Priorität | Maßnahme |
|-----------|----------|
| P0 | `/llms.txt` erstellen mit Kurzübersicht, Sitemap, Kontakt, Produkte |
| P0 | Statisches HTML-Rendering (Astro/Next.js SSG) — AI-Crawler erhalten vollständigen Content |
| P0 | `<time datetime="2026-05-07">7. Mai 2026</time>` für alle Datumsangaben |
| P1 | `Product`-Schema auf `/torten` für jede Torte |
| P1 | `<address>` Element für Café-Adressen verwenden |
| P1 | `GPTBot`, `ClaudeBot`, `PerplexityBot` explizit in robots.txt erlauben |
| P2 | `speakable` Schema für Opening Hours und Address (Voice Search) |

---

## Accessibility (WCAG 2.2 AA)

### Status quo
- ✅ `<html lang="de">` gesetzt
- ✅ Skip-to-content Link (`position: fixed`, wird bei Focus sichtbar)
- ✅ `focus-visible` Styles für Tastaturnavigation
- ✅ Alt-Text auf primären Bildern
- ✅ `<main id="main-content" tabIndex={-1}>` korrekt für Skip-Link
- ✅ Globale `*:focus-visible` Regel (3px gold outline)

### Schwächen
| WCAG-Kriterium | Problem | Seite |
|----------------|---------|-------|
| 1.4.3 Kontrast (AA) | Gold `#c9a86c` auf Creme `#fdf8f4`: Kontrast ~2.4:1 — AA benötigt 4.5:1 für normalen Text | Überall |
| 1.3.1 Info & Beziehungen | `<label>` mit `flex`-Layout: Icon und Text im Label, strukturell korrekt aber fragil | Frühstück-Modal |
| 2.2.2 Pause/Stop/Hide | EventTicker läuft automatisch ohne Pause-Möglichkeit | Startseite |
| 2.3.3 Animation (AAA) | Keine `prefers-reduced-motion` Abfrage für GSAP-Spirale + EventTicker | Startseite |
| 2.4.6 Überschriften | Torte-Cards ohne aussagekräftigen Link-Text ("Mehr erfahren" ohne Kontext) | Startseite |
| 4.1.2 Name, Rolle, Wert | Hamburger-Button hat `aria-label` aber kein `aria-expanded`/`aria-controls` | Mobile Nav |
| 1.4.4 Textgröße | Font-Größen `text-[8px]`, `text-[9px]` — unter WCAG-Empfehlung 16px für Body | Badge, Labels |
| 2.4.11 Fokus (2.2) | Kein sichtbarer Focus-Ring auf `.btn-braun` und `.btn-gold` mit `:focus` (nur `:focus-visible`) | Buttons |

### Verbesserungen
| Priorität | Maßnahme |
|-----------|----------|
| P0 | Kontrast-Fix: gold auf creme durch dunkleres Gold `#9e7d3a` ersetzen oder Text auf dunklem Hintergrund |
| P0 | `prefers-reduced-motion` für EventTicker (animation-play-state: paused) + GSAP |
| P0 | EventTicker: `aria-live="off"` + Pause-Button |
| P1 | Link-Texte erweitern: "Mehr erfahren" → "Mehr über [Name] erfahren" |
| P1 | Hamburger: `aria-expanded` + `aria-controls` korrekt setzen |
| P1 | Mindest-Schriftgröße 12px für UI-Labels (Badge-Text, Tracker) |
| P2 | `speakable` für Öffnungszeiten und Adress-Angaben |

---

## Core Web Vitals (LCP/INP/CLS)

### Status quo
Geschätzte Werte basierend auf Code-Analyse (kein Live-Lighthouse-Run, Chrome auf HP-Server nicht verfügbar):

| Metrik | Geschätzter Wert | Zielwert | Status |
|--------|-----------------|---------|--------|
| **LCP** (Largest Contentful Paint) | ~3.8–4.5s | ≤ 2.5s | ❌ schlecht |
| **INP** (Interaction to Next Paint) | ~120–200ms | ≤ 200ms | ⚠️ grenzwertig |
| **CLS** (Cumulative Layout Shift) | ~0.12–0.18 | ≤ 0.1 | ❌ schlecht |
| FCP (First Contentful Paint) | ~2.5–3.2s | ≤ 1.8s | ❌ schlecht |
| TTFB | ~100–200ms | ≤ 800ms | ✅ gut (Cloudflare CDN) |

### LCP-Ursachen
1. **Kein Preload** für `galerie-01.jpg` (LCP-Bild) — wird erst nach JS-Bundle-Parse und React-Render entdeckt
2. **Google Fonts render-blockierend** — ohne `font-display: swap` wartet Browser auf Font-Download vor erstem Paint
3. **React-Bundle ~350KB** (geschätzt: React 19 + React Router v7 + GSAP + react-icons) — parse- und ausführungsintensiv

### INP-Ursachen
1. **Langer Main Thread** durch JS-Bundle-Parsing beim initialen Load → jede frühe Interaktion blockiert
2. **GSAP-Initialisierung** synchron auf dem Main Thread
3. React-Reconciler bei State-Updates (FruehstueckModal, EventTicker)

### CLS-Ursachen
1. **Keine `width`/`height`** auf `<img>` Tags — Browser kennt Bildgröße vor dem Download nicht → Layout-Shift
2. Google Fonts: FOUT (Flash of Unstyled Text) verschiebt Layout beim Font-Wechsel
3. EventTicker Position am unteren Rand kann bei Höhenänderung Shift verursachen

### Verbesserungen
| Priorität | Maßnahme | Erwartete Verbesserung |
|-----------|----------|----------------------|
| P0 | `<link rel="preload" fetchpriority="high" as="image" href="galerie-01.jpg">` in `<head>` | LCP -0.8–1.5s |
| P0 | `width`/`height` auf alle `<img>` setzen | CLS → 0.0 |
| P0 | `font-display=swap` in Google Fonts URL | FCP -0.3–0.6s, CLS -0.05 |
| P1 | GSAP mit `React.lazy()` + dynamic import nur laden wenn `window.matchMedia('(min-width: 640px)')` | LCP -0.3s mobile |
| P1 | Code Splitting: `React.lazy()` für jede Route | TBT -200ms |
| P2 | Astro/Next.js SSG: Zero-JS initial → LCP ~0.8s, TBT 0ms, CLS 0 |
