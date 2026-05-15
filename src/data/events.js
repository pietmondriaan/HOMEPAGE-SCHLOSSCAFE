export const events = [
  {
    id: 6,
    titel: "Ausstellung: Drei Welten im Nahbereich",
    datum: "2026-11-08",
    uhrzeit: "noch bis 8. Nov · Di–So 10–18 Uhr",
    beschreibung: "Mercedes Helnwein, Werner Berg & Alberto Giacometti im Dialog — direkt am 10. Oktober Platz. Zur Eröffnung war Weltkünstler Gottfried Helnwein persönlich in Bleiburg — und zu Gast im Schloss-Café.",
    bild: "/images/helnwein-besuch.jpg",
    istPlakat: true,
    ort: "Werner Berg Museum · 10. Oktober Platz 4",
    link: "https://www.wernerberg.museum",
    dauerausstellung: false,
    immer_zeigen: true,
    aktiv: true,
  },
  {
    id: 5,
    titel: "Neueröffnung nach Umbau",
    datum: "2026-05-01",
    uhrzeit: "seit 1. Mai 2026",
    beschreibung: "Nach einem aufwändigen Umbau erstrahlt das Schloss-Café in neuem Glanz! Frisch renovierte Räume, neue Atmosphäre — aber mit dem gewohnten Herzstück: hausgemachte Mehlspeisen, Torten und Gastfreundschaft.",
    video: "/videos/neueroffnung-schlosscafe.mp4",
    bild: null,
    ort: "Schloss-Café Bleiburg",
    link: null,
    dauerausstellung: false,
    immer_zeigen: true,
    aktiv: true,
  },
  {
    id: 4,
    titel: "Auszahlung Sparverein",
    datum: "2026-07-05",
    uhrzeit: "ab 12:00 Uhr",
    beschreibung: "Die jährliche Auszahlung des Sparvereins findet ab 12:00 Uhr statt. Wir freuen uns auf einen gemütlichen Nachmittag im Schloss-Café — mit hausgemachten Mehlspeisen und guter Gesellschaft!",
    bild: "/images/sparverein-auszahlung.jpg",
    ort: "Schloss-Café Bleiburg",
    link: null,
    dauerausstellung: false,
    aktiv: true,
  },
  {
    id: 3,
    titel: "43. Bleiburger Radwandertag & Sommerfest",
    datum: "2026-06-20",
    uhrzeit: "ab 17:00 Uhr",
    beschreibung: "Der 43. Bleiburger Radwandertag der Kärntner Sparkasse – und wir sind dabei! Start um 17:00 Uhr vor der Sparkasse Bleiburg. Strecke auch für Oldtimer (50 ccm), Verlosung toller Preise, Hüpfburg für Kinder, bei jeder Witterung. Das Schloss-Café Bleiburg feiert gleichzeitig sein Sommerfest – kommt vorbei!",
    bild: "/images/radwandertag-2026-plakat.jpg",
    ort: "Kärntner Sparkasse Bleiburg, 10. Oktober Platz 38",
    link: null,
    dauerausstellung: false,
    aktiv: true,
    istPlakat: true,
  },
  {
    id: 1,
    titel: "Dauerausstellung: Michael Pietrowski",
    datum: "2026-01-01",
    beschreibung: "Fadenbilder, Acryl, CrossArt & Beanie-Serie – Wo Street Art die Stadt erobert, verlagert Pietrowski die künstlerische Intervention in den alpinen Raum. Werke können vor Ort besichtigt und erworben werden.",
    bild: "/images/pietrowski-ausstellung.webp",
    ort: "Schloss-Café Bleiburg",
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
