export const events = [
  // Wiesenmarkt + Italo Night stehen seit 25.08.2026 in ../data/wiesenmarkt.js
  // (Zeltprogramm für Hero, Wiesenzelt-Sektion und Ticker) — hier bewusst nicht mehr,
  // sonst laufen sie doppelt durch den Ticker.
  {
    id: 9,
    titel: "ANIMA — Ausstellung Michael Pietrowski",
    datum: "2026-01-01",
    beschreibung: "Unsere Dauerausstellung ist auf Reisen: Porträts, Fadenbilder und Kohlepulver-Arbeiten sind derzeit in der Ausstellung „ANIMA – Portreti in vrhovi“ im Kulturzentrum Črna na Koroškem (Slowenien) zu sehen.",
    bild: "/images/pietrowski-ausstellung.webp",
    ort: "Kulturzentrum Črna na Koroškem",
    link: "https://www.pietrowski.at",
    dauerausstellung: true,
    aktiv: true,
  },
]

// Automatische Filterung: vergangene Events ausblenden, nach Datum sortieren
// Dauerausstellungen immer anzeigen (am Ende)
export const getActiveEvents = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return events
    .filter(e => {
      if (!e.aktiv) return false
      if (e.dauerausstellung || e.immer_zeigen) return true
      return new Date(e.datum) >= today
    })
    .sort((a, b) => {
      if (a.dauerausstellung) return 1
      if (b.dauerausstellung) return -1
      return new Date(a.datum) - new Date(b.datum)
    })
}
