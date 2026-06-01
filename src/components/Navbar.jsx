import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes, FaFacebookF, FaInstagram, FaChevronDown, FaPhone } from 'react-icons/fa'

const cafesMenu = [
  {
    to: '/schlosscafe',
    label: 'Schloss-Café',
    sub: 'Bleiburg · 10. Oktober Platz',
  },
  {
    to: '/reinhardt',
    label: 'Cafe Reinhart',
    sub: 'Eberndorf · am Klopeinersee',
  },
  {
    to: '/karten',
    label: 'Speisekarten',
    sub: 'Getränke & Eisspezialitäten',
  },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const closeTimer = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const cafesActive = ['/schlosscafe', '/reinhardt', '/karten'].includes(location.pathname)

  const [a11y, setA11y] = useState(() => {
    if (typeof document === 'undefined') return false
    return document.documentElement.hasAttribute('data-accessible')
  })
  useEffect(() => {
    const html = document.documentElement
    if (a11y) html.setAttribute('data-accessible', '')
    else html.removeAttribute('data-accessible')
    try { localStorage.setItem('a11y', a11y ? '1' : '0') } catch {}
  }, [a11y])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setMobileAccordion(false)
  }, [location.pathname])

  // Lock scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleDropdownEnter = () => {
    clearTimeout(closeTimer.current)
    setDropdownOpen(true)
  }

  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 150)
  }

  const scrollToEvents = () => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else {
      document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
    <nav className="fixed top-0 w-full z-50 bg-braun-800/95 backdrop-blur-md shadow-lg" aria-label="Hauptnavigation">
      {/* A11y utility bar */}
      <div className="bg-braun-900 border-b border-braun-800 px-4 sm:px-6 lg:px-8 flex justify-end items-center h-7">
        <button
          type="button"
          onClick={() => setA11y(v => !v)}
          aria-pressed={a11y}
          aria-label={a11y ? 'Barrierefreie Ansicht deaktivieren' : 'Barrierefreie Ansicht aktivieren'}
          className="a11y-bar-btn"
        >
          ♿ Barrierefreie Ansicht
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logos: Schloss-Café + Café Reinhart */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group" aria-label="Café mit Herz – Startseite">
            <img src="./images/logos/schlosscafe-logo.png" alt="Schloss-Café" className="h-9 sm:h-12 w-auto" />
            <span className="text-braun-600 font-sans text-sm hidden sm:block" aria-hidden="true">·</span>
            <img src="./images/logos/cafe-reinhart-logo.png" alt="Café Reinhart" className="h-8 sm:h-11 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">

            {/* Unsere Cafés — Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => setDropdownOpen(o => !o)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                aria-controls="cafes-dropdown"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md font-sans text-sm tracking-wide transition-colors ${
                  cafesActive || dropdownOpen
                    ? 'text-gold font-semibold'
                    : 'text-braun-200 hover:text-gold-light'
                }`}
              >
                Unsere Cafés
                <FaChevronDown
                  size={10}
                  className={`transition-transform duration-200 opacity-60 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown panel */}
              <div
                id="cafes-dropdown"
                role="menu"
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 transition-all duration-200 origin-top ${
                  dropdownOpen
                    ? 'opacity-100 scale-y-100 pointer-events-auto'
                    : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
              >
                {/* Arrow */}
                <div className="flex justify-center -mb-px">
                  <div className="w-3 h-3 bg-braun-700 border-t border-l border-braun-600 rotate-45" />
                </div>
                <div className="bg-braun-700 rounded-xl border border-braun-600 shadow-2xl overflow-hidden">
                  {cafesMenu.map((item, i) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      role="menuitem"
                      aria-current={isActive(item.to) ? 'page' : undefined}
                      onClick={() => setDropdownOpen(false)}
                      className={`flex flex-col px-5 py-3.5 transition-colors group ${
                        i < cafesMenu.length - 1 ? 'border-b border-braun-600' : ''
                      } ${
                        isActive(item.to)
                          ? 'bg-braun-600/60'
                          : 'hover:bg-braun-600/40'
                      }`}
                    >
                      <span className={`font-sans text-sm font-medium transition-colors ${
                        isActive(item.to) ? 'text-gold' : 'text-creme group-hover:text-gold-light'
                      }`}>
                        {item.label}
                      </span>
                      <span className="font-sans text-xs text-braun-400 mt-0.5">{item.sub}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Flat nav items */}
            {[
              { to: '/torten', label: 'Tortenshop' },
              { to: '/anlasstorten', label: 'Anlasstorten' },
              { to: '/vermietung', label: 'Vermietung' },
            ].map(l => (
              <Link
                key={l.to}
                to={l.to}
                aria-current={isActive(l.to) ? 'page' : undefined}
                className={`px-3 py-2 rounded-md font-sans text-sm tracking-wide transition-colors ${
                  isActive(l.to)
                    ? 'text-gold font-semibold'
                    : 'text-braun-200 hover:text-gold-light'
                }`}
              >
                {l.label}
              </Link>
            ))}

            <button
              onClick={scrollToEvents}
              className="px-3 py-2 rounded-md font-sans text-sm tracking-wide text-braun-200 hover:text-gold-light transition-colors cursor-pointer"
            >
              Events
            </button>

            <Link
              to="/kontakt"
              aria-current={isActive('/kontakt') ? 'page' : undefined}
              className={`px-3 py-2 rounded-md font-sans text-sm tracking-wide transition-colors ${
                isActive('/kontakt') ? 'text-gold font-semibold' : 'text-braun-200 hover:text-gold-light'
              }`}
            >
              Kontakt
            </Link>

            {/* Divider + Social */}
            <div className="flex items-center gap-2 ml-1 pl-3 border-l border-braun-600">
              <a
                href="https://www.facebook.com/search/top?q=schloss%20quadrat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full flex items-center justify-center text-braun-400 hover:text-gold hover:bg-braun-700 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={13} />
              </a>
              <a
                href="#"
                className="w-7 h-7 rounded-full flex items-center justify-center text-braun-400 hover:text-gold hover:bg-braun-700 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={13} />
              </a>
            </div>

            {/* CTA */}
            <Link to="/torten" className="btn-gold text-sm !py-2 !px-5 ml-1 shrink-0">
              Torte bestellen
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden text-creme p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

    </nav>

    {/* Mobile overlay — outside <nav> so backdrop-blur-md doesn't trap fixed positioning */}
    <div
      id="mobile-menu"
      className={`lg:hidden fixed inset-0 top-[92px] sm:top-[108px] z-40 bg-braun-800 transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      aria-hidden={!mobileOpen}
    >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">

            {/* Unsere Cafés accordion */}
            <div>
              <button
                onClick={() => setMobileAccordion(o => !o)}
                className="w-full flex items-center justify-between px-6 py-4 font-sans text-base text-braun-200 active:bg-braun-700"
              >
                <span className={cafesActive ? 'text-gold font-semibold' : ''}>Unsere Cafés</span>
                <FaChevronDown
                  size={12}
                  className={`text-braun-400 transition-transform duration-200 ${mobileAccordion ? 'rotate-180' : ''}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileAccordion ? 'max-h-64' : 'max-h-0'}`}>
                {cafesMenu.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex flex-col pl-10 pr-6 py-3 border-l-2 mx-6 mb-1 rounded-r-lg transition-colors ${
                      isActive(item.to)
                        ? 'border-gold bg-braun-700/50'
                        : 'border-braun-600 hover:border-gold-light hover:bg-braun-700/30'
                    }`}
                  >
                    <span className={`font-sans text-sm font-medium ${isActive(item.to) ? 'text-gold' : 'text-braun-200'}`}>
                      {item.label}
                    </span>
                    <span className="text-xs text-braun-500 mt-0.5">{item.sub}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Flat mobile links */}
            <Link to="/torten" className={`block px-6 py-4 font-sans text-base active:bg-braun-700 transition-colors ${isActive('/torten') ? 'text-gold bg-braun-700/50 font-semibold' : 'text-braun-200'}`}>
              Tortenshop
            </Link>
            <Link to="/anlasstorten" className={`block px-6 py-4 font-sans text-base active:bg-braun-700 transition-colors ${isActive('/anlasstorten') ? 'text-gold bg-braun-700/50 font-semibold' : 'text-braun-200'}`}>
              Anlasstorten
            </Link>
            <Link to="/vermietung" className={`block px-6 py-4 font-sans text-base active:bg-braun-700 transition-colors ${isActive('/vermietung') ? 'text-gold bg-braun-700/50 font-semibold' : 'text-braun-200'}`}>
              Vermietung
            </Link>
            <button onClick={scrollToEvents} className="block w-full text-left px-6 py-4 font-sans text-base text-braun-200 active:bg-braun-700 transition-colors">
              Events
            </button>
            <Link to="/kontakt" className={`block px-6 py-4 font-sans text-base active:bg-braun-700 transition-colors ${isActive('/kontakt') ? 'text-gold bg-braun-700/50 font-semibold' : 'text-braun-200'}`}>
              Kontakt
            </Link>
          </div>

          {/* Mobile footer */}
          <div className="p-6 border-t border-braun-700 space-y-3">
            <a
              href="tel:+4342352979"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-braun-700 border border-braun-600 text-creme font-sans text-sm font-medium active:bg-braun-600 transition-colors"
            >
              <FaPhone size={13} className="text-gold" />
              <span>04235 2979 anrufen</span>
            </a>
            <Link to="/torten" className="btn-gold text-base text-center block py-4">
              Torte bestellen
            </Link>
            <div className="flex justify-center gap-6">
              <a href="https://www.facebook.com/search/top?q=schloss%20quadrat" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-braun-700 flex items-center justify-center text-braun-300 active:bg-gold transition-colors" aria-label="Facebook">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-braun-700 flex items-center justify-center text-braun-300 active:bg-gold transition-colors" aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
