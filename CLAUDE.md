# CLAUDE.md — Arbeitsregeln für dieses Repository

Verhaltensregeln gegen typische LLM-Coding-Fehler. Quelle: `forrestchang/andrej-karpathy-skills`,
nach einer Beobachtung von Andrej Karpathy ("Modelle treffen falsche Annahmen und
laufen damit los, überkomplizieren Code").

**Abwägung:** Diese Regeln gewichten Sorgfalt höher als Tempo. Bei trivialen
Aufgaben Augenmaß verwenden.

## 1. Erst denken, dann coden

**Nichts annehmen. Verwirrung nicht verstecken. Abwägungen offenlegen.**

Vor der Umsetzung:
- Annahmen explizit benennen. Bei Unsicherheit fragen.
- Mehrere Lesarten? Alle nennen — nicht still eine wählen.
- Gibt es einen einfacheren Weg? Sag es. Widersprich, wenn angebracht.
- Etwas unklar? Stopp. Benenne, was verwirrt. Frag nach.

## 2. Einfachheit zuerst

**Minimaler Code, der das Problem löst. Nichts Spekulatives.**

- Keine Features über das Gefragte hinaus.
- Keine Abstraktionen für Einmal-Code.
- Keine "Flexibilität"/"Konfigurierbarkeit", die nicht verlangt wurde.
- Keine Fehlerbehandlung für unmögliche Fälle.
- Wenn 200 Zeilen auch 50 sein könnten — neu schreiben.

Frage dich: "Würde ein Senior-Entwickler das überkompliziert nennen?" Wenn ja —
vereinfachen.

## 3. Chirurgische Änderungen

**Nur anfassen, was sein muss. Nur den eigenen Müll aufräumen.**

Beim Editieren von Bestandscode:
- Angrenzenden Code, Kommentare, Formatierung nicht "verbessern".
- Nichts refactoren, das nicht kaputt ist.
- Bestehenden Stil übernehmen, auch wenn du es anders machen würdest.
- Toten Code ohne Bezug zur Aufgabe: erwähnen — nicht löschen.

Wenn deine Änderung Waisen erzeugt:
- Imports/Variablen/Funktionen entfernen, die DEINE Änderung ungenutzt gemacht hat.
- Vorbestehenden toten Code nicht entfernen, außer es wird verlangt.

Der Test: Jede geänderte Zeile muss direkt auf den Auftrag zurückführbar sein.

## 4. Zielgetriebene Ausführung

**Erfolgskriterien definieren. In der Schleife laufen, bis verifiziert.**

Aufgaben in prüfbare Ziele übersetzen:
- "Validierung hinzufügen" → "Tests für ungültige Eingaben schreiben, dann grün machen"
- "Bug fixen" → "Test schreiben, der ihn reproduziert, dann grün machen"
- "X refactoren" → "Tests laufen vorher und nachher grün"

Bei mehrstufigen Aufgaben kurzen Plan nennen:

```
1. [Schritt] → prüfen: [Check]
2. [Schritt] → prüfen: [Check]
3. [Schritt] → prüfen: [Check]
```

Starke Erfolgskriterien erlauben selbstständiges Loopen. Schwache ("mach, dass es
geht") erzwingen ständige Rückfragen.

---

**Diese Regeln wirken, wenn:** weniger unnötige Änderungen im Diff, weniger
Rewrites wegen Überkomplizierung, und Rückfragen VOR der Umsetzung kommen statt
nach dem Fehler.

---

## Projektspezifisch — HOMEPAGE-SCHLOSSCAFE (cafemitherz.at)

- **Pull-first Pflicht.** VOR jedem Edit an `src/`, `public/` oder `dist/`:
  1. `git fetch origin --tags`
  2. `git status` — bei "behind": `git pull --ff-only origin main`
  3. Live-Tag prüfen: `git tag -l "v*-live-*" "v*-allergene-*"` — der jüngste ist
     der aktuelle Live-Goldstand auf cafemitherz.at.
- **Live-`main` nie direkt mit ungetestetem Code editieren.** Für jedes Feature
  einen Branch `feat/<thema>`, FF-Merge nach `main` erst nach Test/Preview.
- ThinkPad = nur Drop-Zone für Material (Fotos/Videos). Klone, Edits, Builds und
  Deploys laufen ausschließlich am HP.
- Grund für die Pull-first-Regel: Am 18.05.2026 wurde der HP-Klon ohne Pull
  editiert — 42 Commits hinter origin — und stundenlang gegen eine alte Version
  gebaut. Reset auf den letzten `v*-live-*`-Tag war die Reparatur.
