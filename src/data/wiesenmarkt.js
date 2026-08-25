// Bleiburger Wiesenmarkt 2026 — Schloss Café Wiesenzelt.
// Einzige Quelle für Hero-Programmblock, Wiesenzelt-Sektion und Hero-Ticker.
// Inhalte 1:1 von den Zeltplakaten (Stand 25.08.2026).
// Nach dem letzten Markttag blendet sich alles selbst aus — wie WM_ENDE beim Gewinnspiel.

export const WIESENMARKT_ENDE = '2026-09-07'

export function wiesenmarktAktiv() {
  const heute = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Vienna',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
  return heute <= WIESENMARKT_ENDE
}

export const wiesenmarkt = {
  titel: 'Schloss Café Wiesenzelt',
  zeitraum: '4.–7. September 2026',
  zeitraumKurz: '4.–7. September',
  ort: 'Bleiburger Wiesenmarkt',
  link: 'https://bleiburgerwiesenmarkt.at',
  taeglich:
    'Jeden Tag hausgemachte Mehlspeisen, die originale Bleiburger Wiesentorte, Softeis, Kaffee und mehr.',
  plakat: '/images/wiesenzelt-2026-programm.jpg',
  plakatWiesnstadl: '/images/wiesnstadl-2026-plakat.jpg',
  // Nur die drei Tage, die auf dem Plakat ein eigenes Programm haben.
  // Geöffnet ist das Zelt durchgehend 4.–7. September.
  programm: [
    {
      id: 'kinderdisco-wiesnstadl',
      tagKurz: 'Fr 4.9.',
      tag: 'Freitag',
      datum: '4. September',
      titel: 'Kinder-Disco & Wiesnstadl',
      heroTitel: 'Kinder-Disco & Wiesnstadl',
      heroText: 'live: Manuel Brunner ab 21:00',
      punkte: [
        'Kinder-Disco — powered by Schischule Petzen',
        'NEU & LIVE: Wiesnstadl ab 20:00 Uhr',
        'Live-Musik ab 21:00 Uhr mit Manuel Brunner',
        'Happy Hour von 21:00 bis 23:00 Uhr',
      ],
    },
    {
      id: 'wiesnstadl-poppins',
      tagKurz: 'Sa 5.9.',
      tag: 'Samstag',
      datum: '5. September',
      titel: 'Wiesnstadl mit poppins',
      heroTitel: 'Wiesnstadl',
      heroText: 'live: poppins ab 21:00',
      punkte: [
        'NEU & LIVE: Wiesnstadl ab 20:00 Uhr',
        'Live-Musik ab 21:00 Uhr mit poppins',
        'Happy Hour von 21:00 bis 23:00 Uhr',
      ],
    },
    {
      id: 'italo-night',
      tagKurz: 'Mo 7.9.',
      tag: 'Montag',
      datum: '7. September',
      titel: 'Ciao Bella – Italo Night',
      heroTitel: 'Italo Night',
      heroText: 'ab 17:00 · Pizza & DJ Hannes',
      punkte: [
        'Ab 17:00 Uhr im Wiesenzelt',
        'Pizza vom Teigkeller & italienische Spezialitäten',
        'Musik von DJ Hannes (Laut & Leise Events)',
      ],
    },
  ],
  partner: ['Schischule Petzen', 'Manuel Brunner', 'poppins', 'MOPET', 'Teigkeller', 'DJ Hannes'],
}
