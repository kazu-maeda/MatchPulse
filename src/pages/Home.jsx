import { WcHero }        from '../components/WcHero'
import { StatsBar }      from '../components/StatsBar'
import { HeroMatchCard } from '../components/Countdown'
import { MatchCard }     from '../components/MatchCard'
import { FeaturedCard }  from '../components/FeaturedCard'
import { useMatches }    from '../hooks/useMatches'
import { useFavorites }  from '../hooks/useFavorites'
import {
  getNextMatch,
  getMatchesByTeam,
  getMatchesByDate,
  getMatchDates,
} from '../data/matches'

function getTodayJST() {
  const jst = new Date(Date.now() + 9 * 3600 * 1000)
  return [
    jst.getUTCFullYear(),
    String(jst.getUTCMonth() + 1).padStart(2, '0'),
    String(jst.getUTCDate()).padStart(2, '0'),
  ].join('-')
}

function getUpcoming(matches, excludeId, limit = 6) {
  return matches
    .filter(m => m.status === 'UPCOMING' && m.id !== excludeId)
    .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))
    .slice(0, limit)
}

function getFeatured(matches, excludeId) {
  return matches
    .filter(m => m.featured && m.id !== excludeId)
    .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))
    .slice(0, 4)
}

function getMatchDateJST(utcStr) {
  const jst = new Date(new Date(utcStr).getTime() + 9 * 3600 * 1000)
  return [
    jst.getUTCFullYear(),
    String(jst.getUTCMonth() + 1).padStart(2, '0'),
    String(jst.getUTCDate()).padStart(2, '0'),
  ].join('-')
}

function formatDateLabel(jstDate) {
  return new Date(jstDate + 'T00:00:00+09:00').toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    month: 'long', day: 'numeric', weekday: 'short',
  })
}

/* ── Sub-components ─────────────────────────────── */

function TodaySection({ matches, nextId }) {
  const today = getTodayJST()
  const todayMatches = matches.filter(
    m => getMatchDateJST(m.kickoff) === today && m.id !== nextId
  )
  if (todayMatches.length === 0) return null
  return (
    <>
      <div className="section-heading">
        <span className="section-heading__title">Today</span>
      </div>
      <div className="section-pad">
        <div className="match-list">
          {todayMatches.map(m => <MatchCard key={m.id} match={m} />)}
        </div>
      </div>
    </>
  )
}

function FeaturedSection({ matches, nextId }) {
  const featured = getFeatured(matches, nextId)
  if (featured.length === 0) return null
  return (
    <>
      <div className="section-heading">
        <span className="section-heading__title">Must-Watch</span>
      </div>
      <div className="section-pad">
        <div className="match-list">
          {featured.map(m => <FeaturedCard key={m.id} match={m} />)}
        </div>
      </div>
    </>
  )
}

function UpcomingSection({ matches, nextId }) {
  const upcoming = getUpcoming(matches, nextId)
  if (upcoming.length === 0) return null

  const byDate = upcoming.reduce((acc, m) => {
    const d = getMatchDateJST(m.kickoff)
    if (!acc[d]) acc[d] = []
    acc[d].push(m)
    return acc
  }, {})
  const dates = Object.keys(byDate).sort()

  return (
    <>
      {dates.map((date, i) => (
        <div key={date}>
          <div className="section-heading" style={i > 0 ? { paddingTop: 'var(--sp-5)' } : {}}>
            <span className="section-heading__title">
              {i === 0 ? 'Upcoming' : formatDateLabel(date)}
            </span>
          </div>
          <div className="section-pad">
            <div className="match-list">
              {byDate[date].map(m => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

/* ── Page ─────────────────────────────────────────── */

export function Home() {
  const { matches, loading, error, source } = useMatches()
  const { favorites } = useFavorites()

  const nextMatch = getNextMatch(matches)

  const myTeamMatches = favorites.length > 0
    ? [...new Map(
        favorites.flatMap(tid => getMatchesByTeam(tid, matches)).map(m => [m.id, m])
      ).values()]
        .filter(m => m.id !== nextMatch?.id)
        .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))
        .slice(0, 4)
    : []

  return (
    <div className="page">

      {/* App Bar */}
      <div className="app-bar">
        <div className="app-bar__logo">
          <span className="app-bar__icon">⚽</span>
          <span className="app-bar__name">MatchPulse</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* データソースインジケーター（開発確認用） */}
          {source === 'api' && (
            <span style={{ fontSize: '0.55rem', color: 'var(--gold)', opacity: 0.7 }}>LIVE</span>
          )}
          <span className="app-bar__badge">2026 WC™</span>
        </div>
      </div>

      {/* ローディング中 */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '8px', fontSize: '0.7rem', color: 'var(--text-lo)' }}>
          試合データを取得中...
        </div>
      )}

      {/* API エラー（ダミーデータで継続中） */}
      {error && !loading && source === 'dummy' && (
        <div style={{ margin: '0 20px 4px', padding: '8px 12px', background: 'var(--surface-2)', borderRadius: '8px', fontSize: '0.62rem', color: 'var(--text-lo)' }}>
          ⚠️ {error} — デモデータで表示中
        </div>
      )}

      {/* ── DEV デバッグ表示 ── */}
      {import.meta.env.DEV && (
        <div style={{
          margin: '0 16px 6px',
          padding: '6px 10px',
          background: source === 'api' ? 'rgba(0,200,100,0.07)' : 'rgba(255,160,0,0.07)',
          border: `1px solid ${source === 'api' ? 'rgba(0,200,100,0.25)' : 'rgba(255,160,0,0.25)'}`,
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '0.6rem',
          color: '#888',
          lineHeight: 1.6,
        }}>
          <span style={{ color: source === 'api' ? '#00c864' : '#ffa000', fontWeight: 700 }}>
            source: {source}
          </span>
          {' | '}matches: {matches.length}
          {' | '}loading: {String(loading)}
          {error && <span style={{ color: '#f44' }}> | error: {error}</span>}
        </div>
      )}

      {/* WC Hero */}
      <WcHero kickoff={matches.length > 0
        ? matches.map(m => m.kickoff).sort()[0]
        : null}
      />

      {/* Stats Bar */}
      <StatsBar matches={matches} />

      {/* Next Match */}
      <div className="hero-section">
        <p className="section-label hero-section__label">Next Match</p>
        <HeroMatchCard match={nextMatch} />
      </div>

      {/* Today */}
      <TodaySection matches={matches} nextId={nextMatch?.id} />

      {/* My Teams */}
      {myTeamMatches.length > 0 && (
        <>
          <div className="section-heading">
            <span className="section-heading__title">My Teams</span>
          </div>
          <div className="section-pad">
            <div className="match-list">
              {myTeamMatches.map(m => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>
        </>
      )}

      {/* Must-Watch */}
      <FeaturedSection matches={matches} nextId={nextMatch?.id} />

      {/* Upcoming */}
      <UpcomingSection matches={matches} nextId={nextMatch?.id} />

    </div>
  )
}
