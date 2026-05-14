import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { FaArrowRight, FaShoppingBag, FaCalendarAlt, FaStar, FaPlay, FaClock, FaMapMarkerAlt, FaExternalLinkAlt, FaSnowflake, FaWhatsapp } from 'react-icons/fa'
import { torten, aktionstorte } from '../data/torten'
import { getActiveEvents } from '../data/events'
import { standorte } from '../data/standorte'
import SpiralAnimation from '../components/SpiralAnimation'
import EventTicker from '../components/EventTicker'

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="./images/galerie/galerie-01.jpg" alt="Café mit Herz" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-braun-900/70 via-braun-900/50 to-braun-900/80" />
      </div>
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none hidden sm:block">
        <SpiralAnimation />
      </div>
      <a
        href="https://restaurantguru.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-20 sm:top-24 right-4 sm:right-8 z-20 group hidden sm:flex flex-col items-center gap-1.5"
      >
        <img
          src="./images/restaurant-guru-badge.webp"
          alt="Restaurant Guru 2023 – Best Coffeehouse in Bleiburg"
          className="h-16 lg:h-20 rounded-lg border border-creme/20 shadow-lg group-hover:border-gold/50 transition-all group-hover:scale-105"
        />
        <span className="text-[10px] text-creme/60 font-sans tracking-wide uppercase">Best Coffeehouse 2023</span>
      </a>

      <div className="relative z-10 text-center px-5 sm:px-4 max-w-4xl pt-16 sm:pt-0">
        <p className="font-sans text-gold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-4 sm:mb-6">Willkommen bei</p>
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-display text-creme mb-4 sm:mb-6 leading-tight">
          Café mit Herz
        </h1>
        <p className="text-braun-200 text-lg sm:text-2xl font-light mb-3 sm:mb-4 italic">
          Gastfreundschaft mit ganz viel Herz!
        </p>
        <p className="text-braun-300 text-sm sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
          Genießen Sie täglich frische, hausgemachte Mehlspeisen, Torten und Eisspezialitäten
          in unseren Cafés in Bleiburg und Eberndorf am Klopeinersee.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link to="/torten" className="btn-gold text-base sm:text-lg flex items-center justify-center gap-2 py-3.5 sm:py-3">
            <FaShoppingBag /> Torte bestellen
          </Link>
          <button onClick={() => document.getElementById('standorte')?.scrollIntoView({ behavior: 'smooth' })} className="btn-braun text-base sm:text-lg cursor-pointer py-3.5 sm:py-3">
            Unsere Cafés entdecken
          </button>
        </div>
      </div>
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-creme/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-creme/60 rounded-full" />
        </div>
      </div>
      <EventTicker />
    </section>
  )
}

function StandortKarte({ standortKey, s }) {
  const videoRef = useRef(null)
  const to = standortKey === 'schlosscafe' ? '/schlosscafe' : '/reinhardt'

  return (
    <Link to={to} className="group card-hover rounded-2xl overflow-hidden bg-white shadow-md">
      <div className="relative h-48 sm:h-72 overflow-hidden">
        {s.video ? (
          <>
            <video
              ref={videoRef}
              src={`.${s.video}`}
              autoPlay
              muted
              loop
              playsInline
              poster={`.${s.bild}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white font-sans text-[10px] tracking-wide px-2.5 py-1 rounded-full">
              <FaPlay size={8} />
              Live
            </div>
          </>
        ) : (
          <img src={`.${s.bild}`} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-braun-900/60 to-transparent" />
        {s.badge && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gold text-braun-900 font-sans text-[10px] sm:text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow">
            {s.badge}
          </div>
        )}
        <img src={`.${s.logo}`} alt={`${s.name} Logo`} className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 h-12 sm:h-16 drop-shadow-lg" />
      </div>
      <div className="p-5 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-display text-braun-800 mb-1">{s.name}</h3>
        <p className="text-gold font-sans text-sm mb-2 sm:mb-3">{s.ort}</p>
        <p className="text-braun-600 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-none">{s.beschreibung}</p>
        <div className="flex items-center gap-2 text-gold font-sans text-sm font-semibold group-hover:gap-4 transition-all">
          Mehr erfahren <FaArrowRight />
        </div>
      </div>
    </Link>
  )
}

function Standorte() {
  return (
    <section id="standorte" className="py-16 sm:py-24 bg-creme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3">Zwei Cafés, ein Herz</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-braun-800">Unsere Standorte</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          {Object.entries(standorte).map(([key, s]) => (
            <StandortKarte key={key} standortKey={key} s={s} />
          ))}
        </div>
      </div>
    </section>
  )
}

function KulturMoment() {
  return (
    <section className="bg-[#0c0906] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 items-center">

          {/* Foto */}
          <div className="relative order-1 lg:order-1 lg:pr-12 xl:pr-16">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="./images/helnwein-besuch.jpg"
                alt="Gottfried Helnwein zu Gast im Schloss-Café Bleiburg"
                className="w-full aspect-[4/5] sm:aspect-[3/4] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0906]/70 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c0906]/20" />
            </div>
            {/* Datum-Badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-gold text-braun-900 font-sans text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full shadow-lg">
              7. Mai 2026
            </div>
            {/* Dezente Linie links */}
            <div className="hidden lg:block absolute -left-1 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          </div>

          {/* Text */}
          <div className="order-2 lg:order-2 lg:pl-8 xl:pl-12">
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <div className="w-8 h-px bg-gold" />
              <p className="font-sans text-gold tracking-[0.25em] uppercase text-[10px] sm:text-xs">Besonderer Besuch</p>
            </div>

            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-display text-creme leading-[1.08] mb-5 sm:mb-6">
              Gottfried<br />Helnwein<br />
              <span className="text-gold italic">zu Gast</span>
            </h2>

            <p className="text-braun-300 text-sm sm:text-base leading-relaxed mb-7 sm:mb-8 max-w-md">
              Der Weltkünstler und Ehrenbürger von Bleiburg besuchte anlässlich der Eröffnung
              der Ausstellung seiner Tochter <span className="text-creme font-medium">Mercedes Helnwein</span> im
              Werner Berg Museum das Schloss-Café — nur wenige Schritte vom Museum entfernt, am selben Platz.
            </p>

            {/* Ausstellungs-Box */}
            <div className="border border-braun-700/60 rounded-xl p-4 sm:p-5 mb-7 sm:mb-8 bg-braun-800/20 backdrop-blur-sm">
              <p className="font-sans text-gold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-2.5">
                Werner Berg Museum · Bleiburg
              </p>
              <h3 className="font-display text-creme text-lg sm:text-xl mb-1">Drei Welten im Nahbereich</h3>
              <p className="text-braun-400 text-xs mb-3.5 italic">
                Mercedes Helnwein · Werner Berg · Alberto Giacometti
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-braun-300 text-xs">
                  <FaCalendarAlt className="text-gold/70 shrink-0" size={10} />
                  <span>8. Mai – 8. November 2026</span>
                </div>
                <div className="flex items-center gap-2 text-braun-300 text-xs">
                  <FaClock className="text-gold/70 shrink-0" size={10} />
                  <span>Di–So, 10:00–18:00 Uhr</span>
                </div>
                <div className="flex items-center gap-2 text-braun-300 text-xs">
                  <FaMapMarkerAlt className="text-gold/70 shrink-0" size={10} />
                  <span>10. Oktober Platz 4 · direkt am Schlossplatz</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-7 sm:mb-8">
              <a
                href="https://www.wernerberg.museum"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-braun text-sm inline-flex items-center justify-center gap-2 !border-braun-600"
              >
                <FaExternalLinkAlt size={11} /> Zum Werner Berg Museum
              </a>
              <Link to="/kontakt" className="btn-gold text-sm inline-flex items-center justify-center gap-2">
                Tisch reservieren
              </Link>
            </div>

            {/* Pietrowski-Hinweis */}
            <div className="pt-5 border-t border-braun-800">
              <p className="text-braun-500 text-xs leading-relaxed">
                <span className="text-braun-400">Kunst direkt im Café:</span> Die Dauerausstellung von{' '}
                <a
                  href="https://www.pietrowski.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  Michael Pietrowski
                </a>
                {' '}— Fadenbilder, Acryl & CrossArt — ist täglich im Schloss-Café zu sehen und käuflich zu erwerben.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function Klassiker() {
  const items = [
    {
      name: 'Erdbeertörtchen',
      beschreibung: 'Hausgemachte Roulade mit Marillen-Marmelade, gesüßtem Schlagobers, frischen Erdbeeren und säuerlicher Gelatine — ein Klassiker der Vitrine.',
      bild: '/images/klassiker/erdbeertortchen.jpg',
      video: null,
    },
    {
      name: 'Schaumrollen',
      beschreibung: 'Hauchdünner Blätterteig, gefüllt mit süßem Ei-Schnee nach Art des Hauses — hausgemacht wie eh und je.',
      bild: '/images/klassiker/schaumrollen.jpg',
      video: '/images/klassiker/schaumrollen.mp4',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3">Café Reinhart &amp; Schloss-Café</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-braun-800 mb-3 sm:mb-4">Unsere Klassiker</h2>
          <p className="text-braun-500 text-sm sm:text-base max-w-xl mx-auto">
            Täglich frisch in unseren Cafés — die Mehlspeisen, für die man immer wieder kommt.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-4xl mx-auto">
          {items.map(item => (
            <div key={item.name} className="card-hover bg-creme rounded-2xl overflow-hidden shadow-md">
              <div className="relative h-60 sm:h-72 overflow-hidden">
                {item.video ? (
                  <video
                    src={`.${item.video}`}
                    poster={`.${item.bild}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={`.${item.bild}`} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                )}
                {item.video && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white font-sans text-[10px] tracking-wide px-2.5 py-1 rounded-full">
                    <FaPlay size={8} /> Video
                  </div>
                )}
              </div>
              <div className="p-5 sm:p-7">
                <h3 className="text-xl sm:text-2xl font-display text-braun-800 mb-2">{item.name}</h3>
                <p className="text-braun-500 text-sm leading-relaxed">{item.beschreibung}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TortenHighlight() {
  const highlights = torten.slice(0, 3)
  return (
    <section className="py-16 sm:py-24 bg-braun-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3">Schlemmen, Entspannen, Genießen</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-braun-800 mb-3 sm:mb-4">Unsere Torten</h2>
          <p className="text-braun-500 text-sm sm:text-base max-w-2xl mx-auto">
            Aus hochwertigen, regionalen Zutaten – von unseren Konditormeistern täglich frisch zubereitet.
          </p>
        </div>

        {aktionstorte.aktiv && (
          <div className="mb-10 sm:mb-16 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-center gap-5 sm:gap-8">
            <div className="w-full md:w-1/3 h-44 sm:h-56 rounded-xl overflow-hidden">
              <img src={`.${aktionstorte.bild}`} alt={aktionstorte.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <FaStar className="text-gold" />
                <span className="font-sans text-gold text-xs sm:text-sm font-semibold tracking-wide uppercase">Torte des Monats {aktionstorte.monat}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display text-braun-800 mb-2 sm:mb-3">{aktionstorte.name}</h3>
              <p className="text-braun-600 text-sm sm:text-base mb-3 sm:mb-4">{aktionstorte.beschreibung}</p>
              {aktionstorte.normalpreis && (
                <div className="mb-4 sm:mb-5">
                  <span className="text-braun-400 font-sans text-sm line-through mr-2">€ {aktionstorte.normalpreis.toFixed(2)}</span>
                  <span className="text-gold font-sans font-bold text-xl">€ {aktionstorte.preis.toFixed(2)}</span>
                  <span className="text-braun-500 font-sans text-xs ml-2">bei Online-Bestellung</span>
                </div>
              )}
              <Link to="/torten" className="btn-gold">Jetzt bestellen</Link>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {highlights.map(t => (
            <div key={t.id} className="card-hover bg-white rounded-2xl overflow-hidden shadow-md">
              <div className="h-44 sm:h-52 overflow-hidden">
                <img src={`.${t.bild}`} alt={t.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-display text-braun-800 mb-1.5 sm:mb-2">{t.name}</h3>
                <p className="text-braun-500 text-sm leading-relaxed">{t.beschreibung}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 sm:mt-12">
          <Link to="/torten" className="btn-braun inline-flex items-center gap-2">
            Alle Torten & Bestellung <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}

function VideoKarte({ e }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (v) v.play().catch(() => {})
  }, [])
  return (
    <div className="relative h-40 sm:h-48 overflow-hidden bg-braun-900">
      <video
        ref={ref}
        src={`.${e.video}`}
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-braun-900/40 to-transparent" />
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white font-sans text-[10px] tracking-wide px-2.5 py-1 rounded-full">
        <FaPlay size={8} />
        Video
      </div>
      {e.immer_zeigen && (
        <div className="absolute top-3 left-3 bg-gold text-braun-900 font-sans text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow">
          Aktuell
        </div>
      )}
    </div>
  )
}

function Events() {
  const aktiveEvents = getActiveEvents()
  if (aktiveEvents.length === 0) return null

  return (
    <section id="events" className="py-16 sm:py-24 bg-braun-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3">Was ist los?</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-creme">Veranstaltungen</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {aktiveEvents.map(e => (
            <a key={e.id} href={e.link || '#'} target={e.link ? '_blank' : ''} rel="noopener noreferrer" className="card-hover bg-braun-700 rounded-2xl overflow-hidden block active:scale-[0.98] transition-transform">
              {e.video ? (
                <VideoKarte e={e} />
              ) : (
                <div className={e.istPlakat ? "overflow-hidden bg-braun-900 flex items-center justify-center" : "h-40 sm:h-48 overflow-hidden"}>
                  <img src={`.${e.bild}`} alt={e.titel} className={e.istPlakat ? "w-full object-contain" : `w-full h-full object-cover ${e.objektPos === 'top' ? 'object-top' : ''}`} />
                </div>
              )}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 text-gold text-sm mb-2 sm:mb-3">
                  <FaCalendarAlt />
                  <span className="font-sans text-xs sm:text-sm">
                    {e.dauerausstellung ? 'Dauerausstellung' : new Date(e.datum).toLocaleDateString('de-AT', { day: 'numeric', month: 'long', year: 'numeric' })}
                    {e.uhrzeit ? ` · ${e.uhrzeit}` : ''}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-display text-creme mb-1.5 sm:mb-2">{e.titel}</h3>
                <p className="text-braun-300 text-xs sm:text-sm leading-relaxed">{e.beschreibung}</p>
                <p className="text-gold-light font-sans text-xs mt-2 sm:mt-3">{e.ort}</p>
                {e.link && <p className="text-gold font-sans text-sm mt-2 sm:mt-3 font-semibold">Mehr erfahren →</p>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function VermietungTeaser() {
  const waMsg = encodeURIComponent('Hallo, ich interessiere mich für die Vermietung der Eismaschine / des Kühlwagens für eine Veranstaltung.')
  return (
    <section className="relative overflow-hidden bg-braun-900">
      {/* Foto-Hintergrund */}
      <div className="absolute inset-0">
        <img
          src="./images/vermietung/eismaschine-micha.jpg"
          alt="Eisverkäufer Micha"
          className="w-full h-full object-cover object-top opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-braun-900/95 via-braun-900/80 to-braun-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <FaSnowflake className="text-gold" size={14} />
            <span className="font-sans text-gold text-xs tracking-[0.2em] uppercase font-semibold">Events & Vermietung</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display text-creme mb-4 leading-tight">
            Eis für Ihr Fest —<br />
            <span className="text-gold italic">mit Micha dabei.</span>
          </h2>
          <p className="text-braun-300 text-sm sm:text-base leading-relaxed mb-3">
            Soft-Eis-Maschine inkl. Eisverkäufer Micha für Ihren Event —
            <span className="text-gold font-semibold"> € 500 pro Tag</span>, inkl. Material, Auf- & Abbau.
          </p>
          <p className="text-braun-400 text-sm mb-8">
            Außerdem: Kühlwagen-Vermietung auf Anfrage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/vermietung" className="btn-gold flex items-center justify-center gap-2 text-sm">
              Alle Angebote <FaArrowRight size={12} />
            </Link>
            <a
              href={`https://wa.me/436645336243?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-braun flex items-center justify-center gap-2 text-sm !border-braun-600"
            >
              <FaWhatsapp size={15} /> Direkt anfragen
            </a>
          </div>
        </div>
      </div>

      {/* Preis-Badge rechts (Desktop) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center">
        <div className="bg-gradient-to-br from-gold via-gold-light to-gold text-braun-900 rounded-2xl px-8 py-6 shadow-[0_8px_40px_rgba(201,168,108,0.5)] text-center">
          <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold mb-1 opacity-70">mit Micha</p>
          <p className="font-display text-5xl font-bold leading-none">€ 500</p>
          <p className="font-sans text-xs mt-1.5 opacity-75">pro Tag · inkl. Material</p>
        </div>
        <p className="text-braun-500 font-sans text-[10px] mt-3 italic">exkl. Trinkgeld</p>
      </div>
    </section>
  )
}

export default function Home() {
  usePageTitle(null)
  return (
    <>
      <Hero />
      <Standorte />
      <Klassiker />
      <KulturMoment />
      <TortenHighlight />
      <VermietungTeaser />
      <Events />
    </>
  )
}
