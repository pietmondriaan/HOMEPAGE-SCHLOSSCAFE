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
  },
  gewinnspiel: {
    aktiv: true,
    plakat: '/wm-gewinnspiel/plakat.jpg',
  },
  footer: {
    copyright: 'Café mit Herz – Schloss-Café & Cafe Reinhart. Alle Rechte vorbehalten.',
  },
}

// ---------------------------------------------------------------------------
// Feld-Metadaten: EINZIGE Quelle für LLM-Whitelist, Validierung, Markierungs-
// Labels und Admin-UI. Numerische Pfadsegmente werden als '*' normalisiert.
// type: string | text | bool | email | tel
export const FIELD_META = {
  'meta.business_name': { label: 'Firmenname', type: 'string', max: 60 },
  'meta.tagline':       { label: 'Untertitel/Slogan', type: 'string', max: 120 },

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

  'gewinnspiel.aktiv':  { label: 'Gewinnspiel/Event — sichtbar', type: 'bool' },
  'gewinnspiel.plakat': { label: 'Gewinnspiel/Event — Plakat (Bild)', type: 'image' },

  'footer.copyright': { label: 'Fußzeile — Copyright (Text nach der Jahreszahl)', type: 'string', max: 120 },
}

// Sektionen für Markierung/Bereichs-Chips. editable:false = Markierung erkennt
// den Bereich, erklärt aber, dass er von Vis-à-Vision gepflegt wird.
export const SECTION_META = {
  standorte:    { label: 'Standorte (Öffnungszeiten & Kontakt)', editable: true },
  aktionstorte: { label: 'Torte des Monats', editable: true },
  klassiker:    { label: 'Unsere Klassiker', editable: true },
  vermietung:   { label: 'Events & Vermietung', editable: true },
  anlasstorten: { label: 'Anlasstorten', editable: true },
  gewinnspiel:  { label: 'Gewinnspiel / Event', editable: true },
  footer:       { label: 'Fußzeile', editable: true },
  allergene:    { label: 'Allergeninformation', editable: false },
}

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
