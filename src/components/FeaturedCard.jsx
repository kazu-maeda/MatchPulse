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

// 誰が見ても「なぜ注目すべきか」がわかるラベル
const MATCH_LABELS = {
  7:  'Opening Match',          // 大会の幕開け
  1:  'Japan — First Match',    // 日本代表の初戦
  11: 'Brazil vs Argentina',    // 世界最大のライバル関係
  13: 'Spain vs Portugal',      // イベリア半島ダービー
  14: 'England vs Italy',       // 直近ユーロ決勝の再戦
  12: 'France — The Favorites', // 優勝候補筆頭
}

function resolveTeam(id, nameFromMatch) {
  return TEAMS[id] ?? { id, name: nameFromMatch ?? id, nameEn: nameFromMatch ?? id, flag: '🏳️' }
}

export function FeaturedCard({ match }) {
  const home = resolveTeam(match.homeTeam, match.homeTeamName)
  const away = resolveTeam(match.awayTeam, match.awayTeamName)
  const label = MATCH_LABELS[match.id] ?? `Group ${match.group} Match`

  return (
    <div className="featured-card">
      <span className="featured-card__label">{label}</span>

      <div className="featured-card__body">
        <div className="featured-card__team">
          <span className="featured-card__flag">{home.flag}</span>
          <span className="featured-card__name">{home.name}</span>
        </div>

        <div className="featured-card__center">
          <p className="featured-card__time">
            {formatTimeJST(match.kickoff)}
          </p>
        </div>

        <div className="featured-card__team">
          <span className="featured-card__flag">{away.flag}</span>
          <span className="featured-card__name">{away.name}</span>
        </div>
      </div>

      <div className="featured-card__footer">
        <span className="featured-card__venue">{match.venue}</span>
        <span className="featured-card__group">Group {match.group}</span>
      </div>
    </div>
  )
}
