import { Link } from 'react-router-dom'
import { useState } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { FaArrowRight, FaShoppingBag, FaCalendarAlt, FaStar, FaPlay, FaClock, FaMapMarkerAlt, FaExternalLinkAlt, FaSnowflake, FaWhatsapp, FaUsers } from 'react-icons/fa'
import { torten, aktionstorte } from '../data/torten'
import { standorte } from '../data/standorte'
import SpiralAnimation from '../components/SpiralAnimation'
import EventTicker from '../components/EventTicker'
import WMEvent from '../components/WMEvent'
import LazyVideo from '../components/LazyVideo'
import Rich from '../components/Rich'
import { useContent } from '../hooks/useContent'

// CMS-Medien: hochgeladene Dateien liefern absolute URLs (https://… oder //…),
// die bleiben unverändert. Relative Projektpfade (/images/…) bekommen das
// `.`-Präfix, damit der Build sie auflöst.
function cmsMediaUrl(p) {
  if (typeof p !== 'string' || !p) return ''
  return /^(https?:)?\/\//i.test(p) ? p : `.${p}`
}
// Erkennt vom Nutzer hochgeladene Videos (kurze Handy-Clips) an der Endung.
function isVideoUrl(p) {
  return typeof p === 'string' && /\.(mp4|mov|webm|m4v)(\?.*)?$/i.test(p)
}

function AutoPlayVideo({ src, poster, className, muted = true, loop = false, playsInline = false, ...props }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        v.play().catch(() => {})
        observer.disconnect()
      }
    }, { rootMargin: '150px' })
    observer.observe(v)
    return () => observer.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload="none"
      className={className}
      {...props}
    />
  )
}


function Hero() {
  const content = useContent()
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="./images/hero-torten.jpg" alt="Hausgemachte Torten im Café mit Herz" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-braun-900/70 via-braun-900/50 to-braun-900/80" />
      </div>
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none hidden sm:block">
        <SpiralAnimation />
      </div>
      <a
        href="https://restaurantguru.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-20 sm:top-24 right-3 sm:right-8 z-20 group flex flex-col items-center gap-1.5"
      >
        <div className="relative">
          <img
            src="./images/restaurant-guru-2026.webp"
            alt="Restaurant Guru – Best Coffeehouse in Bleiburg"
            className="h-16 sm:h-20 lg:h-24 rounded-lg border border-creme/20 shadow-lg group-hover:border-gold/50 transition-all group-hover:scale-105"
          />
        </div>
        <span className="font-sans text-[8px] sm:text-[9px] bg-creme/15 backdrop-blur-sm text-creme/90 px-2 py-0.5 rounded border border-creme/25 font-semibold tracking-wide whitespace-nowrap">
          Best Coffeehouse 2023 – 2026
        </span>
      </a>

      <div className="relative z-10 text-center px-5 sm:px-4 max-w-4xl pt-16 sm:pt-0">
        <p className="font-sans text-gold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-4 sm:mb-6" data-cms="hero.eyebrow">{content.hero.eyebrow}</p>
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-display text-creme mb-4 sm:mb-6 leading-tight" data-cms="meta.business_name">
          {content.meta.business_name}
        </h1>
        <p className="text-braun-200 text-lg sm:text-2xl font-light mb-3 sm:mb-4 italic" data-cms="meta.tagline">
          {content.meta.tagline}
        </p>
        <Rich as="p" className="text-braun-300 text-sm sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed" data-cms="hero.subtitle" text={content.hero.subtitle} />
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link to="/torten" className="btn-gold text-base sm:text-lg flex items-center justify-center gap-2 py-3.5 sm:py-3">
            <FaShoppingBag /> <span data-cms="hero.cta_primary">{content.hero.cta_primary}</span>
          </Link>
          <button onClick={() => document.getElementById('standorte')?.scrollIntoView({ behavior: 'smooth' })} className="btn-braun text-base sm:text-lg cursor-pointer py-3.5 sm:py-3" data-cms="hero.cta_secondary">
            {content.hero.cta_secondary}
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
  const to = standortKey === 'schlosscafe' ? '/schlosscafe' : '/reinhardt'

  return (
    <Link to={to} className="group card-hover rounded-2xl overflow-hidden bg-white shadow-md">
      <div className="relative h-48 sm:h-72 overflow-hidden">
        {s.video ? (
          <>
            <LazyVideo
              src={`.${s.video}`}
              poster={`.${s.bild}`}
              muted
              loop
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white font-sans text-[10px] tracking-wide px-2.5 py-1 rounded-full">
              <FaPlay size={8} />
              Live
            </div>
          </>
        ) : (
          <img src={`.${s.bild}`} alt={s.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
  const content = useContent()
  return (
    <section id="standorte" className="py-16 sm:py-24 bg-creme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3" data-cms="sektionen.standorte.eyebrow">{content.sektionen.standorte.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-braun-800" data-cms="sektionen.standorte.heading">{content.sektionen.standorte.heading}</h2>
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
  const content = useContent()
  const k = content.kulturmoment
  if (k?.aktiv === false) return null
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
                loading="lazy"
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
              <p className="font-sans text-gold tracking-[0.25em] uppercase text-[10px] sm:text-xs" data-cms="kulturmoment.eyebrow">{k.eyebrow}</p>
            </div>

            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-display text-creme leading-[1.08] mb-5 sm:mb-6">
              <span data-cms="kulturmoment.heading_zeile1">{k.heading_zeile1}</span><br /><span data-cms="kulturmoment.heading_zeile2">{k.heading_zeile2}</span><br />
              <span className="text-gold italic" data-cms="kulturmoment.heading_zeile3">{k.heading_zeile3}</span>
            </h2>

            <Rich as="p" className="text-braun-300 text-sm sm:text-base leading-relaxed mb-7 sm:mb-8 max-w-md" data-cms="kulturmoment.beschreibung" text={k.beschreibung} />

            {/* Ausstellungs-Box */}
            <div className="border border-braun-700/60 rounded-xl p-4 sm:p-5 mb-7 sm:mb-8 bg-braun-800/20 backdrop-blur-sm">
              <p className="font-sans text-gold text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-2.5">
                Werner Berg Museum · Bleiburg
              </p>
              <h3 className="font-display text-creme text-lg sm:text-xl mb-1" data-cms="kulturmoment.box_heading">{k.box_heading}</h3>
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

            {/* Museumsbecher */}
            <div className="mb-7 sm:mb-8 rounded-2xl overflow-hidden border border-braun-700/60 flex flex-col sm:flex-row items-stretch">
              <div className="sm:w-32 shrink-0 overflow-hidden">
                <img
                  src="./images/museumsbecher.jpg"
                  alt="Museumsbecher – Helnwein/Berg/Giacometti"
                  loading="lazy"
                  className="w-full h-28 sm:h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 bg-braun-800/40 px-4 py-3.5">
                <p className="font-sans text-[10px] text-gold tracking-[0.18em] uppercase font-semibold mb-1" data-cms="kulturmoment.empfehlung_label">{k.empfehlung_label}</p>
                <p className="font-display text-creme text-base leading-snug mb-1" data-cms="kulturmoment.empfehlung_name">{k.empfehlung_name}</p>
                <Rich as="p" className="font-sans text-braun-400 text-xs leading-relaxed" data-cms="kulturmoment.empfehlung_text" text={k.empfehlung_text} />
              </div>
            </div>

            {/* Pietrowski-Hinweis */}
            <div className="pt-5 border-t border-braun-800">
              <p className="text-braun-500 text-xs leading-relaxed">
                <span className="text-braun-400" data-cms="kulturmoment.pietrowski_lead">{k.pietrowski_lead}</span> Die Dauerausstellung von{' '}
                <a
                  href="https://www.pietrowski.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  Michael Pietrowski
                </a>
                {' '}<Rich as="span" data-cms="kulturmoment.pietrowski_text" text={k.pietrowski_text} />
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function FruehstueckModal({ onClose }) {
  const [datum, setDatum] = useState('')
  const [zeit, setZeit] = useState('')
  const [personen, setPersonen] = useState(2)

  const morgen = new Date()
  morgen.setDate(morgen.getDate() + 1)
  const minDatum = morgen.toISOString().split('T')[0]

  const msg = encodeURIComponent(
    `Hallo, ich möchte ein Frühstück auf Vorbestellung.\n\nDatum: ${datum || '–'}\nUhrzeit: ${zeit ? zeit + ' Uhr' : '–'}\nAnzahl Personen: ${personen}`
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-braun-900/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-5 sm:p-8 shadow-2xl max-h-[90svh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-braun-200 rounded-full mx-auto mb-4 sm:hidden" />
        <h3 className="text-xl sm:text-2xl font-display text-braun-800 mb-1.5">Frühstück vorbestellen</h3>
        <p className="text-braun-500 text-xs sm:text-sm mb-5">
          Wir bereiten alles frisch für Sie vor. Bitte ab morgen einplanen.
        </p>

        <div className="space-y-4">
          <div>
            <label className="font-sans text-sm text-braun-600 block mb-1.5 flex items-center gap-2">
              <FaCalendarAlt className="text-gold" size={12} /> Datum
            </label>
            <input
              type="date"
              min={minDatum}
              value={datum}
              onChange={e => setDatum(e.target.value)}
              className="w-full border border-braun-200 rounded-lg px-4 py-3 text-braun-800 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="font-sans text-sm text-braun-600 block mb-1.5 flex items-center gap-2">
              <FaClock className="text-gold" size={12} /> Uhrzeit
            </label>
            <input
              type="time"
              value={zeit}
              onChange={e => setZeit(e.target.value)}
              className="w-full border border-braun-200 rounded-lg px-4 py-3 text-braun-800 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="font-sans text-sm text-braun-600 block mb-1.5 flex items-center gap-2">
              <FaUsers className="text-gold" size={12} /> Anzahl Personen
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={personen}
              onChange={e => setPersonen(e.target.value)}
              className="w-full border border-braun-200 rounded-lg px-4 py-3 text-braun-800 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>

        <div className="mt-6">
          <a
            href={`https://wa.me/436645336243?text=${msg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={18} /> Per WhatsApp vorbestellen
          </a>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-braun-400 font-sans text-sm hover:text-braun-600"
        >
          Abbrechen
        </button>
      </div>
    </div>
  )
}

function Klassiker() {
  const [fruehstueckOpen, setFruehstueckOpen] = useState(false)
  const content = useContent()
  const items = [
    {
      name: 'Erdbeertörtchen',
      cms: 'erdbeertoertchen',
      beschreibung: content.klassiker.erdbeertoertchen,
      bild: '/images/klassiker/erdbeertortchen.jpg',
      video: null,
    },
    {
      name: 'Schaumrollen',
      cms: 'schaumrollen',
      beschreibung: content.klassiker.schaumrollen,
      bild: '/images/klassiker/schaumrollen.jpg',
      video: '/images/klassiker/schaumrollen.mp4',
    },
    {
      name: 'Frühstück',
      cms: 'fruehstueck',
      beschreibung: content.klassiker.fruehstueck,
      bild: '/images/klassiker/fruehstueck-1.jpg',
      badge: 'Auf Vorbestellung',
    },
    {
      name: 'Eiskreationen',
      cms: 'eiskreationen',
      beschreibung: content.klassiker.eiskreationen,
      bild: null,
      video: '/images/klassiker/eiskreationen.mp4',
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-white" data-cms-section="klassiker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3" data-cms="sektionen.klassiker.eyebrow">{content.sektionen.klassiker.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-braun-800 mb-3 sm:mb-4" data-cms="sektionen.klassiker.heading">{content.sektionen.klassiker.heading}</h2>
          <Rich as="p" className="text-braun-500 text-sm sm:text-base max-w-xl mx-auto" data-cms="sektionen.klassiker.intro" text={content.sektionen.klassiker.intro} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map(item => (
            <div key={item.name} className="card-hover bg-creme rounded-2xl overflow-hidden shadow-md">
              <div className="relative h-60 sm:h-64 overflow-hidden">
                {item.video ? (
                  <LazyVideo
                    src={`.${item.video}`}
                    poster={item.bild ? `.${item.bild}` : undefined}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={`.${item.bild}`} alt={item.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                )}
                {item.video && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white font-sans text-[10px] tracking-wide px-2.5 py-1 rounded-full">
                    <FaPlay size={8} /> Video
                  </div>
                )}
                {item.badge && (
                  <div className="absolute top-3 left-3 bg-gold text-braun-900 font-sans text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow">
                    {item.badge}
                  </div>
                )}
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-display text-braun-800 mb-2">{item.name}</h3>
                <Rich as="p" className="text-braun-500 text-sm leading-relaxed" data-cms={`klassiker.${item.cms}`} text={item.beschreibung} />
                {item.name === 'Frühstück' && (
                  <button
                    onClick={() => setFruehstueckOpen(true)}
                    className="mt-4 btn-gold w-full text-sm flex items-center justify-center gap-2"
                  >
                    <FaShoppingBag size={13} /> Jetzt vorbestellen
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {fruehstueckOpen && <FruehstueckModal onClose={() => setFruehstueckOpen(false)} />}
    </section>
  )
}

function TortenHighlight() {
  const highlights = torten.slice(0, 3)
  const content = useContent()
  const aktion = content.aktionstorte
  return (
    <section className="py-16 sm:py-24 bg-braun-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3" data-cms="sektionen.torten.eyebrow">{content.sektionen.torten.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-braun-800 mb-3 sm:mb-4" data-cms="sektionen.torten.heading">{content.sektionen.torten.heading}</h2>
          <Rich as="p" className="text-braun-500 text-sm sm:text-base max-w-2xl mx-auto" data-cms="sektionen.torten.intro" text={content.sektionen.torten.intro} />
        </div>

        {aktion.aktiv && (
          <div className="mb-10 sm:mb-16 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-center gap-5 sm:gap-8" data-cms-section="aktionstorte">
            <div className="w-full md:w-1/3 h-44 sm:h-56 rounded-xl overflow-hidden">
              <img src={`.${aktionstorte.bild}`} alt={aktion.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <FaStar className="text-gold" />
                <span className="font-sans text-gold text-xs sm:text-sm font-semibold tracking-wide uppercase">Torte des Monats <span data-cms="aktionstorte.monat">{aktion.monat}</span></span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display text-braun-800 mb-2 sm:mb-3" data-cms="aktionstorte.name">{aktion.name}</h3>
              <Rich as="p" className="text-braun-600 text-sm sm:text-base mb-3 sm:mb-4" data-cms="aktionstorte.beschreibung" text={aktion.beschreibung} />
              {aktion.normalpreis && (
                <div className="mb-4 sm:mb-5">
                  <span className="text-braun-400 font-sans text-sm line-through mr-2" data-cms="aktionstorte.normalpreis">€ {aktion.normalpreis}</span>
                  <span className="text-gold font-sans font-bold text-xl" data-cms="aktionstorte.preis">€ {aktion.preis}</span>
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
                <img src={`.${t.bild}`} alt={t.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
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
  const content = useContent()
  const items = content.events?.items || []
  const eventsAktiv = content.events?.aktiv !== false
  const gewinnspielAktiv = content.gewinnspiel?.aktiv

  // Sektion nur rendern wenn Events aktiv + Items vorhanden, ODER Gewinnspiel aktiv
  if (!(eventsAktiv && items.length > 0) && !gewinnspielAktiv) return null

  // Sicherheits-Check: link nur rendern wenn http(s):// oder einzelner /
  // protocol-relative URLs (//host) werden abgelehnt
  function safeHref(link) {
    if (typeof link !== 'string') return null
    const v = link.trim()
    if (/^https?:\/\//i.test(v)) return v
    if (v.startsWith('/') && !v.startsWith('//')) return v
    return null
  }

  return (
    <section id="events" className="py-16 sm:py-24 bg-braun-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3" data-cms="events.eyebrow">{content.events?.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-creme" data-cms="events.heading">{content.events?.heading}</h2>
        </div>
        <WMEvent />
        {eventsAktiv && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {items.map((item, idx) => {
              const href = safeHref(item.link)
              const Wrapper = href ? 'a' : 'div'
              const wrapperProps = href
                ? { href, target: '_blank', rel: 'noopener noreferrer' }
                : {}
              return (
                <Wrapper key={item.titel || idx} {...wrapperProps} className="card-hover bg-braun-700 rounded-2xl overflow-hidden block active:scale-[0.98] transition-transform">
                  {item.bild && (
                    <div className={item.istPlakat ? "overflow-hidden bg-braun-900 flex items-center justify-center" : "h-40 sm:h-48 overflow-hidden"}>
                      {isVideoUrl(item.bild) ? (
                        <LazyVideo
                          src={cmsMediaUrl(item.bild)}
                          muted
                          loop
                          playsInline
                          className={item.istPlakat ? "w-full object-contain" : "w-full h-full object-cover"}
                        />
                      ) : (
                        <img
                          src={cmsMediaUrl(item.bild)}
                          alt={item.titel}
                          loading="lazy"
                          className={item.istPlakat ? "w-full object-contain" : "w-full h-full object-cover"}
                        />
                      )}
                    </div>
                  )}
                  <div className="p-5 sm:p-6">
                    {item.datum && (
                      <div className="flex items-center gap-2 text-gold text-sm mb-2 sm:mb-3">
                        <FaCalendarAlt />
                        <span className="font-sans text-xs sm:text-sm">{item.datum}</span>
                      </div>
                    )}
                    <h3 className="text-lg sm:text-xl font-display text-creme mb-1.5 sm:mb-2">{item.titel}</h3>
                    {item.text && <Rich as="p" className="text-braun-300 text-xs sm:text-sm leading-relaxed" text={item.text} />}
                    {item.ort && <p className="text-gold-light font-sans text-xs mt-2 sm:mt-3">{item.ort}</p>}
                    {href && <p className="text-gold font-sans text-sm mt-2 sm:mt-3 font-semibold">Mehr erfahren →</p>}
                  </div>
                </Wrapper>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

function VermietungTeaser() {
  const waMsg = encodeURIComponent('Hallo, ich interessiere mich für die Vermietung der Eismaschine / des Kühlwagens für eine Veranstaltung.')
  const content = useContent()
  return (
    <section className="relative overflow-hidden bg-braun-900" data-cms-section="vermietung">
      {/* Foto-Hintergrund */}
      <div className="absolute inset-0">
        <img
          src="./images/vermietung/eismaschine-micha.jpg"
          alt="Eisverkäufer Micha"
          loading="lazy"
          className="w-full h-full object-cover object-top opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-braun-900/95 via-braun-900/80 to-braun-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <FaSnowflake className="text-gold" size={14} />
            <span className="font-sans text-gold text-xs tracking-[0.2em] uppercase font-semibold" data-cms="sektionen.vermietung.eyebrow">{content.sektionen.vermietung.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display text-creme mb-4 leading-tight">
            <span data-cms="sektionen.vermietung.heading_zeile1">{content.sektionen.vermietung.heading_zeile1}</span><br />
            <span className="text-gold italic" data-cms="sektionen.vermietung.heading_zeile2">{content.sektionen.vermietung.heading_zeile2}</span>
          </h2>
          <p className="text-braun-300 text-sm sm:text-base leading-relaxed mb-3">
            <Rich as="span" data-cms="sektionen.vermietung.text" text={content.sektionen.vermietung.text} />
            <span className="text-gold font-semibold" data-cms="vermietung.eismaschine_preis_text"> € {content.vermietung.eismaschine_preis_text} für 6 Stunden</span>, inkl. Material, Auf- & Abbau.
          </p>
          <Rich as="p" className="text-braun-400 text-sm mb-8" data-cms="sektionen.vermietung.zusatz_text" text={content.sektionen.vermietung.zusatz_text} />
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
          <p className="font-display text-5xl font-bold leading-none" data-cms="vermietung.eismaschine_preis_text">€ {content.vermietung.eismaschine_preis_text}</p>
          <p className="font-sans text-xs mt-1.5 opacity-75">6 Stunden · inkl. Material</p>
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
