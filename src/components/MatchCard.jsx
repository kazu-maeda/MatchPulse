import { TEAMS } from '../data/teams'

function formatTimeJST(utcString) {
  return new Date(utcString).toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function StatusBadge({ status, minute }) {
  if (status === 'LIVE') {
    return <span className="badge badge--live">{minute ? `${minute}'` : 'LIVE'}</span>
  }
  if (status === 'FINISHED') {
    return <span className="badge badge--finished">終了</span>
  }
  return null
}

// TEAMS に未登録のチーム（APIから取得した48チームなど）のフォールバック
function resolveTeam(id, nameFromApi) {
  return TEAMS[id] ?? {
    id,
    name: nameFromApi ?? id,
    nameEn: nameFromApi ?? id,
    flag: '🏳️',
  }
}

export function MatchCard({ match }) {
  const home = resolveTeam(match.homeTeam, match.homeTeamName)
  const away = resolveTeam(match.awayTeam, match.awayTeamName)

  const isUpcoming  = match.status === 'UPCOMING'
  const isFinished  = match.status === 'FINISHED'

  const matchMeta = match.group
    ? `グループ ${match.group}`
    : match.round || ''

  return (
    <div className={`match-card match-card--${match.status.toLowerCase()}`}>
      {/* Top row */}
      <div className="match-card__top">
        {matchMeta && <span className="match-card__meta">{matchMeta}</span>}
        <StatusBadge status={match.status} minute={match.minute} />
      </div>

      {/* Body */}
      <div className="match-card__body">
        <div className="match-card__team">
          <span className="match-card__flag">{home.flag}</span>
          <span className="match-card__name">{home.name}</span>
        </div>

        <div className="match-card__center">
          {isUpcoming ? (
            <p className="match-card__time">
              {formatTimeJST(match.kickoff)}
            </p>
          ) : (
            <div className="match-card__score">
              <span className={isFinished && match.score?.home > match.score?.away ? 'score--win' : ''}>
                {match.score?.home ?? '–'}
              </span>
              <span className="match-card__score-sep">:</span>
              <span className={isFinished && match.score?.away > match.score?.home ? 'score--win' : ''}>
                {match.score?.away ?? '–'}
              </span>
            </div>
          )}
        </div>

        <div className="match-card__team">
          <span className="match-card__flag">{away.flag}</span>
          <span className="match-card__name">{away.name}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="match-card__footer">
        <span className="match-card__venue">{match.venue}</span>
        {isFinished && match.highlightUrl && (
          <a
            href={match.highlightUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="match-card__highlight"
          >
            ▶ ハイライト
          </a>
        )}
      </div>
    </div>
  )
}
