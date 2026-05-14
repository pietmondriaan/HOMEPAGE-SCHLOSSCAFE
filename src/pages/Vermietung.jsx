import { usePageTitle } from '../hooks/usePageTitle'
import { FaWhatsapp, FaEnvelope, FaCheck, FaTimes, FaStar, FaSnowflake, FaTruck } from 'react-icons/fa'

function PreisGlossy({ preis, einheit, klein }) {
  return (
    <div className="inline-flex flex-col items-center bg-gradient-to-br from-gold via-gold-light to-gold text-braun-900 rounded-2xl px-6 py-4 shadow-[0_8px_32px_rgba(201,168,108,0.45)] border border-gold-light/40">
      {klein && <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold mb-1 opacity-70">{klein}</span>}
      <span className="font-display text-4xl font-bold leading-none">€ {preis}</span>
      <span className="font-sans text-xs mt-1 opacity-80">{einheit}</span>
    </div>
  )
}

function Inklusive({ items, exkl }) {
  return (
    <div className="space-y-2">
      {items.map(item => (
        <div key={item} className="flex items-start gap-2.5 text-braun-200">
          <FaCheck className="text-gold shrink-0 mt-0.5" size={12} />
          <span className="font-sans text-sm">{item}</span>
        </div>
      ))}
      {exkl?.map(item => (
        <div key={item} className="flex items-start gap-2.5 text-braun-400">
          <FaTimes className="text-braun-500 shrink-0 mt-0.5" size={12} />
          <span className="font-sans text-sm italic">{item}</span>
        </div>
      ))}
    </div>
  )
}

export default function Vermietung() {
  usePageTitle('Eismaschine & Kühlwagen mieten – Events & Veranstaltungen')

  const waMsg = encodeURIComponent('Hallo, ich interessiere mich für die Vermietung der Eismaschine / des Kühlwagens für eine Veranstaltung.')
  const waUrl = `https://wa.me/436645336243?text=${waMsg}`

  return (
    <div className="pt-16 sm:pt-20">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-braun-900">
        {/* Foto-Hintergrund gedimmt */}
        <div className="absolute inset-0">
          <img
            src="./images/vermietung/eismaschine-micha.jpg"
            alt="Micha am Eis-Stand"
            className="w-full h-full object-cover object-top opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-braun-900/60 via-braun-900/50 to-braun-900" />
        </div>

        {/* Sterne-Punkte (CSS) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gold/30"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                top: `${(i * 37 + 11) % 100}%`,
                left: `${(i * 53 + 7) % 100}%`,
                opacity: 0.3 + (i % 4) * 0.15,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold/60" />
            <span className="font-sans text-gold text-xs tracking-[0.25em] uppercase">Café mit Herz · Events</span>
            <div className="h-px w-10 bg-gold/60" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-display text-creme mb-4 leading-tight">
            Eisspaß für Ihre<br />
            <span className="text-gold italic">Veranstaltung</span>
          </h1>
          <p className="text-braun-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Soft-Eis direkt bei Ihrem Event — mit oder ohne unserem Eisverkäufer Micha.
            Und für die Kühlung: unser Kühlwagen steht bereit.
          </p>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────── */}
      <section className="bg-braun-900 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Eismaschine mit Micha — HERO-CARD */}
          <div className="relative rounded-3xl overflow-hidden mb-8 sm:mb-12 border border-gold/20 shadow-[0_0_60px_rgba(201,168,108,0.12)]">

            {/* Goldener Glow oben */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Foto */}
              <div className="relative h-72 sm:h-96 lg:h-auto lg:min-h-[500px] overflow-hidden">
                <img
                  src="./images/vermietung/eismaschine-micha.jpg"
                  alt="Eisverkäufer Micha mit Soft-Eis-Maschine"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-braun-900/60 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-braun-900/80 to-transparent lg:hidden" />

                {/* Persönlichkeits-Badge */}
                <div className="absolute top-4 left-4 bg-braun-900/80 backdrop-blur-sm border border-gold/30 rounded-xl px-4 py-2">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-gold" size={12} />
                    <span className="font-sans text-gold text-xs font-bold tracking-wide uppercase">Mit Micha</span>
                  </div>
                  <p className="font-sans text-creme/80 text-[11px] mt-0.5">Ihr exklusiver Eisverkäufer</p>
                </div>
              </div>

              {/* Content */}
              <div className="bg-braun-800/60 backdrop-blur-sm p-7 sm:p-10 lg:p-12 flex flex-col justify-center">

                <div className="flex items-center gap-2 mb-4">
                  <FaSnowflake className="text-gold" size={14} />
                  <span className="font-sans text-gold text-xs tracking-[0.2em] uppercase font-semibold">Vollservice-Paket</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-display text-creme mb-2 leading-tight">
                  Eismaschine<br /><span className="text-gold">+ Micha</span>
                </h2>
                <p className="text-braun-300 text-sm mb-7 leading-relaxed">
                  Sie bekommen alles aus einer Hand: die Soft-Eis-Maschine, das Material
                  und Micha — Ihren charmanten Eisverkäufer, der Ihre Gäste begeistert.
                </p>

                {/* Preis */}
                <div className="mb-8">
                  <PreisGlossy preis="500" einheit="pro Tag · inkl. MwSt." klein="Online-Preis" />
                </div>

                {/* Inkl./Exkl. */}
                <div className="mb-8 space-y-1.5">
                  <p className="font-sans text-xs text-braun-400 uppercase tracking-widest mb-3">Im Preis enthalten</p>
                  <Inklusive
                    items={[
                      'Soft-Eis-Maschine inkl. Aufbau & Abbau',
                      'Sämtliches Material (Eis, Becher, Toppings)',
                      'Eisverkäufer Micha für den ganzen Tag',
                      'An- & Abfahrt im Umkreis (auf Anfrage)',
                    ]}
                    exkl={[
                      'Trinkgeld für den exklusiven Eisverkäufer',
                    ]}
                  />
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold flex items-center justify-center gap-2 text-sm"
                  >
                    <FaWhatsapp size={16} /> Jetzt anfragen
                  </a>
                  <a
                    href="mailto:oliver.burkhardt@gmx.at?subject=Anfrage Eismaschine + Micha"
                    className="btn-braun flex items-center justify-center gap-2 text-sm !border-braun-600"
                  >
                    <FaEnvelope size={14} /> Per E-Mail
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Untere Cards: Eismaschine solo + Kühlwagen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">

            {/* Eismaschine ohne Micha */}
            <div className="rounded-2xl border border-braun-700 bg-braun-800/40 p-7 sm:p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <FaSnowflake className="text-gold/70" size={13} />
                <span className="font-sans text-gold/80 text-xs tracking-[0.18em] uppercase font-semibold">Nur Maschine</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display text-creme mb-3">Eismaschine<br /><span className="text-braun-400 text-xl">ohne Verkäufer</span></h3>
              <p className="text-braun-400 text-sm leading-relaxed mb-6 flex-1">
                Sie betreiben die Maschine selbst — perfekt wenn Sie eigenes Personal haben.
                Inkl. Aufbau, Abbau und Material-Lieferung.
              </p>
              <div className="mb-6">
                <span className="font-sans text-gold text-lg font-bold">Preis auf Anfrage</span>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-braun flex items-center justify-center gap-2 text-sm !border-braun-600 w-full"
              >
                <FaWhatsapp size={15} /> Anfragen
              </a>
            </div>

            {/* Kühlwagen */}
            <div className="rounded-2xl border border-braun-700 bg-braun-800/40 p-7 sm:p-8 flex flex-col relative overflow-hidden">
              {/* Platzhalter-Badge */}
              <div className="absolute top-4 right-4 bg-braun-700 text-braun-400 font-sans text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-braun-600">
                Foto folgt
              </div>

              <div className="flex items-center gap-2 mb-4">
                <FaTruck className="text-gold/70" size={14} />
                <span className="font-sans text-gold/80 text-xs tracking-[0.18em] uppercase font-semibold">Kühllogistik</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display text-creme mb-3">Kühlwagen<br /><span className="text-braun-400 text-xl">zur Miete</span></h3>

              {/* Platzhalter Foto-Box */}
              <div className="w-full h-32 rounded-xl bg-braun-700/50 border border-braun-600 border-dashed flex items-center justify-center mb-5">
                <div className="text-center">
                  <FaTruck className="text-braun-500 mx-auto mb-1.5" size={24} />
                  <span className="font-sans text-braun-500 text-xs">Foto kommt in Kürze</span>
                </div>
              </div>

              <p className="text-braun-400 text-sm leading-relaxed mb-6 flex-1">
                Gekühlter Transport und Lagerung für Ihre Veranstaltung.
                Ideal für Feste, Hochzeiten und größere Events. Preis auf Anfrage.
              </p>
              <div className="mb-6">
                <span className="font-sans text-gold text-lg font-bold">Preis auf Anfrage</span>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-braun flex items-center justify-center gap-2 text-sm !border-braun-600 w-full"
              >
                <FaWhatsapp size={15} /> Anfragen
              </a>
            </div>
          </div>

          {/* Fußzeile Hinweis */}
          <p className="text-center text-braun-500 font-sans text-xs mt-10">
            Alle Preise inkl. MwSt. · Verfügbarkeit abhängig vom Termin · Anfragen telefonisch oder per WhatsApp
          </p>
        </div>
      </section>

    </div>
  )
}
