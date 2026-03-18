import { Link, useLocation } from 'react-router-dom'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaDirections, FaArrowRight } from 'react-icons/fa'
import { standorte } from '../data/standorte'

export default function Standort() {
  const location = useLocation()
  const id = location.pathname.replace('/', '')
  const s = id === 'schlosscafe' ? standorte.schlosscafe : standorte.reinhardt

  if (!s) return <div className="pt-20 p-10 text-center">Standort nicht gefunden.</div>

  return (
    <div className="pt-20">
      <section className="relative h-[50vh] min-h-[400px]">
        <img src={`.${s.bild}`} alt={s.name} className="w-full h-full object-cover" />
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
              <h2 className="text-3xl font-display text-braun-800 mb-6">Über uns</h2>
              <p className="text-braun-600 leading-relaxed text-lg mb-8">{s.beschreibung}</p>
              <p className="text-braun-600 leading-relaxed">
                In unserem {s.name} in {s.ort} bieten wir Ihnen pure Gaumenfreude mit hausgemachten
                Süßspeisen und Eisspezialitäten. Aus hochwertigen, regionalen Zutaten — täglich frisch zubereitet.
                Ob Frühstück, Kaffee am Nachmittag oder ein Stück Torte zum Mitnehmen — wir freuen uns auf Ihren Besuch!
              </p>

              <div className="mt-12">
                <h3 className="text-2xl font-display text-braun-800 mb-6">Impressionen</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="rounded-xl overflow-hidden h-40">
                      <img
                        src={`./images/galerie/galerie-${String(i + (id === 'schlosscafe' ? 1 : 21)).padStart(2, '0')}.jpg`}
                        alt={`${s.name} Impression`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-xl font-display text-braun-800 mb-5">Kontakt & Info</h3>
                <div className="space-y-4 text-braun-600">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold font-sans text-sm">Adresse</p>
                      <p className="text-sm">{s.adresse}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaClock className="text-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold font-sans text-sm">Öffnungszeiten</p>
                      <p className="text-sm">{s.oeffnungszeiten}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaPhone className="text-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold font-sans text-sm">Telefon</p>
                      <a href={`tel:${s.telefon}`} className="text-sm hover:text-gold">{s.telefon}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="text-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold font-sans text-sm">E-Mail</p>
                      <a href={`mailto:${s.email}`} className="text-sm hover:text-gold">{s.email}</a>
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
              </div>

              <div className="bg-braun-700 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-display text-creme mb-3">Torte bestellen?</h3>
                <p className="text-braun-300 text-sm mb-5">Online bestellen, morgen abholen!</p>
                <Link to="/torten" className="btn-gold w-full text-center flex items-center justify-center gap-2 text-sm">
                  Zum Tortenshop <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
