# CHANGES — Hero-Redesign (feature/hero-redesign)

Basierend auf MiroFish-Simulation vom 2026-05-15:
8 virtuelle Besucher-Agenten haben das Hero als Hauptproblem identifiziert.
Alle P0/P1-Maßnahmen umgesetzt.

---

## Geänderte Dateien

| Datei | Art der Änderung |
|-------|-----------------|
| `preview/public/images/hero/hero-mehlspeisen-warm.jpg` | Neu hinzugefügt — neues Hero-Bild |
| `preview/src/pages/index.astro` | Hero-Section überarbeitet (Overlay, Bild, Öffnungszeiten, Pietrowski-Badge) |

---

## 1. Neues Hero-Bild (P0)

**Datei:** `preview/public/images/hero/hero-mehlspeisen-warm.jpg`

**Quelle:** Eigenes Foto des Cafés — `public/images/galerie/galerie-15.jpg`
**Lizenz:** Eigentum des Café mit Herz / Oliver Burkhardt. Alle Rechte vorbehalten. Kein externer Download.
**Motiv:** Frisches Gebäck (Kipferl, Brötchen, Germknödel) in warmem Licht — mit dem roten Herz-Logo des Cafés sichtbar. Erfüllt Motiv-Kriterium (a): "fertige Mehlspeise auf Tisch".

**Warum dieses Bild:**
- Hell, warm, appetitlich — sofort einladend
- Zeigt das eigene Produkt (hausgemachtes Gebäck)
- Enthält das Café-mit-Herz Logo (Branding)
- Deutlich besser als das bisherige dunkle, unklare Eisvitrinenbild

---

## 2. Overlay reduziert (P0)

**CSS-Änderung in index.astro:**

```
Vorher: bg-gradient-to-b from-braun-900/70 via-braun-900/50 to-braun-900/80
Nachher: bg-braun-900/15
```

Overlay von 70–80 % auf 15 % reduziert. Das Hintergrundbild ist nun deutlich sichtbar.
Text-Lesbarkeit gesichert durch: dunkle Textfarben (braun-900/800) + `[text-shadow:0_2px_8px_rgba(255,255,255,0.6..0.8)]`.

---

## 3. Öffnungszeiten + Standort-Hinweis (P1)

Two Standort-Pills im Hero, sichtbar ohne Scrollen (above the fold, getestet bei 800px Viewport):

```
📍 Bleiburg · Mo–So 7–19 Uhr
📍 Eberndorf · Mo–So 7–19 Uhr
```

Styling: `bg-creme/80 backdrop-blur-sm rounded-full` — gut lesbar auf dem Bakery-Bild.

---

## 4. Pietrowski-Ausstellungs-Badge (P2)

Dezenter Badge oben links im Hero:

```
🎨 Ausstellung [Pietrowski]
```

Link: `#events` (scrollt zur Events-Sektion mit der Dauerausstellung).
Styling: `bg-braun-900/60 backdrop-blur-sm rounded-full border border-gold/30` — unauffällig aber präsent.

**Zu reviewen:** Position oben links könnte auf sehr kleinen Screens mit dem Navbar-Logo kollidieren. Falls nötig: Badge auf Mobile ausblenden (`hidden sm:flex`).

---

## Visuelle Prüfung

Screenshot erstellt: `cafemitherz-hero-redesign-preview.jpeg`
- Hero-Bild hell und warm ✓
- Overlay kaum sichtbar ✓
- Text gut lesbar ✓
- Öffnungszeiten + Standorte sichtbar ohne Scrollen ✓
- Pietrowski-Badge sichtbar ✓
- Restaurant-Guru-Badge rechts oben ✓

---

## Commits auf feature/hero-redesign

1. `assets: Hero-Bild hero-mehlspeisen-warm.jpg hinzugefügt`
2. `hero: Overlay auf 15% reduziert + neues Hintergrundbild referenziert` (inkl. Öffnungszeiten + Pietrowski-Badge)
3. `docs: CHANGES.md` (dieser Commit)
