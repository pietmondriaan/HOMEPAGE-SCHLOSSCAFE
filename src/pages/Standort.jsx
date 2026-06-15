import { Link, useLocation } from 'react-router-dom'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaDirections, FaArrowRight, FaWhatsapp, FaStar, FaStreetView } from 'react-icons/fa'
import { standorte } from '../data/standorte'
import { usePageTitle } from '../hooks/usePageTitle'
import { useContent } from '../hooks/useContent'
import LazyVideo from '../components/LazyVideo'
import Rich from '../components/Rich'

export default function Standort() {
  const location = useLocation()
  const content = useContent()
  const id = location.pathname.replace('/', '')
  const key = id === 'schlosscafe' ? 'schlosscafe' : 'reinhardt'
  const s = standorte[key]
  const c = content.standorte[key]
  usePageTitle(id === 'schlosscafe' ? 'Schloss-Café Bleiburg – Torten, Kunst & Kaffeegenuss' : 'Cafe Reinhart Eberndorf – am Klopeinersee')

  if (!s) return <div className="pt-20 p-10 text-center">Standort nicht gefunden.</div>

  return (
    <div className="pt-20">
      <section className="relative h-[50vh] min-h-[400px]">
        {s.video ? (
          <LazyVideo
            src={`.${s.video}`}
            poster={`.${s.bild}`}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img src={`.${s.bild}`} alt={s.name} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-braun-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-16">
          <div className="max-w-7xl mx-auto">
            <img src={`.${s.logo}`} alt={`${s.name} Logo`} className="h-20 mb-4 drop-shadow-lg" />
            <h1 className="text-4xl sm:text-5xl font-display text-creme">{s.name}</h1>
            <p className="text-gold font-sans text-lg mt-2">{s.ort}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-creme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-display text-braun-800 mb-6" data-cms="standort_seite.ueber_uns_heading">{content.standort_seite.ueber_uns_heading}</h2>
              <p className="text-braun-600 leading-relaxed text-lg mb-8">{s.beschreibung}</p>
              <p className="text-braun-600 leading-relaxed">
                In unserem {s.name} in {s.ort} bieten wir Ihnen pure Gaumenfreude mit hausgemachten
                Süßspeisen und Eisspezialitäten. Aus hochwertigen, regionalen Zutaten — täglich frisch zubereitet.
                Ob Frühstück, Kaffee am Nachmittag oder ein Stück Torte zum Mitnehmen — wir freuen uns auf Ihren Besuch!
              </p>

              <div className="mt-12">
                <h3 className="text-2xl font-display text-braun-800 mb-6">Impressionen</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {(s.impressionen ?? [...Array(6)].map((_, i) =>
                    `/images/galerie/galerie-${String(i + (id === 'schlosscafe' ? 1 : 21)).padStart(2, '0')}.jpg`
                  )).map((src, i) => (
                    <div key={src} className="rounded-xl overflow-hidden h-40">
                      <img
                        src={`.${src}`}
                        alt={`${s.name} Impression ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-md" data-cms-section="standorte">
                <h3 className="text-xl font-display text-braun-800 mb-5">Kontakt & Info</h3>
                <div className="space-y-4 text-braun-600">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold font-sans text-sm">Adresse</p>
                      <p className="text-sm" data-cms={`standorte.${key}.adresse`}>{c.adresse}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaClock className="text-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold font-sans text-sm">Öffnungszeiten</p>
                      <p className="text-sm" data-cms={`standorte.${key}.oeffnungszeiten`}>{c.oeffnungszeiten}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaPhone className="text-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold font-sans text-sm">Telefon</p>
                      <a href={`tel:${c.telefon}`} className="text-sm hover:text-gold" data-cms={`standorte.${key}.telefon`}>{c.telefon}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="text-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold font-sans text-sm">E-Mail</p>
                      <a href={`mailto:${c.email}`} className="text-sm hover:text-gold" data-cms={`standorte.${key}.email`}>{c.email}</a>
                    </div>
                  </div>
                </div>
                <a
                  href={s.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-braun mt-6 w-full text-center flex items-center justify-center gap-2 text-sm"
                >
                  <FaDirections /> Route planen
                </a>
                {s.streetView && (
                  <a
                    href={s.streetView}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold mt-3 w-full text-center flex items-center justify-center gap-2 text-sm"
                  >
                    <FaStreetView /> 360°-Rundgang
                  </a>
                )}
              </div>

              <div className="bg-braun-700 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-display text-creme mb-3">Torte bestellen?</h3>
                <p className="text-braun-300 text-sm mb-5">Online bestellen, morgen abholen!</p>
                <Link to="/torten" className="btn-gold w-full text-center flex items-center justify-center gap-2 text-sm">
                  Zum Tortenshop <FaArrowRight />
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 text-center shadow-md">
                <div className="flex justify-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className="text-gold text-lg" />)}
                </div>
                <h3 className="text-xl font-display text-braun-800 mb-2">War es schön bei uns?</h3>
                <p className="text-braun-500 text-sm mb-5">Hinterlassen Sie uns eine Google-Bewertung — wir freuen uns!</p>
                <a
                  href={s.googleReview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-braun w-full text-center flex items-center justify-center gap-2 text-sm"
                >
                  <FaStar /> Jetzt bewerten
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-braun-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3" data-cms="standort_seite.fruehstueck_eyebrow">{content.standort_seite.fruehstueck_eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display text-creme mb-4">Frühstück im {s.name}</h2>
          <Rich as="p" className="text-braun-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed" data-cms="standort_seite.fruehstueck_text" text={content.standort_seite.fruehstueck_text} />
          <a
            href={`https://wa.me/${s.whatsapp}?text=Hallo!%20Ich%20m%C3%B6chte%20ein%20Fr%C3%BChst%C3%BCck%20im%20${encodeURIComponent(s.name)}%20vorbestellen.%20Datum%2FUhrzeit%3A%20___%20Anzahl%20Personen%3A%20___`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 text-base px-8 py-4"
          >
            <FaWhatsapp size={20} /> Frühstück vorbestellen
          </a>
        </div>
      </section>
    </div>
  )
}
