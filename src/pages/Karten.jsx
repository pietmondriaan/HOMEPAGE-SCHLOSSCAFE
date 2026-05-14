import { useState } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight, FaCoffee, FaIceCream } from 'react-icons/fa'
import { usePageTitle } from '../hooks/usePageTitle'

const kategorien = [
  {
    id: 'getraenke',
    label: 'Getränkekarte',
    icon: FaCoffee,
    subtitle: 'Schloss-Café & Cafe Reinhart',
    seiten: [
      { src: './images/karten/getraenke-karte-1.jpg', alt: 'Getränkekarte Seite 1' },
      { src: './images/karten/getraenke-karte-2.jpg', alt: 'Getränkekarte Seite 2' },
    ],
  },
  {
    id: 'eis-reinhard',
    label: 'Eiskarte Reinhart',
    icon: FaIceCream,
    subtitle: 'Cafe Reinhart · Eberndorf',
    seiten: [
      { src: './images/karten/eiskarte-reinhard-0.jpg', alt: 'Eiskarte Reinhart Seite 1' },
      { src: './images/karten/eiskarte-reinhard-1.jpg', alt: 'Eiskarte Reinhart Seite 2' },
      { src: './images/karten/eiskarte-reinhard-2.jpg', alt: 'Eiskarte Reinhart Seite 3' },
      { src: './images/karten/eiskarte-reinhard-3.jpg', alt: 'Eiskarte Reinhart Seite 4' },
      { src: './images/karten/eiskarte-reinhard-4.jpg', alt: 'Eiskarte Reinhart Seite 5' },
      { src: './images/karten/eiskarte-reinhard-5.jpg', alt: 'Eiskarte Reinhart Seite 6' },
      { src: './images/karten/eiskarte-reinhard-6.jpg', alt: 'Eiskarte Reinhart Seite 7' },
    ],
  },
  {
    id: 'eis-schlosscafe',
    label: 'Eiskarte Schloss-Café',
    icon: FaIceCream,
    subtitle: 'Schloss-Café · Bleiburg',
    seiten: [],
    kommt_bald: true,
  },
]

function Lightbox({ seiten, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex)

  const prev = () => setIndex(i => (i > 0 ? i - 1 : seiten.length - 1))
  const next = () => setIndex(i => (i < seiten.length - 1 ? i + 1 : 0))

  const handleKey = (e) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape') onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={0}
      autoFocus
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Schließen"
      >
        <FaTimes size={18} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 font-sans text-sm">
        {index + 1} / {seiten.length}
      </div>

      {/* Prev */}
      {seiten.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          className="absolute left-2 sm:left-6 z-10 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Zurück"
        >
          <FaChevronLeft size={18} />
        </button>
      )}

      {/* Image */}
      <img
        src={seiten[index].src}
        alt={seiten[index].alt}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      {seiten.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          className="absolute right-2 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Weiter"
        >
          <FaChevronRight size={18} />
        </button>
      )}
    </div>
  )
}

export default function Karten() {
  usePageTitle('Speise- & Getränkekarten')
  const [aktiv, setAktiv] = useState('getraenke')
  const [lightbox, setLightbox] = useState(null) // { seiten, index }

  const kat = kategorien.find(k => k.id === aktiv)

  return (
    <div className="pt-20 min-h-screen bg-creme">
      {/* Header */}
      <section className="bg-braun-800 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">Unsere Angebote</p>
          <h1 className="text-4xl sm:text-5xl font-display text-creme mb-4">Speisekarten</h1>
          <p className="text-braun-300 text-sm sm:text-base max-w-xl mx-auto">
            Getränke, Eis und mehr — hier finden Sie alle Karten unserer Cafés zum Durchblättern.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-braun-700 sticky top-16 sm:top-20 z-30 shadow-md">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {kategorien.map(k => {
              const Icon = k.icon
              return (
                <button
                  key={k.id}
                  onClick={() => setAktiv(k.id)}
                  className={`flex items-center gap-2 px-5 py-4 font-sans text-sm whitespace-nowrap border-b-2 transition-colors shrink-0 ${
                    aktiv === k.id
                      ? 'border-gold text-gold font-semibold'
                      : 'border-transparent text-braun-300 hover:text-braun-100'
                  }`}
                >
                  <Icon size={14} />
                  {k.label}
                  {k.kommt_bald && (
                    <span className="ml-1 text-[10px] bg-braun-600 text-braun-300 rounded-full px-2 py-0.5">bald</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-display text-braun-800">{kat.label}</h2>
          <p className="text-braun-500 font-sans text-sm mt-1">{kat.subtitle}</p>
        </div>

        {kat.kommt_bald ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-braun-100 flex items-center justify-center mb-6">
              <FaIceCream className="text-braun-400" size={32} />
            </div>
            <h3 className="text-xl font-display text-braun-700 mb-2">Kommt bald</h3>
            <p className="text-braun-400 text-sm max-w-xs">
              Die Eiskarte des Schloss-Cafés wird in Kürze hier verfügbar sein.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {kat.seiten.map((seite, i) => (
              <button
                key={i}
                onClick={() => setLightbox({ seiten: kat.seiten, index: i })}
                className="group relative rounded-xl overflow-hidden shadow-md bg-white aspect-[3/4] hover:shadow-xl transition-shadow"
                aria-label={`${seite.alt} öffnen`}
              >
                <img
                  src={seite.src}
                  alt={seite.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-braun-900/0 group-hover:bg-braun-900/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-braun-800 font-sans text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                    Vergrößern
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/50 text-white font-sans text-xs px-2 py-0.5 rounded-full">
                  {i + 1}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <Lightbox
          seiten={lightbox.seiten}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}
