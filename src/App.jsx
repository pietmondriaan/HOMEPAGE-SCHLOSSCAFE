import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Standort from './pages/Standort'
import Tortenshop from './pages/Tortenshop'
import Kontakt from './pages/Kontakt'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import AGB from './pages/AGB'
import Widerruf from './pages/Widerruf'
import Karten from './pages/Karten'
import Vermietung from './pages/Vermietung'
import Stats from './pages/Stats'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  // Anonyme Besuchszählung: einmal pro Seitenaufruf pingen (nicht auf der Statistik-Seite selbst).
  useEffect(() => {
    if (window.location.hash.includes('/stats')) return
    fetch('/api/track').catch(() => {})
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-to-content">Zum Hauptinhalt springen</a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="pt-7">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schlosscafe" element={<Standort />} />
          <Route path="/reinhardt" element={<Standort />} />
          <Route path="/torten" element={<Tortenshop />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<AGB />} />
          <Route path="/widerruf" element={<Widerruf />} />
          <Route path="/karten" element={<Karten />} />
          <Route path="/vermietung" element={<Vermietung />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
