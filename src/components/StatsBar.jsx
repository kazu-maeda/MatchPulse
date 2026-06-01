import { TEAMS } from '../data/teams'
import { useFavorites } from '../hooks/useFavorites'

function getTodayJST() {
  const jst = new Date(Date.now() + 9 * 3600 * 1000)
  return [jst.getUTCFullYear(),
    String(jst.getUTCMonth() + 1).padStart(2, '0'),
    String(jst.getUTCDate()).padStart(2, '0')].join('-')
}

function getMatchDateJST(utcStr) {
  const jst = new Date(new Date(utcStr).getTime() + 9 * 3600 * 1000)
  return [jst.getUTCFullYear(),
    String(jst.getUTCMonth() + 1).padStart(2, '0'),
    String(jst.getUTCDate()).padStart(2, '0')].join('-')
}

function Item({ label, value, sub, accent }) {
  return (
    <div className="stats-bar__item">
      <span className="stats-bar__item-label">{label}</span>
      <span className={`stats-bar__value${accent ? ' stats-bar__value--accent' : ''}`}>
        {value}
      </span>
      {sub && <span className="stats-bar__sub">{sub}</span>}
    </div>
  )
}

export function StatsBar({ matches = [] }) {
  const { favorites } = useFavorites()

  // Next Match
  const nextMatch = matches
    .filter(m => m.status === 'UPCOMING')
    .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))[0]

  let nextValue = '—'
  let nextSub   = ''
  if (nextMatch) {
    const home = TEAMS[nextMatch.homeTeam]
    const away = TEAMS[nextMatch.awayTeam]
    nextValue = home && away
      ? `${home.flag} vs ${away.flag}`
      : `${nextMatch.homeTeam} vs ${nextMatch.awayTeam}`
    const jst = new Date(new Date(nextMatch.kickoff).getTime() + 9 * 3600 * 1000)
    nextSub = jst.toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo', month: 'numeric', day: 'numeric' })
  }

  // Today
  const today = getTodayJST()
  const todayCount = matches.filter(m => getMatchDateJST(m.kickoff) === today).length
  const todayValue = todayCount > 0 ? `${todayCount}` : '—'
  const todaySub   = todayCount > 0 ? 'MATCHES' : 'TODAY'

  // My Teams
  let teamsValue = '—'
  let teamsSub   = 'MY TEAMS'
  if (favorites.length > 0) {
    const first = TEAMS[favorites[0]]
    teamsValue = first ? `${first.flag} ${first.name}` : `${favorites.length}`
    teamsSub = favorites.length > 1 ? `+${favorites.length - 1} MORE` : 'FOLLOWING'
  }

  // Alerts
  const alertsOn = typeof Notification !== 'undefined' && Notification.permission === 'granted'
  const alertsValue = alertsOn ? 'ON' : 'OFF'

  return (
    <div className="stats-bar">
      <Item label="NEXT MATCH" value={nextValue} sub={nextSub} />
      <Item label="TODAY"      value={todayValue} sub={todaySub} />
      <Item label="MY TEAMS"   value={teamsValue} sub={teamsSub} accent={favorites.length > 0} />
      <Item label="ALERTS"     value={alertsValue} sub={alertsOn ? 'ACTIVE' : 'SET UP'} accent={alertsOn} />
    </div>
  )
}
