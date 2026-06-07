// Cloudflare Pages Function — anonyme Besuchszählung (eindeutig pro Tag, ohne Cookie).
// Wird beim Laden jeder Seite einmal per GET /api/track aufgerufen.
// Speichert KEINE IP im Klartext: nur ein anonymer Tages-Hash (TTL 48h) zur Dopplungsvermeidung.
export async function onRequestGet({ request, env }) {
  const kv = env.COUNTER
  // Fail-safe: ohne KV-Bindung niemals die Seite stören.
  if (!kv) return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })

  try {
    const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD (UTC)
    const ip = request.headers.get('CF-Connecting-IP') || ''
    const ua = request.headers.get('User-Agent') || ''
    const salt = env.HASH_SALT || 'schlosscafe'
    const hash = await sha256(`${salt}|${ip}|${ua}|${today}`)
    const seenKey = `seen:${hash}`

    // Schon heute gezählt? Dann nichts tun (eindeutige Besucher pro Tag).
    if (!(await kv.get(seenKey))) {
      await kv.put(seenKey, '1', { expirationTtl: 172800 }) // 48 h
      const total = parseInt((await kv.get('total')) || '0', 10) + 1
      await kv.put('total', String(total))
      const dayKey = `day:${today}`
      const day = parseInt((await kv.get(dayKey)) || '0', 10) + 1
      await kv.put(dayKey, String(day), { expirationTtl: 5184000 }) // ~60 Tage aufheben
    }
  } catch (e) {
    // Zählfehler dürfen die Website nie beeinträchtigen.
  }
  return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })
}

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}
