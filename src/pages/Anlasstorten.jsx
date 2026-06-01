import { FaWhatsapp, FaEnvelope, FaTruck, FaPalette, FaBirthdayCake, FaChurch, FaHeart, FaGift } from 'react-icons/fa'
import { usePageTitle } from '../hooks/usePageTitle'

// Anlasstorten = die Torten, nach denen in der KI-Suche gefragt wird (Tauf-, Kommunions-,
// Hochzeits-, Geburtstagstorten). Eigene Seite, damit ChatGPT/Gemini das Angebot zitieren können.
const anlaesse = [
  {
    icon: FaChurch,
    titel: 'Tauftorten',
    text: 'Liebevoll gestaltete Tauftorten – klassisch mit Schrift und Symbol oder individuell als Motivtorte. Für den schönsten Tag im Leben Ihres Kindes.',
  },
  {
    icon: FaChurch,
    titel: 'Kommunion- & Firmungstorten',
    text: 'Festtagstorten zur Erstkommunion und Firmung – abgestimmt auf Ihr Fest, in jeder gewünschten Größe für die ganze Familie.',
  },
  {
    icon: FaHeart,
    titel: 'Hochzeitstorten',
    text: 'Mehrstöckige Hochzeitstorten nach Ihren Vorstellungen – von klassisch-elegant bis modern mit Fondant. Auf Wunsch passend zu Ihrer Tischdeko.',
  },
  {
    icon: FaBirthdayCake,
    titel: 'Geburtstagstorten',
    text: 'Geburtstagstorten für Groß und Klein – mit Wunschmotiv, Lieblingsgeschmack und persönlicher Schrift. Auch als Kindertorte mit Lieblingsfigur.',
  },
  {
    icon: FaPalette,
    titel: 'Motivtorten',
    text: 'Individuelle Motivtorten zu jedem Thema – Sie nennen uns Anlass, Motiv und Personenzahl, unsere Konditormeister setzen es um.',
  },
  {
    icon: FaGift,
    titel: 'Anlass- & Festtagstorten',
    text: 'Jubiläum, Taufe, Verlobung, Firmenfeier oder einfach so: Für jeden Anlass fertigen wir Ihre individuelle Torte – frisch und nach Wunsch.',
  },
]

export default function Anlasstorten() {
  usePageTitle('Anlasstorten – Tauf-, Kommunions- & Hochzeitstorten in Kärnten')

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-creme">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-gold tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 sm:mb-3">Torten für besondere Anlässe</p>
          <h1 className="text-3xl sm:text-5xl font-display text-braun-800 mb-4 sm:mb-5">
            Tauf-, Kommunions- & Hochzeitstorten
          </h1>
          <p className="text-braun-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Vom Schloss-Café Bleiburg und dem Cafe Reinhart am Klopeinersee: individuelle
            Anlasstorten, von unseren Konditormeistern täglich frisch und nach Ihren
            Wünschen gefertigt — <strong className="text-braun-800">mit Lieferung in ganz Kärnten</strong>.
          </p>
        </div>
      </section>

      {/* Anlässe */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {anlaesse.map(({ icon: Icon, titel, text }) => (
              <div key={titel} className="card-hover bg-creme rounded-2xl p-6 sm:p-8 shadow-md">
                <Icon className="text-gold text-3xl mb-4" />
                <h2 className="text-xl sm:text-2xl font-display text-braun-800 mb-2">{titel}</h2>
                <p className="text-braun-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lieferung in ganz Kärnten */}
      <section className="py-14 sm:py-20 bg-braun-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaTruck className="mx-auto text-gold text-3xl sm:text-4xl mb-3 sm:mb-4" />
          <h2 className="text-2xl sm:text-3xl font-display text-braun-800 mb-3">Lieferung in ganz Kärnten</h2>
          <p className="text-braun-600 max-w-2xl mx-auto leading-relaxed">
            Ihre Anlasstorte liefern wir auf Wunsch in ganz Kärnten — von Klagenfurt über
            den Klopeinersee bis ins Jauntal und nach Völkermarkt. Abholung ist natürlich
            jederzeit im Schloss-Café Bleiburg (10. Oktober Platz 38) oder im Cafe Reinhart
            in Eberndorf möglich. Sprechen Sie uns einfach auf Liefertermin und Lieferort an.
          </p>
        </div>
      </section>

      {/* Bestellung / CTA */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-display text-braun-800 mb-3">So bestellen Sie Ihre Anlasstorte</h2>
          <p className="text-braun-600 max-w-2xl mx-auto mb-7 leading-relaxed">
            Nennen Sie uns Anlass, Wunschtermin, Personenzahl und Ihre Geschmacks- bzw.
            Motivwünsche — wir erstellen Ihnen gerne ein unverbindliches Angebot. Bitte
            beachten Sie für individuelle Torten einen Vorlauf von einigen Tagen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/436645336243?text=Hallo,%20ich%20möchte%20gerne%20eine%20Anlasstorte%20anfragen%20(Anlass,%20Termin,%20Personenzahl,%20Wunsch)."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={18} /> Per WhatsApp anfragen
            </a>
            <a
              href="mailto:oliver.burkhardt@gmx.at?subject=Anfrage Anlasstorte"
              className="btn-braun flex items-center justify-center gap-2"
            >
              <FaEnvelope size={16} /> Per E-Mail anfragen
            </a>
          </div>
        </div>
      </section>

      {/* FAQ — sichtbar + deckt die KI-Suchfragen ab */}
      <section className="py-14 sm:py-20 bg-creme">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-display text-braun-800 mb-8 text-center">Häufige Fragen zu Anlasstorten</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-lg text-braun-800 mb-1">Wer macht Tauftorten in Kärnten?</h3>
              <p className="text-braun-600 text-sm leading-relaxed">
                Das Schloss-Café Bleiburg und das Cafe Reinhart am Klopeinersee fertigen
                individuelle Tauftorten nach Wunsch — mit Lieferung in ganz Kärnten oder zur
                Abholung in Bleiburg und Eberndorf.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-braun-800 mb-1">Macht ihr auch Hochzeitstorten?</h3>
              <p className="text-braun-600 text-sm leading-relaxed">
                Ja. Wir fertigen mehrstöckige Hochzeitstorten nach Ihren Vorstellungen — klassisch
                oder modern mit Fondant, abgestimmt auf Ihr Fest. Wir liefern in ganz Kärnten.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-braun-800 mb-1">Liefert ihr die Torte auch?</h3>
              <p className="text-braun-600 text-sm leading-relaxed">
                Ja, Anlasstorten liefern wir auf Wunsch in ganz Kärnten. Abholung ist im
                Schloss-Café Bleiburg oder im Cafe Reinhart in Eberndorf jederzeit möglich.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-braun-800 mb-1">Wie lange im Voraus muss ich bestellen?</h3>
              <p className="text-braun-600 text-sm leading-relaxed">
                Für individuelle Anlasstorten empfehlen wir einige Tage Vorlauf. Fragen Sie am
                besten per WhatsApp (+43 664 5336243) oder E-Mail (oliver.burkhardt@gmx.at) an —
                wir bestätigen Ihnen den Termin.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
