export default async function handler(req, res) {
  const key = process.env.FOOTBALL_API_KEY

  if (!key) {
    console.error('[proxy] FOOTBALL_API_KEY が未設定です')
    res.status(503).json({ error: 'API key not configured on server' })
    return
  }

  const season = req.query?.season ?? '2026'
  const url = `https://api.football-data.org/v4/competitions/WC/matches?season=${season}`

  console.log('[proxy] fetching:', url)

  let apiRes
  try {
    apiRes = await fetch(url, { headers: { 'X-Auth-Token': key } })
  } catch (err) {
    console.error('[proxy] network error:', err.message)
    res.status(502).json({ error: 'Football-Data.org に到達できませんでした', detail: err.message })
    return
  }

  console.log('[proxy] status:', apiRes.status)

  if (!apiRes.ok) {
    const body = await apiRes.text()
    console.error('[proxy] upstream error body:', body)
    res.status(apiRes.status).json({ error: `Upstream error: ${apiRes.status}`, detail: body })
    return
  }

  const data = await apiRes.json()
  res.status(200).json(data)
}
