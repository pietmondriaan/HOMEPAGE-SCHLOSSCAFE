export const events = [
  {
    id: 8,
    titel: "Bleiburger Wiesenmarkt",
    datum: "2026-09-07",
    uhrzeit: "4.–7. September",
    beschreibung: "Das größte und älteste Volksfest Unterkärntens steht vor der Tür — und wir sind schon mitten in den Vorbereitungen! Wir freuen uns auf euch am Bleiburger Wiesenmarkt.",
    bild: null,
    ort: "Bleiburg",
    link: "https://bleiburgerwiesenmarkt.at",
    dauerausstellung: false,
    aktiv: true,
  },
  {
    id: 7,
    titel: "Ciao Bella – Italo Night",
    datum: "2026-09-07",
    uhrzeit: "ab 17:00 Uhr",
    beschreibung: "La dolce vita am Bleiburger Wiesenmarkt! Frisch zubereitete Pizza vom Teigkeller, Wein, Spritzer, Aperol uvm., italienische Musik und beste Stimmung — mit DJ Hannes von Laut & Leise Events.",
    bild: "/images/italo-night-2026-plakat.jpg",
    ort: "Bleiburger Wiesenmarkt",
    link: null,
    dauerausstellung: false,
    aktiv: true,
    istPlakat: true,
  },
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
