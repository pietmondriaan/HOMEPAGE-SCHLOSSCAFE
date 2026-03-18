import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaFacebookF, FaInstagram } from 'react-icons/fa'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  const scrollToEvents = () => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else {
      document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const links = [
    { to: '/', label: 'Home' },
    { to: '/schlosscafe', label: 'Schloss-Café' },
    { to: '/reinhardt', label: 'Cafe Reinhardt' },
    { to: '/torten', label: 'Tortenshop' },
    { action: scrollToEvents, label: 'Events' },
    { to: '/kontakt', label: 'Kontakt' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 w-full z-50 bg-braun-800/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img src="./images/logos/schloss-quadrat-logo.png" alt="Café mit Herz" className="h-10 sm:h-14 w-auto" />
            <span className="text-creme font-display text-lg sm:text-xl hidden sm:block">Café mit Herz</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.map(l => l.action ? (
              <button
                key={l.label}
                onClick={l.action}
                className="font-sans text-sm tracking-wide transition-colors text-braun-200 hover:text-gold-light cursor-pointer"
              >
                {l.label}
              </button>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className={`font-sans text-sm tracking-wide transition-colors ${
                  isActive(l.to)
                    ? 'text-gold font-semibold'
                    : 'text-braun-200 hover:text-gold-light'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 ml-2">
              <a href="https://www.facebook.com/search/top?q=schloss%20quadrat" target="_blank" rel="noopener noreferrer" className="text-braun-300 hover:text-gold transition-colors">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="text-braun-300 hover:text-gold transition-colors">
                <FaInstagram size={16} />
              </a>
            </div>
            <Link to="/torten" className="btn-gold text-sm !py-2 !px-5">
              Torte bestellen
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-creme p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          >
            {open ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu - full screen overlay */}
      <div className={`lg:hidden fixed inset-0 top-16 sm:top-20 bg-braun-800 transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {links.map(l => l.action ? (
              <button
                key={l.label}
                onClick={l.action}
                className="block w-full text-left px-6 py-4 font-sans text-base text-braun-200 active:bg-braun-700 transition-colors"
              >
                {l.label}
              </button>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className={`block px-6 py-4 font-sans text-base active:bg-braun-700 transition-colors ${
                  isActive(l.to) ? 'text-gold bg-braun-700/50 font-semibold' : 'text-braun-200'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="p-6 border-t border-braun-700 space-y-4">
            <Link to="/torten" className="btn-gold text-base text-center block py-4">
              Torte bestellen
            </Link>
            <div className="flex justify-center gap-6">
              <a href="https://www.facebook.com/search/top?q=schloss%20quadrat" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-braun-700 flex items-center justify-center text-braun-300 active:bg-gold transition-colors">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-braun-700 flex items-center justify-center text-braun-300 active:bg-gold transition-colors">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
