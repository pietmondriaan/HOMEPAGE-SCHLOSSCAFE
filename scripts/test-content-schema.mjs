// Mini-Test: mergeContent({}) muss exakt DEFAULT_CONTENT liefern, Teil-Merges
// dürfen Defaults nicht zerstören. Aufruf: node scripts/test-content-schema.mjs
//
// Hinweis: package.json hat "type": "commonjs" — src/content-schema.js (ESM)
// kann daher nicht direkt importiert werden. Workaround: Kopie als .mjs in
// ein Temp-Verzeichnis, dann dynamischer Import. (Vite und Cloudflare Pages
// bundeln ESM unabhängig vom package.json-type — nur Node ist hier strikt.)
import { copyFile, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'

const schemaSrc = fileURLToPath(new URL('../src/content-schema.js', import.meta.url))
const dir = await mkdtemp(join(tmpdir(), 'content-schema-test-'))
const schemaCopy = join(dir, 'content-schema.mjs')
await copyFile(schemaSrc, schemaCopy)

try {
  const { DEFAULT_CONTENT, FIELD_META, mergeContent, normalizePath, getFieldMeta } =
    await import(pathToFileURL(schemaCopy).href)

  // 1) Leerer/fehlender KV-Stand → exakt die Defaults
  assert.deepEqual(mergeContent({}), DEFAULT_CONTENT, 'mergeContent({}) !== DEFAULT_CONTENT')
  assert.deepEqual(mergeContent(null), DEFAULT_CONTENT, 'mergeContent(null) !== DEFAULT_CONTENT')
  assert.deepEqual(mergeContent(undefined), DEFAULT_CONTENT, 'mergeContent(undefined) !== DEFAULT_CONTENT')

  // 2) Teil-Merge: gespeicherter Wert gewinnt, Rest bleibt Default
  const merged = mergeContent({ aktionstorte: { name: 'Testtorte' } })
  assert.equal(merged.aktionstorte.name, 'Testtorte')
  assert.equal(merged.aktionstorte.preis, DEFAULT_CONTENT.aktionstorte.preis)
  assert.equal(merged.standorte.schlosscafe.telefon, DEFAULT_CONTENT.standorte.schlosscafe.telefon)

  // 3) Stichproben-Defaults (exakter Bestand von heute)
  assert.equal(DEFAULT_CONTENT.meta.business_name, 'Café mit Herz')
  assert.equal(DEFAULT_CONTENT.standorte.reinhardt.telefon, '04236 2140')
  assert.equal(DEFAULT_CONTENT.aktionstorte.preis, '52.00')
  assert.equal(typeof DEFAULT_CONTENT.aktionstorte.aktiv, 'boolean')

  // 4) Jeder FIELD_META-Pfad muss in DEFAULT_CONTENT existieren
  for (const path of Object.keys(FIELD_META)) {
    let node = DEFAULT_CONTENT
    for (const seg of path.split('.')) {
      assert.ok(node != null && seg in node, `FIELD_META-Pfad fehlt in DEFAULT_CONTENT: ${path}`)
      node = node[seg]
    }
  }

  // 5) Pfad-Helfer
  assert.equal(normalizePath('klassiker.0.text'), 'klassiker.*.text')
  assert.equal(getFieldMeta('footer.copyright').type, 'string')

  console.log('content-schema OK — alle Checks bestanden')
} finally {
  await rm(dir, { recursive: true, force: true })
}
