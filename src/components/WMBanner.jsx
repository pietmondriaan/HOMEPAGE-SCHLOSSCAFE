import { FaFutbol } from 'react-icons/fa'

// Gewinnspiel-Laufzeit: nach diesem Datum (Europe/Vienna) verschwindet das Banner automatisch.
const WM_ENDE = '2026-07-19'

// Heutiges Datum in Europe/Vienna als YYYY-MM-DD (DST-sicher, ohne UTC-Drift am Tagesrand).
function heuteWien() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Vienna',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

export default function WMBanner() {
  if (heuteWien() > WM_ENDE) return null

  // EINE Botschaft, die je Bildschirmbreite zentriert durchläuft.
  // Zwei identische Kopien (min-w-full) → nahtlose Endlos-Schleife (translateX -50%),
  // dabei ist immer nur EINE Botschaft sichtbar — wirkt wie ein einzelnes Laufband.
  const Inhalt = () => (
    <span className="flex shrink-0 min-w-full items-center justify-center gap-2 whitespace-nowrap px-6">
      <FaFutbol className="text-braun-900/80 shrink-0" size={13} />
      <span className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-braun-900">
        WM-GEWINNSPIEL: Gewinne einen 50-Zoll QLED-Fernseher!
      </span>
      <span className="text-braun-900/40 mx-1">·</span>
      <span className="font-sans text-xs sm:text-sm text-braun-900/90">Sammle 5 Bälle</span>
      <span className="text-braun-900/40 mx-1">·</span>
      <span className="font-sans text-xs sm:text-sm font-bold text-braun-900 underline underline-offset-2">
        Jetzt mitspielen →
      </span>
    </span>
  )

  return (
    <a
      href="/wm-gewinnspiel"
      aria-label="WM-Gewinnspiel: Gewinne einen 50-Zoll QLED-Fernseher. Jetzt mitspielen."
      className="fixed top-[92px] sm:top-[108px] left-0 right-0 z-40 block overflow-hidden bg-gradient-to-r from-gold via-gold-light to-gold shadow-md group"
    >
      <div className="border-y border-braun-900/15 py-1.5 sm:py-2 overflow-hidden">
        <div className="flex wm-marquee group-hover:[animation-play-state:paused]">
          <Inhalt />
          <Inhalt />
        </div>
      </div>
      {/* Sanfte Randverläufe für edlen Auslauf */}
      <div className="absolute top-0 left-0 bottom-0 w-8 sm:w-14 bg-gradient-to-r from-gold to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-gold to-transparent pointer-events-none" />
    </a>
  )
}
