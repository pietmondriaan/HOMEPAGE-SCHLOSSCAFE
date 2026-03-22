import { Link } from 'react-router-dom'
import { FaArrowRight, FaShoppingBag, FaCalendarAlt, FaStar } from 'react-icons/fa'
import { torten, aktionstorte } from '../data/torten'
import { events } from '../data/events'
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
      {/* Spiral only on larger screens for performance */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none hidden sm:block">
        <SpiralAnimation />
      </div>
      {/* Restaurant Guru Badge — oben rechts */}
      <a
        href="https://restaurantguru.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-20 sm:top-24 right-4 sm:right-8 z-20 group hidden sm:flex flex-col items-center gap-1.5"
      >
        <img
          src="./images/restaurant-guru-badge.webp"
          alt="Restaurant Guru 2023 — Best Coffeehouse in Bleiburg"
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
            <Link
              key={key}
              to={`/${key === 'schlosscafe' ? 'schlosscafe' : 'reinhardt'}`}
              className="group card-hover rounded-2xl overflow-hidden bg-white shadow-md"
            >
              <div className="relative h-48 sm:h-72 overflow-hidden">
                <img src={`.${s.bild}`} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-braun-900/60 to-transparent" />
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
            Aus hochwertigen, regionalen Zutaten — von unseren Konditormeistern täglich frisch zubereitet.
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
                <span className="font-sans text-gold text-xs sm:text-sm font-semibold tracking-wide uppercase">Aktion der Woche</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display text-braun-800 mb-2 sm:mb-3">{aktionstorte.name}</h3>
              <p className="text-braun-600 text-sm sm:text-base mb-4 sm:mb-5">{aktionstorte.beschreibung}</p>
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

function Events() {
  const aktiveEvents = events.filter(e => e.aktiv)
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
              <div className="h-40 sm:h-48 overflow-hidden">
                <img src={`.${e.bild}`} alt={e.titel} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 text-gold text-sm mb-2 sm:mb-3">
                  <FaCalendarAlt />
                  <span className="font-sans text-xs sm:text-sm">{e.dauerausstellung ? 'Dauerausstellung' : new Date(e.datum).toLocaleDateString('de-AT', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
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

export default function Home() {
  return (
    <>
      <Hero />
      <Standorte />
      <TortenHighlight />
      <Events />
    </>
  )
}
