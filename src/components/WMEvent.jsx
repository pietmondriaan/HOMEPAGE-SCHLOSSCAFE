import { FaFutbol, FaCalendarAlt, FaArrowRight } from 'react-icons/fa'

// Gewinnspiel-Laufzeit: nach diesem Datum (Europe/Vienna) wird der Event-Block ausgeblendet.
const WM_ENDE = '2026-07-19'

function heuteWien() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Vienna',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

export default function WMEvent() {
  if (heuteWien() > WM_ENDE) return null

  return (
    <div className="mb-10 sm:mb-16 bg-gradient-to-br from-braun-700 to-braun-900 rounded-2xl border border-gold/30 overflow-hidden shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8">

        {/* Plakat */}
        <a
          href="/wm-gewinnspiel"
          aria-label="Zum WM-Gewinnspiel"
          className="block group p-5 sm:p-8 flex items-center justify-center"
        >
          <img
            src="./wm-gewinnspiel/plakat.jpg"
            alt="WM-Gewinnspiel Plakat – 50-Zoll QLED-Fernseher gewinnen"
            loading="lazy"
            className="w-auto max-h-[55vh] sm:max-h-[70vh] rounded-xl border border-gold/30 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </a>

        {/* Text */}
        <div className="px-5 pb-7 sm:px-8 sm:pb-10 lg:py-10 lg:pr-12">
          {/* Mitgesponsert — Elektro Enzi prominent vorangestellt */}
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-white rounded-lg px-3 py-2 shadow-md shrink-0">
              <img
                src="./images/logos/elektro-enzi-logo.jpg"
                alt="Elektro Enzi Bleiburg"
                className="h-8 sm:h-10 w-auto block"
              />
            </div>
            <span className="font-sans text-gold text-[10px] sm:text-xs tracking-[0.18em] uppercase font-semibold leading-tight">
              Hauptpreis<br className="hidden sm:block" /> mitgesponsert von Elektro Enzi
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <FaFutbol className="text-gold" size={14} />
            <span className="font-sans text-gold text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold">
              WM-Gewinnspiel
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl xl:text-4xl font-display text-creme leading-tight mb-3 sm:mb-4">
            50-Zoll-Fernseher<br />
            <span className="text-gold italic">gewinnen</span>
          </h3>

          <p className="text-braun-300 text-sm sm:text-base leading-relaxed mb-4">
            Sammle bei jedem Besuch Stempel auf deiner WM-Stempelkarte. Volle Karte (5 Bälle) =
            Los für den Hauptpreis: ein <span className="text-creme font-medium">Hisense 50A7Q QLED</span>-Fernseher.
          </p>

          <div className="flex items-center gap-2 text-braun-300 text-xs mb-6">
            <FaCalendarAlt className="text-gold/70 shrink-0" size={11} />
            <span>11. Juni – 19. Juli 2026 · gesponsert von Café mit Herz &amp; Elektro Enzi</span>
          </div>

          <a href="/wm-gewinnspiel" className="btn-gold text-sm inline-flex items-center gap-2">
            Jetzt mitspielen <FaArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  )
}
