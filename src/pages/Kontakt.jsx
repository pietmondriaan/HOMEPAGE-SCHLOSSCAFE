import { useState } from 'react'
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { standorte } from '../data/standorte'

export default function Kontakt() {
  const [form, setForm] = useState({ name: '', email: '', telefon: '', personen: '', datum: '', standort: 'schlosscafe', nachricht: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const whatsappText = `Reservierung:%0A%0AName: ${form.name}%0APersonen: ${form.personen}%0ADatum: ${form.datum}%0AStandort: ${form.standort === 'schlosscafe' ? 'Schloss-Café Bleiburg' : 'Cafe Reinhardt Eberndorf'}%0ANachricht: ${form.nachricht}`

  return (
    <div className="pt-20">
      <section className="py-16 sm:py-24 bg-creme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3">Wir freuen uns auf Sie</p>
            <h1 className="text-3xl sm:text-5xl font-display text-braun-800 mb-3 sm:mb-4">Kontakt & Reservierung</h1>
            <p className="text-braun-500 max-w-2xl mx-auto">
              Für größere Runden empfehlen wir eine Reservierung. Kontaktieren Sie uns direkt per WhatsApp, Telefon oder E-Mail.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-md">
                <h2 className="text-2xl font-display text-braun-800 mb-6">Tischreservierung</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-sm text-braun-600 block mb-1">Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Ihr Name"
                      className="w-full border border-braun-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                  </div>
                  <div>
                    <label className="font-sans text-sm text-braun-600 block mb-1">E-Mail</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="ihre@email.at"
                      className="w-full border border-braun-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                  </div>
                  <div>
                    <label className="font-sans text-sm text-braun-600 block mb-1">Telefon</label>
                    <input name="telefon" type="tel" value={form.telefon} onChange={handleChange} placeholder="+43 ..."
                      className="w-full border border-braun-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                  </div>
                  <div>
                    <label className="font-sans text-sm text-braun-600 block mb-1">Personenanzahl *</label>
                    <input name="personen" type="number" min="1" value={form.personen} onChange={handleChange} placeholder="6"
                      className="w-full border border-braun-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                  </div>
                  <div>
                    <label className="font-sans text-sm text-braun-600 block mb-1">Datum *</label>
                    <input name="datum" type="date" value={form.datum} onChange={handleChange}
                      className="w-full border border-braun-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                  </div>
                  <div>
                    <label className="font-sans text-sm text-braun-600 block mb-1">Standort</label>
                    <select name="standort" value={form.standort} onChange={handleChange}
                      className="w-full border border-braun-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold">
                      <option value="schlosscafe">Schloss-Café Bleiburg</option>
                      <option value="reinhardt">Cafe Reinhardt Eberndorf</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="font-sans text-sm text-braun-600 block mb-1">Nachricht / Besondere Wünsche</label>
                  <textarea name="nachricht" rows="3" value={form.nachricht} onChange={handleChange}
                    placeholder="z.B. Kindersitze benötigt, Allergien, besonderer Anlass..."
                    className="w-full border border-braun-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/4342352979?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold flex-1 text-center flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp size={18} /> Per WhatsApp reservieren
                  </a>
                  <a
                    href={`mailto:oliver.burkhardt@gmx.at?subject=Tischreservierung&body=${whatsappText.replace(/%0A/g, '\n')}`}
                    className="btn-braun flex-1 text-center flex items-center justify-center gap-2"
                  >
                    <FaEnvelope size={16} /> Per E-Mail reservieren
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {Object.values(standorte).map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-md">
                  <img src={`.${s.logo}`} alt={s.name} className="h-12 mb-4" />
                  <div className="space-y-3 text-sm text-braun-600">
                    <p className="flex items-start gap-2"><FaMapMarkerAlt className="text-gold mt-0.5 shrink-0" /> {s.adresse}</p>
                    <p className="flex items-center gap-2"><FaPhone className="text-gold" /> <a href={`tel:${s.telefon}`} className="hover:text-gold">{s.telefon}</a></p>
                    <p className="flex items-center gap-2"><FaEnvelope className="text-gold" /> <a href={`mailto:${s.email}`} className="hover:text-gold">{s.email}</a></p>
                    <p className="font-semibold font-sans">{s.oeffnungszeiten}</p>
                  </div>
                  <a href={s.maps} target="_blank" rel="noopener noreferrer"
                    className="mt-4 block text-center text-gold font-sans text-sm font-semibold hover:underline">
                    Route planen →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
