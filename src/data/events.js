export const events = [
  // Wiesenmarkt + Italo Night stehen seit 25.08.2026 in ../data/wiesenmarkt.js
  // (Zeltprogramm für Hero, Wiesenzelt-Sektion und Ticker) — hier bewusst nicht mehr,
  // sonst laufen sie doppelt durch den Ticker.
  {
    id: 12,
    titel: "Petzen-Nest: Eröffnung",
    datum: "2026-12-04",
    beschreibung: "Die Hüttenküche an der Talstation der Petzenbahn öffnet neu, täglich 9:00 bis 17:30 Uhr.",
    bild: "/images/petzen-nest-eroeffnung-2026.jpg",
    ort: "Talstation Petzenbahn, Feistritz ob Bleiburg",
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
