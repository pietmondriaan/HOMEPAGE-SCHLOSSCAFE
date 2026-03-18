import { useState } from 'react'
import { FaWhatsapp, FaEnvelope, FaShoppingBag, FaStar, FaPalette } from 'react-icons/fa'
import { torten, aktionstorte } from '../data/torten'

function TortenKarte({ torte, onBestellen }) {
  return (
    <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-md">
      <div className="relative h-56 overflow-hidden">
        <img src={`.${torte.bild}`} alt={torte.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        {torte.kategorie === 'aktion' && (
          <div className="absolute top-4 right-4 bg-gold text-braun-900 font-sans text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <FaStar size={10} /> AKTION
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-display text-braun-800 mb-2">{torte.name}</h3>
        <p className="text-braun-500 text-sm leading-relaxed mb-4">{torte.beschreibung}</p>
        {torte.preis && (
          <p className="text-gold font-sans font-bold text-lg mb-4">€ {torte.preis.toFixed(2)}</p>
        )}
        <button
          onClick={() => onBestellen(torte)}
          className="btn-gold w-full text-center text-sm flex items-center justify-center gap-2"
        >
          <FaShoppingBag size={14} /> Ganze Torte bestellen
        </button>
      </div>
    </div>
  )
}

function BestellModal({ torte, onClose }) {
  const [standort, setStandort] = useState('schlosscafe')
  const [datum, setDatum] = useState('')
  const [name, setName] = useState('')
  const [telefon, setTelefon] = useState('')

  const morgen = new Date()
  morgen.setDate(morgen.getDate() + 1)
  const minDatum = morgen.toISOString().split('T')[0]

  const bestellText = `Tortenbestellung:%0A%0ATorte: ${torte.name}%0AAbholung: ${standort === 'schlosscafe' ? 'Schloss-Café Bleiburg' : 'Cafe Reinhardt Eberndorf'}%0ADatum: ${datum}%0AName: ${name}%0ATelefon: ${telefon}`

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-braun-900/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-lg w-full p-5 sm:p-8 shadow-2xl max-h-[90svh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Mobile drag handle */}
        <div className="w-10 h-1 bg-braun-200 rounded-full mx-auto mb-4 sm:hidden" />
        <h3 className="text-xl sm:text-2xl font-display text-braun-800 mb-1.5 sm:mb-2">Bestellung: {torte.name}</h3>
        <p className="text-braun-500 text-xs sm:text-sm mb-4 sm:mb-6">Bitte füllen Sie das Formular aus. Abholung ab morgen möglich.</p>

        <div className="space-y-4">
          <div>
            <label className="font-sans text-sm text-braun-600 block mb-1">Abholstandort</label>
            <select
              value={standort}
              onChange={e => setStandort(e.target.value)}
              className="w-full border border-braun-200 rounded-lg px-4 py-3 text-braun-800 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="schlosscafe">Schloss-Café Bleiburg</option>
              <option value="reinhardt">Cafe Reinhardt Eberndorf</option>
            </select>
          </div>
          <div>
            <label className="font-sans text-sm text-braun-600 block mb-1">Abholdatum</label>
            <input
              type="date"
              min={minDatum}
              value={datum}
              onChange={e => setDatum(e.target.value)}
              className="w-full border border-braun-200 rounded-lg px-4 py-3 text-braun-800 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="font-sans text-sm text-braun-600 block mb-1">Ihr Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Max Mustermann"
              className="w-full border border-braun-200 rounded-lg px-4 py-3 text-braun-800 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="font-sans text-sm text-braun-600 block mb-1">Telefonnummer</label>
            <input
              type="tel"
              value={telefon}
              onChange={e => setTelefon(e.target.value)}
              placeholder="+43 ..."
              className="w-full border border-braun-200 rounded-lg px-4 py-3 text-braun-800 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/4342352979?text=${bestellText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex-1 text-center flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={18} /> Per WhatsApp bestellen
          </a>
          <a
            href={`mailto:oliver.burkhardt@gmx.at?subject=Tortenbestellung: ${torte.name}&body=${bestellText.replace(/%0A/g, '\n')}`}
            className="btn-braun flex-1 text-center flex items-center justify-center gap-2"
          >
            <FaEnvelope size={16} /> Per E-Mail bestellen
          </a>
        </div>
        <button onClick={onClose} className="mt-4 w-full text-center text-braun-400 font-sans text-sm hover:text-braun-600">
          Abbrechen
        </button>
      </div>
    </div>
  )
}

export default function Tortenshop() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="pt-20">
      <section className="py-16 sm:py-24 bg-creme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3">Click & Buy</p>
            <h1 className="text-3xl sm:text-5xl font-display text-braun-800 mb-3 sm:mb-4">Tortenshop</h1>
            <p className="text-braun-500 max-w-2xl mx-auto">
              Bestellen Sie Ihre Lieblingstorte online und holen Sie sie am nächsten Tag
              in einem unserer Cafés ab. Ganze Torten — frisch für Sie zubereitet.
            </p>
          </div>

          {aktionstorte.aktiv && (
            <div className="mb-16">
              <TortenKarte torte={aktionstorte} onBestellen={setSelected} />
            </div>
          )}

          <h2 className="text-2xl font-display text-braun-800 mb-8">Unsere Klassiker</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {torten.map(t => (
              <TortenKarte key={t.id} torte={t} onBestellen={setSelected} />
            ))}
          </div>

          <div className="mt-12 sm:mt-20 bg-braun-100 rounded-2xl p-6 sm:p-10 text-center">
            <FaPalette className="mx-auto text-gold text-3xl sm:text-4xl mb-3 sm:mb-4" />
            <h2 className="text-2xl sm:text-3xl font-display text-braun-800 mb-2 sm:mb-3">Individuelle Torte gewünscht?</h2>
            <p className="text-braun-600 max-w-xl mx-auto mb-6">
              Hochzeitstorten, Geburtstagstorten, Tauftorten — unsere Profis fertigen Ihre Traumtorte
              nach Ihren Wünschen. Senden Sie uns einfach Ihre Vorstellungen!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/4342352979?text=Hallo, ich möchte gerne eine individuelle Torte bestellen."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex items-center justify-center gap-2"
              >
                <FaWhatsapp size={18} /> Per WhatsApp anfragen
              </a>
              <a
                href="mailto:oliver.burkhardt@gmx.at?subject=Individuelle Tortenbestellung"
                className="btn-braun flex items-center justify-center gap-2"
              >
                <FaEnvelope size={16} /> Per E-Mail anfragen
              </a>
            </div>
          </div>
        </div>
      </section>

      {selected && <BestellModal torte={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
