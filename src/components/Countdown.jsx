import { useCountdown } from '../hooks/useCountdown'
import { TEAMS } from '../data/teams'
import { NotificationButton } from './NotificationButton'

function formatKickoffJST(utcString) {
  return new Date(utcString).toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function pad(n) { return String(n).padStart(2, '0') }

export function HeroMatchCard({ match }) {
  const timeLeft = useCountdown(match?.kickoff)

  if (!match) {
    return (
      <div className="hero-card">
        <p className="empty-state">次の試合情報はありません</p>
      </div>
    )
  }

  const home = TEAMS[match.homeTeam] ?? { name: match.homeTeamName ?? match.homeTeam, flag: '🏳️' }
  const away = TEAMS[match.awayTeam] ?? { name: match.awayTeamName ?? match.awayTeam, flag: '🏳️' }

  const roundSuffix = match.round?.replace('グループステージ', '').trim()
  const groupLabel = match.group
    ? `グループ ${match.group}${roundSuffix ? ` · ${roundSuffix}` : ''}`
    : (match.round || '')

  return (
    <div className="hero-card">
      <p className="hero-card__group">{groupLabel}</p>

      {/* Teams */}
      <div className="hero-teams">
        <div className="hero-team">
          <span className="hero-team__flag">{home.flag}</span>
          <span className="hero-team__name">{home.name}</span>
        </div>
        <span className="hero-vs">VS</span>
        <div className="hero-team">
          <span className="hero-team__flag">{away.flag}</span>
          <span className="hero-team__name">{away.name}</span>
        </div>
      </div>

      {/* Countdown */}
      <div className="hero-countdown">
        <span className="hero-countdown__label">Kick Off In</span>
        {timeLeft && !timeLeft.expired ? (
          <div className="hero-countdown__timer">
            {timeLeft.days > 0 && (
              <>
                <div className="hero-countdown__unit">
                  <span className="hero-countdown__num">{pad(timeLeft.days)}</span>
                  <span className="hero-countdown__unit-label">Days</span>
                </div>
                <span className="hero-countdown__sep">:</span>
              </>
            )}
            <div className="hero-countdown__unit">
              <span className="hero-countdown__num">{pad(timeLeft.hours)}</span>
              <span className="hero-countdown__unit-label">Hrs</span>
            </div>
            <span className="hero-countdown__sep">:</span>
            <div className="hero-countdown__unit">
              <span className="hero-countdown__num">{pad(timeLeft.minutes)}</span>
              <span className="hero-countdown__unit-label">Min</span>
            </div>
            <span className="hero-countdown__sep">:</span>
            <div className="hero-countdown__unit">
              <span className="hero-countdown__num">{pad(timeLeft.seconds)}</span>
              <span className="hero-countdown__unit-label">Sec</span>
            </div>
          </div>
        ) : (
          <p className="hero-countdown__now">Kick Off !</p>
        )}
      </div>

      {/* Date + venue */}
      <div className="hero-card__meta">
        <p className="hero-card__time">{formatKickoffJST(match.kickoff)}</p>
        <p className="hero-card__venue">{match.venue}</p>
      </div>

      <div className="hero-card__divider" />
      <NotificationButton match={match} />
    </div>
  )
}
