// src/content-schema.js
// KANONISCHE QUELLE für Content-Struktur, Feld-Metadaten und Merge-Logik.
// Wird von src (React) UND functions (Workers) importiert — nie duplizieren.
//
// Scope "Standard": Öffnungszeiten, Kontaktdaten, Aktionstorte, Klassiker-
// Beschreibungen, Vermietungstexte, Anlasstorten-Liefertext, Footer.
// Allergene und Event-Daten bleiben bewusst hardcoded (rechtlich/fehlerkritisch).
// Preise sind Strings — keine Float-Formatierungsfallen.

export const DEFAULT_CONTENT = {
  meta: {
    business_name: 'Café mit Herz',
    tagline: 'Gastfreundschaft mit ganz viel Herz!',
  },
  // SYNC: Worker-Schema gastro — events + highlights spiegeln den KV-Datenkontrakt
  events: {
    aktiv: false,
    eyebrow: 'Was ist los?',
    heading: 'Veranstaltungen & Rückblick',
    items: [],
  },
  highlights: [],
  hero: {
    eyebrow: 'Willkommen bei',
    subtitle: 'Genießen Sie täglich frische, hausgemachte Mehlspeisen, Torten und Eisspezialitäten in unseren Cafés in Bleiburg und Eberndorf am Klopeinersee.',
    cta_primary: 'Torte bestellen',
    cta_secondary: 'Unsere Cafés entdecken',
  },
  sektionen: {
    standorte: {
      eyebrow: 'Zwei Cafés, ein Herz',
      heading: 'Unsere Standorte',
    },
    klassiker: {
      eyebrow: 'Café Reinhart & Schloss-Café',
      heading: 'Unsere Klassiker',
      intro: 'Täglich frisch in unseren Cafés — die Mehlspeisen, für die man immer wieder kommt.',
    },
    torten: {
      eyebrow: 'Schlemmen, Entspannen, Genießen',
      heading: 'Unsere Torten',
      intro: 'Aus hochwertigen, regionalen Zutaten – von unseren Konditormeistern täglich frisch zubereitet.',
    },
    events: {
      eyebrow: 'Was ist los?',
      heading: 'Veranstaltungen',
    },
    vermietung: {
      eyebrow: 'Events & Vermietung',
      heading_zeile1: 'Eis für Ihr Fest —',
      heading_zeile2: 'mit Micha dabei.',
      text: 'Soft-Eis-Maschine inkl. Eisverkäufer Micha für Ihren Event —',
      zusatz_text: 'Außerdem: Kühlwagen-Vermietung auf Anfrage.',
    },
  },
  kulturmoment: {
    aktiv: true,
    eyebrow: 'Besonderer Besuch',
    heading_zeile1: 'Gottfried',
    heading_zeile2: 'Helnwein',
    heading_zeile3: 'zu Gast',
    beschreibung: 'Der Weltkünstler und Ehrenbürger von Bleiburg besuchte anlässlich der Eröffnung der Ausstellung seiner Tochter Mercedes Helnwein im Werner Berg Museum das Schloss-Café — nur wenige Schritte vom Museum entfernt, am selben Platz.',
    box_heading: 'Drei Welten im Nahbereich',
    empfehlung_label: 'Unsere Empfehlung zur Ausstellung',
    empfehlung_name: 'Museumsbecher',
    empfehlung_text: 'Schokolade · Stracciatella · hausgemachte Himbeersauce',
    pietrowski_lead: 'Kunst direkt im Café:',
    pietrowski_text: '— Fadenbilder, Acryl & CrossArt — ist täglich im Schloss-Café zu sehen und käuflich zu erwerben.',
  },
  standorte: {
    schlosscafe: {
      oeffnungszeiten: 'Täglich 7:00 – 19:00 Uhr',
      telefon: '04235 2979',
      email: 'oliver.burkhardt@gmx.at',
      adresse: '10. Oktober Platz 38, 9150 Bleiburg',
    },
    reinhardt: {
      oeffnungszeiten: 'Täglich 7:00 – 19:00 Uhr',
      telefon: '04236 2140',
      email: 'oliver.burkhardt@gmx.at',
      adresse: 'Kreuzbergweg 1, 9141 Eberndorf',
    },
  },
  aktionstorte: {
    aktiv: true,
    name: 'Schoko-Sahne-Torte',
    monat: 'Mai 2026',
    beschreibung: 'Saftige Schokoladenschichten mit zarter Sahne — unser Highlight im Mai. Bei Online-Bestellung zum Aktionspreis.',
    preis: '52.00',
    normalpreis: '58.00',
  },
  klassiker: {
    erdbeertoertchen: 'Hausgemachte Roulade mit Marillen-Marmelade, gesüßtem Schlagobers, frischen Erdbeeren und säuerlicher Gelatine — ein Klassiker der Vitrine.',
    schaumrollen: 'Hauchdünner Blätterteig, gefüllt mit süßem Ei-Schnee nach Art des Hauses — hausgemacht wie eh und je.',
    fruehstueck: 'Üppige Etagère mit Käse, Aufschnitt, Eiern & Lachs — dazu Fruchtspiegel, Joghurt und frische Semmel. Nur auf Vorbestellung.',
    eiskreationen: 'Hausgemachte Eisbecher und Eisspezialitäten — täglich frisch, nach Saison und Laune.',
  },
  vermietung: {
    eismaschine_preis_text: '500',
    eismaschine_text: 'Sie bekommen alles aus einer Hand: die Soft-Eis-Maschine, das Material und Micha — Ihren charmanten Eisverkäufer, der Ihre Gäste begeistert.',
  },
  anlasstorten: {
    lieferung_text: 'Lieferung in ganz Kärnten — je nach Entfernung fällt eine kleine Liefergebühr an (ca. € 0,80/km), fragen Sie einfach nach. Abholung in Bleiburg/Eberndorf kostenlos.',
    eyebrow: 'Torten für besondere Anlässe',
    heading: 'Anlasstorten nach Wunsch',
    intro: 'Tauf-, Kommunions- & Hochzeitstorten und mehr — von unseren Konditormeistern individuell gefertigt, mit **Lieferung in ganz Kärnten**.',
    cta_heading: 'Ihre individuelle Torte',
    cta_text: 'Nennen Sie uns Anlass, Wunschtermin, Personenzahl und Ihre Geschmacks- bzw. Motivwünsche — wir erstellen Ihnen gerne ein unverbindliches Angebot.',
  },
  tortenshop: {
    eyebrow: 'Click & Buy',
    heading: 'Tortenshop',
    intro: 'Bestellen Sie Ihre Lieblingstorte online und holen Sie sie am nächsten Tag in einem unserer Cafés ab. Ganze Torten — frisch für Sie zubereitet.',
  },
  karten: {
    eyebrow: 'Unsere Angebote',
    heading: 'Speisekarten',
    intro: 'Getränke, Eis und mehr — hier finden Sie alle Karten unserer Cafés zum Durchblättern.',
  },
  standort_seite: {
    ueber_uns_heading: 'Über uns',
    fruehstueck_eyebrow: 'Täglich ab 7:00 Uhr',
    fruehstueck_text: 'Starten Sie Ihren Tag mit einem frischen Frühstück bei uns — hausgemacht, regional und mit viel Herz zubereitet. Einfach per WhatsApp vorbestellen!',
  },
  vermietung_seite: {
    hero_eyebrow: 'Café mit Herz · Events',
    hero_heading_zeile1: 'Eisspaß für Ihre',
    hero_heading_zeile2: 'Veranstaltung',
    hero_subtitle: 'Soft-Eis direkt bei Ihrem Event — mit oder ohne unserem Eisverkäufer Micha. Und für die Kühlung: unser Kühlwagen steht bereit.',
  },
  kontakt: {
    eyebrow: 'Wir freuen uns auf Sie',
    heading: 'Kontakt & Reservierung',
    intro: 'Für größere Runden empfehlen wir eine Reservierung. Kontaktieren Sie uns direkt per WhatsApp, Telefon oder E-Mail.',
  },
  gewinnspiel: {
    aktiv: true,
    plakat: '/wm-gewinnspiel/plakat.jpg',
  },
  footer: {
    copyright: 'Café mit Herz – Schloss-Café & Cafe Reinhart. Alle Rechte vorbehalten.',
    intro: 'Gastfreundschaft mit ganz viel Herz! Genießen Sie täglich frische, hausgemachte Mehlspeisen, Torten und Eisspezialitäten.',
  },
}

// ---------------------------------------------------------------------------
// Feld-Metadaten: EINZIGE Quelle für LLM-Whitelist, Validierung, Markierungs-
// Labels und Admin-UI. Numerische Pfadsegmente werden als '*' normalisiert.
// type: string | text | bool | email | tel
export const FIELD_META = {
  'meta.business_name': { label: 'Firmenname', type: 'string', max: 60 },
  'meta.tagline':       { label: 'Untertitel/Slogan', type: 'string', max: 120 },

  'hero.eyebrow':       { label: 'Startbereich — Eyebrow', type: 'string', max: 60 },
  'hero.subtitle':      { label: 'Startbereich — Beschreibung', type: 'text', max: 400 },
  'hero.cta_primary':   { label: 'Startbereich — Button 1', type: 'string', max: 40 },
  'hero.cta_secondary': { label: 'Startbereich — Button 2', type: 'string', max: 40 },

  'sektionen.standorte.eyebrow': { label: 'Sektion Standorte — Eyebrow', type: 'string', max: 60 },
  'sektionen.standorte.heading': { label: 'Sektion Standorte — Überschrift', type: 'string', max: 80 },

  'sektionen.klassiker.eyebrow': { label: 'Sektion Klassiker — Eyebrow', type: 'string', max: 60 },
  'sektionen.klassiker.heading': { label: 'Sektion Klassiker — Überschrift', type: 'string', max: 80 },
  'sektionen.klassiker.intro':   { label: 'Sektion Klassiker — Intro', type: 'text', max: 300 },

  'sektionen.torten.eyebrow': { label: 'Sektion Torten — Eyebrow', type: 'string', max: 60 },
  'sektionen.torten.heading': { label: 'Sektion Torten — Überschrift', type: 'string', max: 80 },
  'sektionen.torten.intro':   { label: 'Sektion Torten — Intro', type: 'text', max: 300 },

  'sektionen.events.eyebrow': { label: 'Sektion Veranstaltungen — Eyebrow (legacy)', type: 'string', max: 60 },
  'sektionen.events.heading': { label: 'Sektion Veranstaltungen — Überschrift (legacy)', type: 'string', max: 80 },

  // SYNC: Worker-Schema gastro — events CMS-Block
  'events.aktiv':                 { label: 'Veranstaltungen — sichtbar', type: 'bool' },
  'events.eyebrow':               { label: 'Veranstaltungen — Eyebrow', type: 'string', max: 60 },
  'events.heading':               { label: 'Veranstaltungen — Überschrift', type: 'string', max: 80 },
  'events.items.*.titel':         { label: 'Event — Titel', type: 'string', max: 80 },
  'events.items.*.text':          { label: 'Event — Beschreibung', type: 'text', max: 600 },
  'events.items.*.datum':         { label: 'Event — Datum/Zeit (Anzeigetext)', type: 'string', max: 40 },
  'events.items.*.bild':          { label: 'Event — Bild', type: 'image' },
  'events.items.*.bild2':         { label: 'Event — Bild 2 (optional)', type: 'image' },
  'events.items.*.bild3':         { label: 'Event — Bild 3 (optional)', type: 'image' },
  'events.items.*.bild4':         { label: 'Event — Bild 4 (optional)', type: 'image' },
  'events.items.*.ort':           { label: 'Event — Ort (optional)', type: 'string', max: 120 },
  'events.items.*.link':          { label: 'Event — Link (optional, https://, http:// oder /)', type: 'string', max: 200 },
  'events.items.*.istPlakat':     { label: 'Event — als Plakat anzeigen', type: 'bool' },

  // SYNC: Worker-Schema gastro — highlights CMS-Block
  'highlights.*.aktiv':     { label: 'Highlight — sichtbar', type: 'bool' },
  'highlights.*.eyebrow':   { label: 'Highlight — Eyebrow', type: 'string', max: 60 },
  'highlights.*.titel':     { label: 'Highlight — Titel', type: 'string', max: 80 },
  'highlights.*.text':      { label: 'Highlight — Text', type: 'text', max: 500 },
  'highlights.*.bild':      { label: 'Highlight — Bild', type: 'image' },
  'highlights.*.cta_label': { label: 'Highlight — Button-Text', type: 'string', max: 40 },

  // SYNC: Worker-Schema gastro
  'kulturmoment.aktiv': { label: 'Helnwein-Sektion — sichtbar', type: 'bool' },

  'sektionen.vermietung.eyebrow':        { label: 'Sektion Vermietung (Start) — Eyebrow', type: 'string', max: 60 },
  'sektionen.vermietung.heading_zeile1': { label: 'Sektion Vermietung (Start) — Überschrift Zeile 1', type: 'string', max: 60 },
  'sektionen.vermietung.heading_zeile2': { label: 'Sektion Vermietung (Start) — Überschrift Zeile 2', type: 'string', max: 60 },
  'sektionen.vermietung.text':           { label: 'Sektion Vermietung (Start) — Text', type: 'text', max: 300 },
  'sektionen.vermietung.zusatz_text':    { label: 'Sektion Vermietung (Start) — Zusatz', type: 'text', max: 200 },

  'kulturmoment.eyebrow':         { label: 'Helnwein — Eyebrow', type: 'string', max: 60 },
  'kulturmoment.heading_zeile1':  { label: 'Helnwein — Überschrift Zeile 1', type: 'string', max: 40 },
  'kulturmoment.heading_zeile2':  { label: 'Helnwein — Überschrift Zeile 2', type: 'string', max: 40 },
  'kulturmoment.heading_zeile3':  { label: 'Helnwein — Überschrift Zeile 3', type: 'string', max: 40 },
  'kulturmoment.beschreibung':    { label: 'Helnwein — Beschreibung', type: 'text', max: 500 },
  'kulturmoment.box_heading':     { label: 'Helnwein — Box-Überschrift', type: 'string', max: 80 },
  'kulturmoment.empfehlung_label':{ label: 'Helnwein — Empfehlung Label', type: 'string', max: 80 },
  'kulturmoment.empfehlung_name': { label: 'Helnwein — Empfehlung Name', type: 'string', max: 60 },
  'kulturmoment.empfehlung_text': { label: 'Helnwein — Empfehlung Text', type: 'text', max: 200 },
  'kulturmoment.pietrowski_lead': { label: 'Helnwein — Kunst-Hinweis Vorspann', type: 'string', max: 60 },
  'kulturmoment.pietrowski_text': { label: 'Helnwein — Kunst-Hinweis (nach dem Namen)', type: 'text', max: 300 },

  'standorte.schlosscafe.oeffnungszeiten': { label: 'Schloss-Café — Öffnungszeiten', type: 'string', max: 80 },
  'standorte.schlosscafe.telefon':         { label: 'Schloss-Café — Telefonnummer', type: 'tel', max: 40 },
  'standorte.schlosscafe.email':           { label: 'Schloss-Café — E-Mail-Adresse', type: 'email', max: 80 },
  'standorte.schlosscafe.adresse':         { label: 'Schloss-Café — Adresse', type: 'string', max: 120 },

  'standorte.reinhardt.oeffnungszeiten': { label: 'Cafe Reinhart — Öffnungszeiten', type: 'string', max: 80 },
  'standorte.reinhardt.telefon':         { label: 'Cafe Reinhart — Telefonnummer', type: 'tel', max: 40 },
  'standorte.reinhardt.email':           { label: 'Cafe Reinhart — E-Mail-Adresse', type: 'email', max: 80 },
  'standorte.reinhardt.adresse':         { label: 'Cafe Reinhart — Adresse', type: 'string', max: 120 },

  'aktionstorte.aktiv':        { label: 'Torte des Monats — sichtbar', type: 'bool' },
  'aktionstorte.name':         { label: 'Torte des Monats — Name', type: 'string', max: 60 },
  'aktionstorte.monat':        { label: 'Torte des Monats — Monat', type: 'string', max: 40 },
  'aktionstorte.beschreibung': { label: 'Torte des Monats — Beschreibung', type: 'text', max: 300 },
  'aktionstorte.preis':        { label: 'Torte des Monats — Aktionspreis (€)', type: 'string', max: 20 },
  'aktionstorte.normalpreis':  { label: 'Torte des Monats — Normalpreis (€)', type: 'string', max: 20 },

  'klassiker.erdbeertoertchen': { label: 'Klassiker — Erdbeertörtchen Beschreibung', type: 'text', max: 300 },
  'klassiker.schaumrollen':     { label: 'Klassiker — Schaumrollen Beschreibung', type: 'text', max: 300 },
  'klassiker.fruehstueck':      { label: 'Klassiker — Frühstück Beschreibung', type: 'text', max: 300 },
  'klassiker.eiskreationen':    { label: 'Klassiker — Eiskreationen Beschreibung', type: 'text', max: 300 },

  'vermietung.eismaschine_preis_text': { label: 'Vermietung — Eismaschine Preis (€, nur Zahl/Text)', type: 'string', max: 20 },
  'vermietung.eismaschine_text':       { label: 'Vermietung — Eismaschine Beschreibung', type: 'text', max: 400 },

  'anlasstorten.lieferung_text': { label: 'Anlasstorten — Liefer-Hinweis', type: 'text', max: 400 },
  'anlasstorten.eyebrow':        { label: 'Anlasstorten — Eyebrow', type: 'string', max: 60 },
  'anlasstorten.heading':        { label: 'Anlasstorten — Überschrift', type: 'string', max: 80 },
  'anlasstorten.intro':          { label: 'Anlasstorten — Intro', type: 'text', max: 300 },
  'anlasstorten.cta_heading':    { label: 'Anlasstorten — CTA Überschrift', type: 'string', max: 80 },
  'anlasstorten.cta_text':       { label: 'Anlasstorten — CTA Text', type: 'text', max: 400 },

  'tortenshop.eyebrow': { label: 'Tortenshop — Eyebrow', type: 'string', max: 60 },
  'tortenshop.heading': { label: 'Tortenshop — Überschrift', type: 'string', max: 80 },
  'tortenshop.intro':   { label: 'Tortenshop — Intro', type: 'text', max: 300 },

  'karten.eyebrow': { label: 'Speisekarten — Eyebrow', type: 'string', max: 60 },
  'karten.heading': { label: 'Speisekarten — Überschrift', type: 'string', max: 80 },
  'karten.intro':   { label: 'Speisekarten — Intro', type: 'text', max: 300 },

  'standort_seite.ueber_uns_heading':   { label: 'Standortseite — Überschrift „Über uns"', type: 'string', max: 80 },
  'standort_seite.fruehstueck_eyebrow': { label: 'Standortseite — Frühstück Eyebrow', type: 'string', max: 60 },
  'standort_seite.fruehstueck_text':    { label: 'Standortseite — Frühstück Text', type: 'text', max: 400 },

  'vermietung_seite.hero_eyebrow':        { label: 'Vermietung (Seite) — Hero Eyebrow', type: 'string', max: 60 },
  'vermietung_seite.hero_heading_zeile1': { label: 'Vermietung (Seite) — Hero Überschrift Zeile 1', type: 'string', max: 60 },
  'vermietung_seite.hero_heading_zeile2': { label: 'Vermietung (Seite) — Hero Überschrift Zeile 2', type: 'string', max: 60 },
  'vermietung_seite.hero_subtitle':       { label: 'Vermietung (Seite) — Hero Beschreibung', type: 'text', max: 400 },

  'kontakt.eyebrow': { label: 'Kontakt — Eyebrow', type: 'string', max: 60 },
  'kontakt.heading': { label: 'Kontakt — Überschrift', type: 'string', max: 80 },
  'kontakt.intro':   { label: 'Kontakt — Intro', type: 'text', max: 300 },

  'gewinnspiel.aktiv':  { label: 'Gewinnspiel/Event — sichtbar', type: 'bool' },
  'gewinnspiel.plakat': { label: 'Gewinnspiel/Event — Plakat (Bild)', type: 'image' },

  'footer.copyright': { label: 'Fußzeile — Copyright (Text nach der Jahreszahl)', type: 'string', max: 120 },
  'footer.intro':     { label: 'Fußzeile — Einleitungstext', type: 'text', max: 300 },
}

// Sektionen für Markierung/Bereichs-Chips. editable:false = Markierung erkennt
// den Bereich, erklärt aber, dass er von Vis-à-Vision gepflegt wird.
export const SECTION_META = {
  hero:             { label: 'Startbereich (Hero)', editable: true },
  sektionen:        { label: 'Startseite — Sektions-Überschriften', editable: true },
  kulturmoment:     { label: 'Helnwein / Kunst-Moment', editable: true },
  standorte:        { label: 'Standorte (Öffnungszeiten & Kontakt)', editable: true },
  aktionstorte:     { label: 'Torte des Monats', editable: true },
  klassiker:        { label: 'Unsere Klassiker', editable: true },
  vermietung:       { label: 'Events & Vermietung', editable: true },
  vermietung_seite: { label: 'Vermietung (Unterseite)', editable: true },
  anlasstorten:     { label: 'Anlasstorten', editable: true },
  tortenshop:       { label: 'Tortenshop (Unterseite)', editable: true },
  karten:           { label: 'Speisekarten (Unterseite)', editable: true },
  standort_seite:   { label: 'Standort-Unterseite', editable: true },
  kontakt:          { label: 'Kontakt (Unterseite)', editable: true },
  gewinnspiel:      { label: 'Gewinnspiel / Event', editable: true },
  footer:           { label: 'Fußzeile', editable: true },
  allergene:        { label: 'Allergeninformation', editable: false },
}

// SYNC: Worker-Schema gastro — Array-Felder die beim CMS-Update vollständig
// ersetzt werden (kein tiefes Merge, sondern Array-Swap via Worker).
export const ARRAY_REPLACE_PATHS = ['events.items', 'highlights']

// services.3.title → services.*.title
export function normalizePath(path) {
  return String(path).split('.').map((s) => (/^\d+$/.test(s) ? '*' : s)).join('.')
}

export function getFieldMeta(path) {
  return FIELD_META[normalizePath(path)] ?? null
}

// Tiefer Merge: gespeicherter Content (KV) über DEFAULT_CONTENT — neue Felder
// aus Schema-Updates fehlen alten KV-Ständen und dürfen nie undefined sein.
export function mergeContent(stored) {
  if (!stored || typeof stored !== 'object') return DEFAULT_CONTENT
  const merge = (def, val) => {
    if (Array.isArray(def)) return Array.isArray(val) ? val : def
    if (def && typeof def === 'object') {
      const out = { ...def }
      if (val && typeof val === 'object') {
        for (const k of Object.keys(val)) {
          out[k] = k in def ? merge(def[k], val[k]) : val[k]
        }
      }
      return out
    }
    return val === undefined || val === null ? def : val
  }
  return merge(DEFAULT_CONTENT, stored)
}
