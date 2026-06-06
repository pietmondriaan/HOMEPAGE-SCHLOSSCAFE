// Cloudflare Pages Function — liefert die Besucherzahlen (privat, schlüsselgeschützt).
// GET /api/stats?key=<STATS_KEY>  ->  { heute, woche, gesamt }
export async function onRequestGet({ request, env }) {
  const key = new URL(request.url).searchParams.get('key') || ''
  const expected = env.STATS_KEY || ''
  if (!expected || key !== expected) {
    return json({ error: 'unauthorized' }, 401)
  }

  const kv = env.COUNTER
  if (!kv) return json({ heute: 0, woche: 0, gesamt: 0 })

  const dayKey = (d) => `day:${d.toISOString().slice(0, 10)}`
  const num = async (k) => parseInt((await kv.get(k)) || '0', 10)

  const heute = await num(dayKey(new Date()))
  let woche = 0
  for (let i = 0; i < 7; i++) {
    woche += await num(dayKey(new Date(Date.now() - i * 86400000)))
  }
  const gesamt = await num('total')

  return json({ heute, woche, gesamt })
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}
