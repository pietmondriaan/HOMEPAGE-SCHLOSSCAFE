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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
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
        </Routes>
      </main>
      <Footer />
    </>
  )
}
