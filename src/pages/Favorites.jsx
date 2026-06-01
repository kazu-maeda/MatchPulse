import { useFavorites }  from '../hooks/useFavorites'
import { useMatches }    from '../hooks/useMatches'
import { MatchCard }     from '../components/MatchCard'
import { TEAMS }         from '../data/teams'
import { getMatchesByTeam } from '../data/matches'

const ALL_TEAMS = Object.values(TEAMS)

export function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { matches } = useMatches()

  const favoriteMatches = favorites.length > 0
    ? [...new Map(
        favorites.flatMap(tid => getMatchesByTeam(tid, matches)).map(m => [m.id, m])
      ).values()]
        .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))
    : []

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-header__title">お気に入りチーム</h1>
        <p className="page-header__sub">応援するチームを登録しよう</p>
      </header>

      <section className="section-pad" style={{ paddingTop: 'var(--sp-5)' }}>
        <div className="team-grid">
          {ALL_TEAMS.map(team => (
            <button
              key={team.id}
              className={`team-chip${isFavorite(team.id) ? ' team-chip--active' : ''}`}
              onClick={() => toggleFavorite(team.id)}
            >
              <span className="team-chip__flag">{team.flag}</span>
              <span className="team-chip__name">{team.name}</span>
              {isFavorite(team.id) && <span className="team-chip__check">✓</span>}
            </button>
          ))}
        </div>
      </section>

      {favorites.length > 0 && (
        <>
          <div className="section-heading">
            <span className="section-heading__title">登録チームの試合</span>
          </div>
          <div className="section-pad">
            {favoriteMatches.length > 0 ? (
              <div className="match-list">
                {favoriteMatches.map(m => <MatchCard key={m.id} match={m} />)}
              </div>
            ) : (
              <p className="empty-state">試合データがありません</p>
            )}
          </div>
        </>
      )}

      {favorites.length === 0 && (
        <p className="empty-state">上からチームをタップして登録してください</p>
      )}
    </div>
  )
}
