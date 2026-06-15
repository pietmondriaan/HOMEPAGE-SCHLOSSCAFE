import { useState } from 'react'
import { FaWhatsapp, FaEnvelope, FaShoppingBag, FaStar, FaPalette, FaInfoCircle, FaExclamationTriangle, FaTruck, FaChurch, FaHeart, FaBirthdayCake, FaGift } from 'react-icons/fa'
import LazyVideo from '../components/LazyVideo'
import Rich from '../components/Rich'
import { torten, aktionstorte } from '../data/torten'
import { usePageTitle } from '../hooks/usePageTitle'
import { useContent } from '../hooks/useContent'

// Preise kommen als Zahl (data/torten.js) oder als String (CMS) — beides als "58.00" anzeigen.
const fmtPreis = (p) => (typeof p === 'number' ? p.toFixed(2) : p)

// Anlasstorten = die Torten, nach denen in der KI-Suche gefragt wird (Tauf-, Kommunions-,
// Hochzeits-, Geburtstagstorten). Prominent im Tortenshop, damit ChatGPT/Gemini das Angebot zitieren.
const anlaesse = [
  { icon: FaChurch, titel: 'Tauftorten', text: 'Liebevoll gestaltete Tauftorten – klassisch mit Schrift und Symbol oder individuell als Motivtorte.' },
  { icon: FaChurch, titel: 'Kommunion- & Firmungstorten', text: 'Festtagstorten zur Erstkommunion und Firmung – abgestimmt auf Ihr Fest, in jeder gewünschten Größe.' },
  { icon: FaHeart, titel: 'Hochzeitstorten', text: 'Mehrstöckige Hochzeitstorten nach Ihren Vorstellungen – von klassisch-elegant bis modern mit Fondant.' },
  { icon: FaBirthdayCake, titel: 'Geburtstagstorten', text: 'Geburtstagstorten für Groß und Klein – mit Wunschmotiv, Lieblingsgeschmack und persönlicher Schrift.' },
  { icon: FaPalette, titel: 'Motivtorten', text: 'Individuelle Motivtorten zu jedem Thema – Sie nennen uns Anlass, Motiv und Personenzahl, wir setzen es um.' },
  { icon: FaGift, titel: 'Anlass- & Festtagstorten', text: 'Jubiläum, Taufe, Verlobung, Firmenfeier oder einfach so – für jeden Anlass Ihre individuelle Torte.' },
]

// EU-LMIV 1169/2011 — die 14 deklarationspflichtigen Allergene (Buchstabencode österr. Wirteliste).
const ALLERGEN_LISTE = [
  { code: 'A', name: 'Glutenhaltige Getreide', detail: 'Weizen, Roggen, Gerste, Hafer, Dinkel, Kamut' },
  { code: 'B', name: 'Krebstiere' },
  { code: 'C', name: 'Eier' },
  { code: 'D', name: 'Fische' },
  { code: 'E', name: 'Erdnüsse' },
  { code: 'F', name: 'Sojabohnen' },
  { code: 'G', name: 'Milch und Laktose' },
  { code: 'H', name: 'Schalenfrüchte', detail: 'Mandeln, Haselnüsse, Walnüsse, Cashews, Pekan, Para, Pistazien, Macadamia' },
  { code: 'L', name: 'Sellerie' },
  { code: 'M', name: 'Senf' },
  { code: 'N', name: 'Sesamsamen' },
  { code: 'O', name: 'Sulfite / Schwefeldioxid' },
  { code: 'P', name: 'Lupinen' },
  { code: 'R', name: 'Weichtiere' },
]
const ALLERGEN_MAP = Object.fromEntries(ALLERGEN_LISTE.map(a => [a.code, a]))

function AllergenModal({ torte, onClose }) {
  const codes = torte.allergene || []
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-braun-900/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full p-5 sm:p-7 shadow-2xl max-h-[90svh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="w-10 h-1 bg-braun-200 rounded-full mx-auto mb-4 sm:hidden" />
        <div className="flex items-start gap-3 mb-1">
          <FaInfoCircle className="text-gold text-xl shrink-0 mt-1" />
          <div>
            <p className="font-sans text-gold text-[10px] tracking-[0.2em] uppercase font-semibold">Allergeninformation</p>
            <h3 className="text-xl sm:text-2xl font-display text-braun-800">{torte.name}</h3>
          </div>
        </div>
        <p className="text-braun-500 text-xs mb-5 ml-8">gem. EU-Verordnung 1169/2011 (LMIV)</p>

        {codes.length === 0 ? (
          <p className="text-braun-600 text-sm">Keine deklarationspflichtigen Allergene bekannt.</p>
        ) : (
          <>
            <p className="text-braun-700 text-sm font-semibold mb-3">Enthält:</p>
            <ul className="space-y-2 mb-5">
              {codes.map(c => {
                const a = ALLERGEN_MAP[c]
                if (!a) return null
                return (
                  <li key={c} className="flex items-start gap-3 bg-creme rounded-lg p-3">
                    <span className="bg-gold text-braun-900 font-sans font-bold text-xs w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                      {c}
                    </span>
                    <div>
                      <p className="font-sans text-braun-800 text-sm font-semibold">{a.name}</p>
                      {a.detail && <p className="text-braun-500 text-xs mt-0.5">{a.detail}</p>}
                    </div>
                  </li>
                )
              })}
            </ul>
          </>
        )}

        <div className="bg-braun-100 border-l-4 border-gold rounded-r-lg p-3 mb-5 flex gap-2.5">
          <FaExclamationTriangle className="text-gold shrink-0 mt-0.5" size={14} />
          <p className="text-braun-700 text-xs leading-relaxed">
            Angaben ohne Gewähr. Spuren weiterer Allergene können produktionsbedingt enthalten sein.
            Bei Allergien oder Unverträglichkeiten bitte vor der Bestellung im Café nachfragen
            (<a href="tel:+436645336243" className="text-gold underline">+43 664 533 6243</a>).
          </p>
        </div>

        <button onClick={onClose} className="w-full btn-braun text-sm">Schließen</button>
      </div>
    </div>
  )
}

function TortenKarte({ torte, onBestellen, onAllergene, cmsPrefix }) {
  const cms = (feld) => (cmsPrefix ? `${cmsPrefix}.${feld}` : undefined)
  return (
    <div className="card-hover bg-white rounded-2xl overflow-hidden shadow-md">
      <div className="relative h-56 overflow-hidden">
        {torte.video ? (
          <LazyVideo
            src={`.${torte.video}`}
            poster={`.${torte.bild}`}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={`.${torte.bild}`} alt={torte.name} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        )}
        {torte.kategorie === 'aktion' && (
          <div className="absolute top-4 right-4 bg-gold text-braun-900 font-sans text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <FaStar size={10} /> TORTE DES MONATS
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-display text-braun-800 mb-2" data-cms={cms('name')}>{torte.name}</h3>
        <Rich as="p" className="text-braun-500 text-sm leading-relaxed mb-4" data-cms={cms('beschreibung')} text={torte.beschreibung} />
        {torte.normalpreis && (
          <div className="mb-4">
            <p className="text-braun-400 font-sans text-sm line-through" data-cms={cms('normalpreis')}>€ {fmtPreis(torte.normalpreis)}</p>
            <p className="text-gold font-sans font-bold text-xl" data-cms={cms('preis')}>€ {fmtPreis(torte.preis)} <span className="text-sm font-normal">bei Online-Bestellung</span></p>
          </div>
        )}
        {torte.preis && !torte.normalpreis && (
          <p className="text-gold font-sans font-bold text-lg mb-4" data-cms={cms('preis')}>€ {fmtPreis(torte.preis)}</p>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onAllergene(torte)}
            className="text-braun-500 hover:text-gold font-sans text-xs flex items-center gap-1.5 transition-colors shrink-0 underline-offset-2 hover:underline"
            aria-label={`Allergene für ${torte.name} anzeigen`}
          >
            <FaInfoCircle size={12} /> Allergene
          </button>
          <button
            onClick={() => onBestellen(torte)}
            className="btn-gold flex-1 text-center text-sm flex items-center justify-center gap-2"
          >
            <FaShoppingBag size={14} /> Bestellen
          </button>
        </div>
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

  const bestellText = `Tortenbestellung:%0A%0ATorte: ${torte.name}%0AAbholung: ${standort === 'schlosscafe' ? 'Schloss-Café Bleiburg' : 'Cafe Reinhart Eberndorf'}%0ADatum: ${datum}%0AName: ${name}%0ATelefon: ${telefon}`

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
              <option value="reinhardt">Cafe Reinhart Eberndorf</option>
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
            href={`https://wa.me/436645336243?text=${bestellText}`}
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
  usePageTitle('Torten online bestellen – hausgemachte Konditorei-Torten')
  const [selected, setSelected] = useState(null)
  const [allergenTorte, setAllergenTorte] = useState(null)
  const content = useContent()
  // Texte/Preise aus dem CMS, Bild/Allergene/Kategorie bleiben hardcoded (data/torten.js).
  const aktionstorteAnzeige = {
    ...aktionstorte,
    name: content.aktionstorte.name,
    beschreibung: content.aktionstorte.beschreibung,
    monat: content.aktionstorte.monat,
    preis: content.aktionstorte.preis,
    normalpreis: content.aktionstorte.normalpreis,
  }

  return (
    <div className="pt-20">
      <section className="py-16 sm:py-24 bg-creme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3" data-cms="tortenshop.eyebrow">{content.tortenshop.eyebrow}</p>
            <h1 className="text-3xl sm:text-5xl font-display text-braun-800 mb-3 sm:mb-4" data-cms="tortenshop.heading">{content.tortenshop.heading}</h1>
            <Rich as="p" className="text-braun-500 max-w-2xl mx-auto" data-cms="tortenshop.intro" text={content.tortenshop.intro} />
          </div>

          {content.aktionstorte.aktiv && (
            <div className="mb-16" data-cms-section="aktionstorte">
              <h2 className="text-2xl font-display text-braun-800 mb-6 flex items-center gap-3">
                <FaStar className="text-gold" size={20} />
                Torte des Monats
                <span className="text-braun-400 font-sans text-sm font-normal" data-cms="aktionstorte.monat">— {aktionstorteAnzeige.monat}</span>
              </h2>
              <div className="max-w-sm">
                <TortenKarte torte={aktionstorteAnzeige} onBestellen={setSelected} onAllergene={setAllergenTorte} cmsPrefix="aktionstorte" />
              </div>
            </div>
          )}

          <h2 className="text-2xl font-display text-braun-800 mb-8">Unsere Klassiker</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {torten.map(t => (
              <TortenKarte key={t.id} torte={t} onBestellen={setSelected} onAllergene={setAllergenTorte} />
            ))}
          </div>

          <p className="mt-8 text-center text-braun-500 text-xs max-w-2xl mx-auto" data-cms-section="allergene">
            <FaInfoCircle className="inline mb-0.5 mr-1" size={11} />
            Allergeninformation gem. EU-Verordnung 1169/2011 — auf jeder Torte verfügbar.
            Angaben ohne Gewähr; bei Unverträglichkeiten bitte vor Bestellung im Café nachfragen.
          </p>

          {/* Anlasstorten — individuell nach Wunsch */}
          <div id="anlasstorten" className="mt-16 sm:mt-24 scroll-mt-24" data-cms-section="anlasstorten">
            <div className="text-center mb-10 sm:mb-14">
              <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3" data-cms="anlasstorten.eyebrow">{content.anlasstorten.eyebrow}</p>
              <h2 className="text-3xl sm:text-4xl font-display text-braun-800 mb-3 sm:mb-4" data-cms="anlasstorten.heading">{content.anlasstorten.heading}</h2>
              <Rich as="p" className="text-braun-500 max-w-2xl mx-auto" data-cms="anlasstorten.intro" text={content.anlasstorten.intro} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {anlaesse.map(({ icon: Icon, titel, text }) => (
                <div key={titel} className="bg-white rounded-2xl p-6 sm:p-7 shadow-md">
                  <Icon className="text-gold text-2xl sm:text-3xl mb-3" />
                  <h3 className="text-lg sm:text-xl font-display text-braun-800 mb-1.5">{titel}</h3>
                  <p className="text-braun-500 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 sm:mt-12 bg-braun-100 rounded-2xl p-6 sm:p-10 text-center">
              <FaPalette className="mx-auto text-gold text-3xl sm:text-4xl mb-3 sm:mb-4" />
              <h3 className="text-2xl sm:text-3xl font-display text-braun-800 mb-2 sm:mb-3" data-cms="anlasstorten.cta_heading">{content.anlasstorten.cta_heading}</h3>
              <Rich as="p" className="text-braun-600 max-w-xl mx-auto mb-2" data-cms="anlasstorten.cta_text" text={content.anlasstorten.cta_text} />
              <p className="text-braun-400 text-xs max-w-xl mx-auto mb-6">
                <FaTruck className="inline mb-0.5 mr-1" size={11} />
                <span data-cms="anlasstorten.lieferung_text">{content.anlasstorten.lieferung_text}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/436645336243?text=Hallo,%20ich%20möchte%20gerne%20eine%20Anlasstorte%20anfragen%20(Anlass,%20Termin,%20Personenzahl,%20Wunsch)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold flex items-center justify-center gap-2"
                >
                  <FaWhatsapp size={18} /> Per WhatsApp anfragen
                </a>
                <a
                  href="mailto:oliver.burkhardt@gmx.at?subject=Anfrage Anlasstorte"
                  className="btn-braun flex items-center justify-center gap-2"
                >
                  <FaEnvelope size={16} /> Per E-Mail anfragen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selected && <BestellModal torte={selected} onClose={() => setSelected(null)} />}
      {allergenTorte && <AllergenModal torte={allergenTorte} onClose={() => setAllergenTorte(null)} />}
    </div>
  )
}
