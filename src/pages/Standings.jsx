import { TEAMS } from '../data/teams'
import { GROUP_STANDINGS } from '../data/groups'
import { useMatches } from '../hooks/useMatches'

function resolveTeam(teamId, teamName) {
  return TEAMS[teamId] ?? { flag: '🏳️', name: teamName ?? teamId }
}

// matches からグループ別チーム一覧を抽出し、勝点などを全て 0 で初期化する
function buildGroupsFromMatches(matches) {
  const groups = {}
  matches
    .filter(m => m.group)
    .forEach(m => {
      if (!groups[m.group]) groups[m.group] = {}
      for (const [id, name] of [
        [m.homeTeam, m.homeTeamName],
        [m.awayTeam, m.awayTeamName],
      ]) {
        if (!groups[m.group][id]) {
          groups[m.group][id] = {
            teamId: id, teamName: name ?? id,
            played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0,
          }
        }
      }
    })
  return groups
}

// グループ構造にスコアを反映し、勝点順にソートした結果を返す
function buildStandings(matches) {
  const groups = buildGroupsFromMatches(matches)

  matches
    .filter(m => m.group && m.status === 'FINISHED' && m.score != null)
    .forEach(m => {
      const home = groups[m.group]?.[m.homeTeam]
      const away = groups[m.group]?.[m.awayTeam]
      if (!home || !away) return
      const hg = m.score.home ?? 0
      const ag = m.score.away ?? 0
      home.played++; away.played++
      home.gf += hg; home.ga += ag
      away.gf += ag; away.ga += hg
      if (hg > ag)      { home.won++; home.pts += 3; away.lost++ }
      else if (hg < ag) { away.won++; away.pts += 3; home.lost++ }
      else              { home.drawn++; home.pts++; away.drawn++; away.pts++ }
    })

  const result = {}
  Object.keys(groups).sort().forEach(g => {
    result[g] = Object.values(groups[g])
      .map(r => ({ ...r, gd: r.gf - r.ga }))
      .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf)
  })
  return result
}

// API 失敗時のフォールバック：groups.js のダミーデータをそのまま使う
function fallbackStandings() {
  const result = {}
  Object.keys(GROUP_STANDINGS).sort().forEach(g => {
    result[g] = GROUP_STANDINGS[g]
  })
  return result
}

function GroupTable({ groupName, rows }) {
  return (
    <div className="group-table">
      <h3 className="group-table__title">グループ {groupName}</h3>
      <div className="group-table__wrapper">
        <table className="group-table__table">
          <thead>
            <tr>
              <th className="col-rank">#</th>
              <th className="col-team">チーム</th>
              <th title="試合数">試</th>
              <th title="勝利">勝</th>
              <th title="引分">分</th>
              <th title="敗北">負</th>
              <th title="得点">得</th>
              <th title="失点">失</th>
              <th title="得失点差">差</th>
              <th title="勝点" className="col-pts">勝点</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const team = resolveTeam(row.teamId, row.teamName)
              return (
                <tr key={row.teamId} className={i < 2 ? 'row--qualified' : ''}>
                  <td className="col-rank">{i + 1}</td>
                  <td className="col-team">
                    <span className="table-flag">{team.flag}</span>
                    <span className="table-name">{team.name}</span>
                  </td>
                  <td>{row.played}</td>
                  <td>{row.won}</td>
                  <td>{row.drawn}</td>
                  <td>{row.lost}</td>
                  <td>{row.gf}</td>
                  <td>{row.ga}</td>
                  <td>{row.gd >= 0 ? `+${row.gd}` : row.gd}</td>
                  <td className="col-pts">{row.pts}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="group-table__note">上位2チームが決勝トーナメントへ進出</p>
    </div>
  )
}

export function Standings() {
  const { matches, loading, source } = useMatches()
  // API 失敗時（source==='dummy' かつ ロード完了）は groups.js へフォールバック
  const standings = (!loading && source === 'dummy')
    ? fallbackStandings()
    : buildStandings(matches)
  const groupCount = Object.keys(standings).length

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-header__title">グループ順位表</h1>
        <p className="page-header__sub">
          {loading
            ? '取得中...'
            : `${groupCount} グループ · ${source === 'api' ? 'LIVE DATA' : 'DEMO'}`}
        </p>
      </header>

      {loading && (
        <div style={{ textAlign: 'center', padding: '24px', fontSize: '0.75rem', color: 'var(--text-lo)' }}>
          データ取得中...
        </div>
      )}

      <div className="section">
        {groupCount > 0
          ? Object.entries(standings).map(([g, rows]) => (
              <GroupTable key={g} groupName={g} rows={rows} />
            ))
          : !loading && (
              <p className="empty-state">グループデータを取得できませんでした</p>
            )
        }
      </div>
    </div>
  )
}
