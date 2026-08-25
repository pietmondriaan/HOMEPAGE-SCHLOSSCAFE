import { FaGlassCheers, FaMusic, FaMapMarkerAlt, FaExternalLinkAlt, FaBirthdayCake } from 'react-icons/fa'
import { wiesenmarkt, wiesenmarktAktiv } from '../data/wiesenmarkt'

// Wiesenzelt-Sektion für die Startseite. Blendet sich nach dem letzten
// Markttag selbst aus (WIESENMARKT_ENDE in ../data/wiesenmarkt).
export default function Wiesenzelt() {
  if (!wiesenmarktAktiv()) return null
  const w = wiesenmarkt

  return (
    <section id="wiesenzelt" className="relative overflow-hidden bg-braun-900">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FaGlassCheers className="text-gold" size={14} />
            <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm">
              {w.ort} · {w.zeitraumKurz}
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-creme leading-tight">
            Unser <span className="text-gold italic">Wiesenzelt</span>
          </h2>
          <p className="text-braun-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            {w.taeglich}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Plakate — bleiben am Desktop stehen, während das Programm scrollt */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:sticky lg:top-28">
            <img
              src={`.${w.plakat}`}
              alt={`Programm im ${w.titel} am ${w.ort}`}
              loading="lazy"
              className="w-full rounded-xl border border-gold/25 shadow-2xl"
            />
            <img
              src={`.${w.plakatWiesnstadl}`}
              alt="NEU & LIVE Wiesnstadl am Bleiburger Wiesenmarkt"
              loading="lazy"
              className="w-full rounded-xl border border-gold/25 shadow-2xl"
            />
          </div>

          {/* Programm */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <FaMusic className="text-gold" size={13} />
              <p className="font-sans text-gold text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold">
                Das Programm im Zelt
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {w.programm.map(tag => (
                <div
                  key={tag.id}
                  className="rounded-xl border border-braun-700/60 bg-braun-800/40 p-4 sm:p-5"
                >
                  <div className="flex items-baseline gap-3 mb-2.5">
                    <span className="bg-gold text-braun-900 font-sans text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shrink-0">
                      {tag.tagKurz}
                    </span>
                    <h3 className="font-display text-creme text-lg sm:text-xl leading-snug">
                      {tag.titel}
                    </h3>
                  </div>
                  <ul className="space-y-1.5">
                    {tag.punkte.map(p => (
                      <li key={p} className="flex items-start gap-2 text-braun-300 text-xs sm:text-sm leading-relaxed">
                        <span className="text-gold/50 mt-1.5 shrink-0">◆</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-braun-300 text-xs sm:text-sm mt-6">
              <FaMapMarkerAlt className="text-gold/70 shrink-0" size={11} />
              <span>Ihr findet uns im Schloss-Café-Zelt am Wiesenmarktgelände Bleiburg.</span>
            </div>
            <div className="flex items-center gap-2 text-braun-300 text-xs sm:text-sm mt-2">
              <FaBirthdayCake className="text-gold/70 shrink-0" size={11} />
              <span>Durchgehend geöffnet von {w.zeitraum.replace(' 2026', '')}.</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <a
                href={w.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-sm inline-flex items-center justify-center gap-2"
              >
                <FaExternalLinkAlt size={11} /> Zum Bleiburger Wiesenmarkt
              </a>
              <a
                href="#events"
                className="btn-braun text-sm inline-flex items-center justify-center gap-2 !border-braun-600"
              >
                Alle Veranstaltungen
              </a>
            </div>

            <p className="text-braun-500 font-sans text-[11px] mt-6 leading-relaxed">
              Mit dabei: {w.partner.join(' · ')}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
