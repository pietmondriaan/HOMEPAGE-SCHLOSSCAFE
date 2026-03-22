import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { standorte } from '../data/standorte'

export default function Footer() {
  return (
    <footer className="bg-braun-900 text-braun-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          <div className="col-span-2 md:col-span-1">
            <img src="./images/logos/schlosscafe-logo.png" alt="Café mit Herz" className="h-12 sm:h-16 mb-3 sm:mb-4" />
            <p className="text-sm leading-relaxed">
              Gastfreundschaft mit ganz viel Herz! Genießen Sie täglich frische, hausgemachte Mehlspeisen, Torten und Eisspezialitäten.
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a href="https://www.facebook.com/search/top?q=schloss%20quadrat" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-braun-700 flex items-center justify-center hover:bg-gold transition-colors">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-braun-700 flex items-center justify-center hover:bg-gold transition-colors">
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-creme text-base sm:text-lg mb-3 sm:mb-4">Schloss-Café Bleiburg</h4>
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2"><FaMapMarkerAlt className="mt-1 shrink-0" /> {standorte.schlosscafe.adresse}</p>
              <p className="flex items-center gap-2"><FaPhone /> {standorte.schlosscafe.telefon}</p>
              <p className="flex items-center gap-2"><FaEnvelope /> {standorte.schlosscafe.email}</p>
              <p className="mt-2">{standorte.schlosscafe.oeffnungszeiten}</p>
            </div>
          </div>

          <div>
            <h4 className="text-creme text-base sm:text-lg mb-3 sm:mb-4">Cafe Reinhardt Eberndorf</h4>
            <div className="space-y-2 text-sm">
              <p className="flex items-start gap-2"><FaMapMarkerAlt className="mt-1 shrink-0" /> {standorte.reinhardt.adresse}</p>
              <p className="flex items-center gap-2"><FaPhone /> {standorte.reinhardt.telefon}</p>
              <p className="flex items-center gap-2"><FaEnvelope /> {standorte.reinhardt.email}</p>
              <p className="mt-2">{standorte.reinhardt.oeffnungszeiten}</p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-creme text-base sm:text-lg mb-3 sm:mb-4">Links</h4>
            <div className="space-y-1 text-sm">
              <Link to="/torten" className="block py-1.5 hover:text-gold active:text-gold transition-colors">Tortenshop</Link>
              <Link to="/kontakt" className="block py-1.5 hover:text-gold active:text-gold transition-colors">Reservierung</Link>
              <Link to="/impressum" className="block py-1.5 hover:text-gold active:text-gold transition-colors">Impressum</Link>
              <Link to="/datenschutz" className="block py-1.5 hover:text-gold active:text-gold transition-colors">Datenschutz</Link>
              <Link to="/agb" className="block py-1.5 hover:text-gold active:text-gold transition-colors">AGB</Link>
              <Link to="/widerruf" className="block py-1.5 hover:text-gold active:text-gold transition-colors">Widerrufsrecht</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-braun-700 mt-12 pt-8 text-center text-xs text-braun-500">
          <p>&copy; {new Date().getFullYear()} Café mit Herz – Schloss-Café & Cafe Reinhardt. Alle Rechte vorbehalten.</p>
          <p className="mt-1">Websitegestaltung: Pietrowski vis a vision</p>
        </div>
      </div>
    </footer>
  )
}
