import { useState } from 'react'
import { FaStar, FaPalette } from 'react-icons/fa'
import { events } from '../data/events'
import { aktionstorte } from '../data/torten'

function TickerItem({ icon, label, text, accent }) {
  return (
    <span className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 whitespace-nowrap">
      <span className={`text-xs ${accent ? 'text-gold' : 'text-gold/70'}`}>{icon}</span>
      {label && (
        <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.15em] uppercase text-gold/80 font-semibold">{label}</span>
      )}
      <span className="text-creme/90 text-xs sm:text-sm font-light">{text}</span>
      <span className="text-gold/30 mx-2 sm:mx-4">◆</span>
    </span>
  )
}

export default function EventTicker() {
  const [isPaused, setIsPaused] = useState(false)
  const items = []

  if (aktionstorte.aktiv) {
    items.push({
      icon: <FaStar size={10} />,
      label: 'Torte der Woche',
      text: aktionstorte.name + ' — jetzt bestellen',
      accent: true,
    })
  }

  events.filter(e => e.aktiv).forEach(e => {
    items.push({
      icon: <FaPalette size={10} />,
      label: e.dauerausstellung ? 'Ausstellung' : 'Event',
      text: `${e.titel} · ${e.ort}`,
      accent: false,
    })
  })

  if (items.length === 0) return null

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
    >
      <div className="relative bg-braun-900/50 backdrop-blur-md border-t border-gold/10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="py-2.5 sm:py-3 overflow-hidden">
          <div
            className="inline-flex ticker-scroll"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {[...items, ...items, ...items].map((item, i) => (
              <TickerItem key={i} {...item} />
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-braun-900/60 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-braun-900/60 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
