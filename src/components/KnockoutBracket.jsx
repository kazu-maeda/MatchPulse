import { KNOCKOUT_ROUNDS, KNOCKOUT_MATCHES } from '../data/knockout'
import { TEAMS } from '../data/teams'

function formatDateJST(utcStr) {
  return new Date(utcStr).toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    month: 'numeric',
    day: 'numeric',
  })
}

// プレースホルダー文字列かどうかを判定（グループ通過チームが未確定の場合）
function isPlaceholder(name) {
  if (!name || name === 'TBD') return true
  return /^(1st|2nd|3rd|Best|W )/.test(name)
}

function resolveDisplay(teamId, teamName) {
  if (teamId && TEAMS[teamId]) {
    return { flag: TEAMS[teamId].flag, name: TEAMS[teamId].name }
  }
  return { flag: null, name: teamName ?? 'TBD' }
}

function BracketMatch({ match }) {
  const homePlaceholder = isPlaceholder(match.homeTeam) && !match.homeTeamId
  const awayPlaceholder = isPlaceholder(match.awayTeam) && !match.awayTeamId

  const homeWon = match.status === 'FINISHED' && match.winnerId === match.homeTeamId
  const awayWon = match.status === 'FINISHED' && match.winnerId === match.awayTeamId

  const home = resolveDisplay(match.homeTeamId, match.homeTeam)
  const away = resolveDisplay(match.awayTeamId, match.awayTeam)

  return (
    <div className={`bk-match${match.status === 'LIVE' ? ' bk-match--live' : ''}`}>

      {/* Home row */}
      <div className={[
        'bk-match__row',
        homePlaceholder && 'bk-match__row--placeholder',
        homeWon         && 'bk-match__row--winner',
      ].filter(Boolean).join(' ')}>
        <span className="bk-match__team">
          {home.flag && <span className="bk-match__flag">{home.flag}</span>}
          {home.name}
        </span>
        <span className="bk-match__score">
          {match.homeScore ?? '–'}
        </span>
      </div>

      {/* Away row */}
      <div className={[
        'bk-match__row',
        awayPlaceholder && 'bk-match__row--placeholder',
        awayWon         && 'bk-match__row--winner',
      ].filter(Boolean).join(' ')}>
        <span className="bk-match__team">
          {away.flag && <span className="bk-match__flag">{away.flag}</span>}
          {away.name}
        </span>
        <span className="bk-match__score">
          {match.awayScore ?? '–'}
        </span>
      </div>

      {/* Date footer */}
      <div className="bk-match__date">
        {formatDateJST(match.kickoff)}
        {match.status === 'LIVE' && (
          <span className="bk-match__live-badge">LIVE</span>
        )}
      </div>

    </div>
  )
}

export function KnockoutBracket() {
  return (
    <div className="bracket-scroll">
      <div className="bracket-inner">
        {KNOCKOUT_ROUNDS.map(round => {
          const matches = KNOCKOUT_MATCHES.filter(m => m.round === round.id)
          return (
            <div key={round.id} className="bracket-col">
              <div className="bracket-col__header">
                <span className="bracket-col__label">{round.label}</span>
                <span className="bracket-col__count">{matches.length}</span>
              </div>
              <div className="bracket-col__matches">
                {matches.map(match => (
                  <BracketMatch key={match.id} match={match} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
