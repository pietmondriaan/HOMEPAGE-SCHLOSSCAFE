export const events = [
  // Wiesenmarkt + Italo Night stehen seit 25.08.2026 in ../data/wiesenmarkt.js
  // (Zeltprogramm für Hero, Wiesenzelt-Sektion und Ticker) — hier bewusst nicht mehr,
  // sonst laufen sie doppelt durch den Ticker.
  {
    id: 10,
    titel: "Oktoberfest im Schloss-Café",
    datum: "2026-10-23",
    beschreibung: "Unser traditionelles Oktoberfest mit Weißwurst, Gulasch, frisch gezapftem Bier und guter Laune.",
    bild: "/images/oktoberfest-2026.jpg",
    ort: "Schloss-Café Bleiburg",
    aktiv: true,
  },
  {
    id: 11,
    titel: "Bleiburger Kneipenfestival",
    datum: "2026-11-07",
    beschreibung: "Ganz Bleiburg feiert — das Schloss-Café ist Station, mit Live-Musik.",
    bild: "/images/kneipenfestival-2026.jpg",
    ort: "Lokale in ganz Bleiburg",
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
