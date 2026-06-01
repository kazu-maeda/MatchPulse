import { useMemo } from 'react'
import { useMatches } from './useMatches'
import { KNOCKOUT_MATCHES } from '../data/knockout'
import { TEAMS } from '../data/teams'

/**
 * ダミーID 'r32-01' → { roundId: 'r32', idx: 0 }
 */
function parseId(id) {
  const m = id.match(/^(.+)-(\d+)$/)
  return m ? { roundId: m[1], idx: parseInt(m[2], 10) - 1 } : null
}

/**
 * API試合から勝者TLAを解決する
 * football-data の winner フィールドは 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null
 */
function resolveWinnerId(apiMatch) {
  if (apiMatch.status !== 'FINISHED') return null
  if (apiMatch.winner === 'HOME_TEAM') return apiMatch.homeTeam
  if (apiMatch.winner === 'AWAY_TEAM') return apiMatch.awayTeam
  return null
}

/**
 * useKnockout
 *
 * useMatches のキャッシュを再利用してノックアウト試合データを取得する。
 * 追加のAPIリクエストは発生しない（10req/分の制限対策）。
 *
 * マッピング方式:
 *   API の stageId 別試合を kickoff 昇順でソートし、
 *   ダミーデータの連番インデックスと 1:1 対応させてマージする。
 *   チームが未確定（TLA が null）の場合はダミーのプレースホルダーを維持する。
 */
export function useKnockout() {
  const { matches, loading, source: matchSource } = useMatches()

  const { knockoutMatches, source } = useMemo(() => {
    // API データがなければダミーをそのまま返す
    if (matchSource === 'dummy' || loading) {
      return { knockoutMatches: KNOCKOUT_MATCHES, source: 'dummy' }
    }

    // stageId 別に API ノックアウト試合をグループ化（kickoff 昇順）
    const apiByRound = {}
    matches
      .filter(m => m.stageId != null)
      .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff))
      .forEach(m => {
        if (!apiByRound[m.stageId]) apiByRound[m.stageId] = []
        apiByRound[m.stageId].push(m)
      })

    // ノックアウト試合が 1 件もなければダミーを返す
    const hasAny = Object.values(apiByRound).some(arr => arr.length > 0)
    if (!hasAny) {
      return { knockoutMatches: KNOCKOUT_MATCHES, source: 'dummy' }
    }

    // ダミーと API データをインデックスでマージ
    const merged = KNOCKOUT_MATCHES.map(dummy => {
      const parsed = parseId(dummy.id)
      if (!parsed) return dummy

      const apiMatch = apiByRound[parsed.roundId]?.[parsed.idx]
      if (!apiMatch) return dummy

      // チームが確定しているかどうか判定（null / 空の TLA はまだ未確定）
      const homeResolved = Boolean(apiMatch.homeTeam)
      const awayResolved = Boolean(apiMatch.awayTeam)

      const homeName = homeResolved
        ? (TEAMS[apiMatch.homeTeam]?.name ?? apiMatch.homeTeamName ?? dummy.homeTeam)
        : dummy.homeTeam

      const awayName = awayResolved
        ? (TEAMS[apiMatch.awayTeam]?.name ?? apiMatch.awayTeamName ?? dummy.awayTeam)
        : dummy.awayTeam

      return {
        ...dummy,
        homeTeam:   homeName,
        awayTeam:   awayName,
        homeTeamId: homeResolved ? apiMatch.homeTeam : null,
        awayTeamId: awayResolved ? apiMatch.awayTeam : null,
        homeScore:  apiMatch.score?.home ?? null,
        awayScore:  apiMatch.score?.away ?? null,
        winnerId:   resolveWinnerId(apiMatch),
        status:     apiMatch.status,
        kickoff:    apiMatch.kickoff,
        venue:      apiMatch.venue || dummy.venue,
      }
    })

    return { knockoutMatches: merged, source: 'api' }
  }, [matches, loading, matchSource])

  return { knockoutMatches, loading, source }
}
