import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Stats() {
  usePageTitle('Statistik')
  const [params] = useSearchParams()
  const key = params.get('key') || ''
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    setData(null)
    setError(false)
    if (!key) { setError(true); return }
    fetch(`/api/stats?key=${encodeURIComponent(key)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setError(true))
  }, [key])

  return (
    <div className="pt-20">
      <section className="py-24 bg-creme min-h-[60vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-braun">
          <h1 className="text-4xl font-display text-braun-800">Besucher-Statistik</h1>

          {error && (
            <p>Diese Seite ist nicht öffentlich. Sie ist nur mit gültigem Zugangsschlüssel abrufbar.</p>
          )}
          {!error && !data && <p>Zahlen werden geladen …</p>}

          {data && (
            <>
              <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <Stat label="Heute" value={data.heute} />
                <Stat label="Diese Woche" value={data.woche} />
                <Stat label="Gesamt" value={data.gesamt} />
              </div>
              <p className="mt-8 text-sm text-braun-600">
                Eindeutige Besucher — eine Person wird pro Tag einmal gezählt, anonym ermittelt,
                ohne Cookies und ohne Speicherung von IP-Adressen.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white shadow-md p-8 text-center border-t-4 border-gold">
      <div className="text-5xl font-display text-braun-800">
        {typeof value === 'number' ? value.toLocaleString('de-AT') : '–'}
      </div>
      <div className="mt-2 text-braun-600 uppercase tracking-wide text-sm">{label}</div>
    </div>
  )
}
