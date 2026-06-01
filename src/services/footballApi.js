/**
 * Football-Data.org v4 API
 * https://docs.football-data.org/
 *
 * Free tier: 10 req/min
 * リクエストは /api/football-data（Vercel Function / Vite proxy）経由で行う。
 * APIキーはサーバー側の FOOTBALL_API_KEY 環境変数で管理し、フロントには露出しない。
 */

const WC_SEASON = '2026'

// football-data のステータス → 内部ステータスへのマッピング
const STATUS_MAP = {
  SCHEDULED:          'UPCOMING',
  TIMED:              'UPCOMING',
  IN_PLAY:            'LIVE',
  PAUSED:             'LIVE',
  EXTRA_TIME:         'LIVE',
  PENALTY_SHOOTOUT:   'LIVE',
  FINISHED:           'FINISHED',
  SUSPENDED:          'UPCOMING',
  CANCELLED:          'FINISHED',
  POSTPONED:          'UPCOMING',
}

// football-data の stage → 日本語ラベル
const STAGE_LABEL = {
  GROUP_STAGE:         'グループステージ',
  LAST_32:             'ラウンド32',
  LAST_16:             'ラウンド16',
  QUARTER_FINALS:      '準々決勝',
  SEMI_FINALS:         '準決勝',
  THIRD_PLACE:         '3位決定戦',
  FINAL:               '決勝',
}

// football-data の stage → ノックアウトブラケットの round ID
const STAGE_TO_ID = {
  LAST_32:        'r32',
  LAST_16:        'r16',
  QUARTER_FINALS: 'qf',
  SEMI_FINALS:    'sf',
  THIRD_PLACE:    'third',
  FINAL:          'final',
}

/**
 * WC 2026 の試合一覧を取得する
 * @returns {Promise<import('../data/matches').Match[]>}
 */
const DEV = import.meta.env.DEV

export async function fetchWcMatches() {
  const url = `/api/football-data?season=${WC_SEASON}`
  DEV && console.log('[API] GET', url)

  let res
  try {
    res = await fetch(url)
  } catch (networkErr) {
    console.error('[API] network error:', networkErr.message)
    throw networkErr
  }

  DEV && console.log('[API] status:', res.status, res.statusText)

  if (!res.ok) {
    const body = await res.text()
    console.error('[API] error response:', res.status, body.slice(0, 200))
  }

  if (res.status === 400) throw new Error('WC 2026 のデータはまだ公開されていません')
  if (res.status === 401) throw new Error('APIキーが無効です')
  if (res.status === 403) throw new Error('このリソースへのアクセス権がありません')
  if (res.status === 429) throw new Error('レート制限（10req/分）に達しました')
  if (res.status === 503) throw new Error('サーバーに FOOTBALL_API_KEY が未設定です')
  if (!res.ok)             throw new Error(`API エラー: ${res.status}`)

  const json = await res.json()
  if (!json.matches?.length) throw new Error('試合データが0件でした')

  return json.matches.map(transformMatch)
}

// 自動で featured = true にする対戦組み合わせ
// { home, away } は順不同で判定
const FEATURED_MATCHUPS = [
  // 日本戦は全て注目
  { teams: ['JPN'] },
  // 開幕戦 (MEX vs RSA)
  { teams: ['MEX', 'RSA'] },
  // 注目カード
  { teams: ['BRA', 'ARG'] },
  { teams: ['ESP', 'POR'] },
  { teams: ['ENG', 'FRA'] },
  { teams: ['GER', 'FRA'] },
  { teams: ['BRA', 'FRA'] },
  { teams: ['ARG', 'FRA'] },
]

function isFeatured(homeTla, awayTla) {
  return FEATURED_MATCHUPS.some(({ teams }) => {
    if (teams.length === 1) {
      return homeTla === teams[0] || awayTla === teams[0]
    }
    return (
      (homeTla === teams[0] && awayTla === teams[1]) ||
      (homeTla === teams[1] && awayTla === teams[0])
    )
  })
}

// football-data.org が使う TLA と内部コードのズレを吸収する
const TLA_NORMALIZE = {
  URU: 'URY',
}

/**
 * API レスポンスの1試合分を内部フォーマットへ変換する
 */
function transformMatch(m) {
  const normalizeTla = tla => (tla ? (TLA_NORMALIZE[tla] ?? tla) : tla)
  const homeTla = normalizeTla(m.homeTeam.tla ?? m.homeTeam.shortName)
  const awayTla = normalizeTla(m.awayTeam.tla ?? m.awayTeam.shortName)

  // "GROUP_A" → "A"
  const group = m.group
    ? m.group.replace(/^GROUP_/, '').replace(/^Group /, '').trim()
    : null

  const round = STAGE_LABEL[m.stage] ?? m.stage ?? ''

  const score = (m.score?.fullTime?.home != null)
    ? { home: m.score.fullTime.home, away: m.score.fullTime.away }
    : null

  // ノックアウト用: ラウンドID と勝者情報を保持
  // stageId は GROUP_STAGE のみ null（group フィールドで管理するため）
  const stageId = m.stage === 'GROUP_STAGE' ? null : (STAGE_TO_ID[m.stage] ?? null)
  // winner: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null
  const winner = m.score?.winner ?? null

  return {
    id:           m.id,
    group,
    round,
    stageId,
    winner,
    homeTeam:     homeTla,
    awayTeam:     awayTla,
    homeTeamName: m.homeTeam.name,
    awayTeamName: m.awayTeam.name,
    kickoff:      m.utcDate,
    venue:        m.venue ?? '',
    status:       STATUS_MAP[m.status] ?? 'UPCOMING',
    score,
    minute:       null,
    highlightUrl: null,
    featured:     isFeatured(homeTla, awayTla),
  }
}
