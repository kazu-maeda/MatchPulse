// kickoff は UTC で管理。表示時に JST (+9h) へ変換する。
// status: 'UPCOMING' | 'LIVE' | 'FINISHED'

export const MATCHES = [
  // ── Group C (日本グループ) ──────────────────────────
  {
    id: 1,
    group: 'C',
    round: 'グループステージ 第1節',
    homeTeam: 'JPN',
    awayTeam: 'GER',
    kickoff: '2026-06-12T09:00:00Z', // JST 18:00
    venue: 'MetLife Stadium, New Jersey',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: true,
  },
  {
    id: 2,
    group: 'C',
    round: 'グループステージ 第1節',
    homeTeam: 'AUS',
    awayTeam: 'CRC',
    kickoff: '2026-06-12T22:00:00Z', // JST 翌07:00
    venue: 'SoFi Stadium, Los Angeles',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: false,
  },
  {
    id: 3,
    group: 'C',
    round: 'グループステージ 第2節',
    homeTeam: 'JPN',
    awayTeam: 'AUS',
    kickoff: '2026-06-17T22:00:00Z', // JST 翌07:00
    venue: 'AT&T Stadium, Dallas',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: true,
  },
  {
    id: 4,
    group: 'C',
    round: 'グループステージ 第2節',
    homeTeam: 'GER',
    awayTeam: 'CRC',
    kickoff: '2026-06-17T02:00:00Z', // JST 11:00
    venue: 'Levi\'s Stadium, San Francisco',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: false,
  },
  {
    id: 5,
    group: 'C',
    round: 'グループステージ 第3節',
    homeTeam: 'CRC',
    awayTeam: 'JPN',
    kickoff: '2026-06-22T02:00:00Z', // JST 11:00
    venue: 'Arrowhead Stadium, Kansas City',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: true,
  },
  {
    id: 6,
    group: 'C',
    round: 'グループステージ 第3節',
    homeTeam: 'GER',
    awayTeam: 'AUS',
    kickoff: '2026-06-22T02:00:00Z',
    venue: 'Gillette Stadium, Boston',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: false,
  },

  // ── Group A (開催国グループ) ────────────────────────
  {
    id: 7,
    group: 'A',
    round: 'グループステージ 第1節',
    homeTeam: 'USA',
    awayTeam: 'MEX',
    kickoff: '2026-06-11T23:00:00Z', // JST 翌08:00
    venue: 'Rose Bowl, Los Angeles',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: true,
  },
  {
    id: 8,
    group: 'A',
    round: 'グループステージ 第1節',
    homeTeam: 'CAN',
    awayTeam: 'JAM',
    kickoff: '2026-06-12T00:00:00Z',
    venue: 'BC Place, Vancouver',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: false,
  },
  {
    id: 9,
    group: 'A',
    round: 'グループステージ 第2節',
    homeTeam: 'USA',
    awayTeam: 'CAN',
    kickoff: '2026-06-16T22:00:00Z',
    venue: 'MetLife Stadium, New Jersey',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: false,
  },
  {
    id: 10,
    group: 'A',
    round: 'グループステージ 第3節',
    homeTeam: 'MEX',
    awayTeam: 'CAN',
    kickoff: '2026-06-21T22:00:00Z',
    venue: 'Estadio Azteca, Mexico City',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: false,
  },

  // ── Group B (南米グループ) ─────────────────────────
  {
    id: 11,
    group: 'B',
    round: 'グループステージ 第1節',
    homeTeam: 'BRA',
    awayTeam: 'ARG',
    kickoff: '2026-06-13T01:00:00Z', // JST 10:00
    venue: 'AT&T Stadium, Dallas',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: true,
  },
  {
    id: 12,
    group: 'B',
    round: 'グループステージ 第1節',
    homeTeam: 'FRA',
    awayTeam: 'URY',
    kickoff: '2026-06-13T22:00:00Z',
    venue: 'Hard Rock Stadium, Miami',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: false,
  },

  // ── Group D (欧州グループ) ─────────────────────────
  {
    id: 13,
    group: 'D',
    round: 'グループステージ 第1節',
    homeTeam: 'ESP',
    awayTeam: 'POR',
    kickoff: '2026-06-14T01:00:00Z',
    venue: 'Allegiant Stadium, Las Vegas',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: true,
  },
  {
    id: 14,
    group: 'D',
    round: 'グループステージ 第1節',
    homeTeam: 'ENG',
    awayTeam: 'ITA',
    kickoff: '2026-06-14T23:00:00Z',
    venue: 'MetLife Stadium, New Jersey',
    status: 'UPCOMING',
    score: null,
    minute: null,
    highlightUrl: null,
    featured: true,
  },
]

// ── ヘルパー関数 ─────────────────────────────────────────
// matches 引数を省略すると MATCHES（ダミーデータ）を使う。
// API データを渡せばそのまま動作する。

export function getMatchById(id, matches = MATCHES) {
  return matches.find(m => m.id === id) ?? null
}

export function getMatchesByGroup(group, matches = MATCHES) {
  return matches.filter(m => m.group === group)
}

export function getMatchesByTeam(teamId, matches = MATCHES) {
  return matches.filter(m => m.homeTeam === teamId || m.awayTeam === teamId)
}

export function getNextMatch(matches = MATCHES) {
  const now = new Date()
  return matches
    .filter(m => m.status === 'UPCOMING' && new Date(m.kickoff) > now)
    .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))[0] ?? null
}

export function getFeaturedMatches(matches = MATCHES) {
  return matches.filter(m => m.featured).slice(0, 5)
}

export function getMatchesByDate(dateStr, matches = MATCHES) {
  return matches.filter(m => {
    const jst = new Date(new Date(m.kickoff).getTime() + 9 * 60 * 60 * 1000)
    const y  = jst.getUTCFullYear()
    const mo = String(jst.getUTCMonth() + 1).padStart(2, '0')
    const d  = String(jst.getUTCDate()).padStart(2, '0')
    return `${y}-${mo}-${d}` === dateStr
  })
}

export function getMatchDates(matches = MATCHES) {
  const dates = new Set()
  matches.forEach(m => {
    const jst = new Date(new Date(m.kickoff).getTime() + 9 * 60 * 60 * 1000)
    const y  = jst.getUTCFullYear()
    const mo = String(jst.getUTCMonth() + 1).padStart(2, '0')
    const d  = String(jst.getUTCDate()).padStart(2, '0')
    dates.add(`${y}-${mo}-${d}`)
  })
  return Array.from(dates).sort()
}
