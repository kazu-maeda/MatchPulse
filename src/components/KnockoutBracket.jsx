/**
 * KnockoutBracket
 *
 * ブラケット幾何学の定数（CSS と必ず一致させること）
 *   CARD_H  = .bk-match の実際の高さ
 *              = row(28) + row(28) + date(18) + border×2(2) = 76px
 *   CARD_GAP = R32 列のカード間隔 = 6px
 *   SLOT_H   = CARD_H + CARD_GAP = 82px（ブラケットグリッド1スロット）
 *   TOTAL_H  = 16 × SLOT_H = 1312px（16スロット = R32の全試合分）
 *   HDR_H    = .bracket-col__header の高さ = 36px
 */

import React from 'react'
import { KNOCKOUT_ROUNDS } from '../data/knockout'
import { TEAMS } from '../data/teams'
import { useKnockout } from '../hooks/useKnockout'

// ── Bracket geometry ─────────────────────────────────────────────────
const CARD_H  = 76
const CARD_GAP = 6
const SLOT_H  = CARD_H + CARD_GAP   // 82
const TOTAL_H = 16 * SLOT_H         // 1312
const HDR_H   = 36                  // must match CSS .bracket-col__header height
const COL_W   = 152
const CONN_W  = 20

/**
 * ラウンド r（0=R32, 1=R16, 2=QF, 3=SF, 4=Final）のカード i の top 座標
 * ブラケットグリッドに対して数学的に正確に中央配置される。
 */
function getCardTop(roundIdx, matchIdx) {
  const slots = Math.pow(2, roundIdx)   // 1, 2, 4, 8, 16
  return matchIdx * slots * SLOT_H + (slots - 1) / 2 * SLOT_H
}

// ── Connector SVG ────────────────────────────────────────────────────

/**
 * 2つのラウンド列の間に配置するSVGコネクター。
 * 各ペアに対して 「左水平 ─ 垂直 ─ 右水平」 のブラケット線を描画。
 */
function ConnectorSVG({ roundIdx, matchCount }) {
  const pairCount = matchCount / 2

  const segs = []
  for (let i = 0; i < pairCount; i++) {
    const topY = getCardTop(roundIdx, i * 2)     + CARD_H / 2
    const botY = getCardTop(roundIdx, i * 2 + 1) + CARD_H / 2
    const midY = (topY + botY) / 2
    const mx   = CONN_W / 2

    segs.push(
      // 上カード右端 → 中央軸
      <line key={`ht${i}`} x1={0}    y1={topY} x2={mx}     y2={topY} />,
      // 下カード右端 → 中央軸
      <line key={`hb${i}`} x1={0}    y1={botY} x2={mx}     y2={botY} />,
      // 中央軸の垂直線
      <line key={`v${i}`}  x1={mx}   y1={topY} x2={mx}     y2={botY} />,
      // 中点 → 次ラウンドのカード左端
      <line key={`hm${i}`} x1={mx}   y1={midY} x2={CONN_W} y2={midY} />,
    )
  }

  return (
    <svg
      width={CONN_W}
      height={HDR_H + TOTAL_H}
      style={{ flexShrink: 0 }}
    >
      {/* HDR_H ぶん下にずらしてカードエリアに揃える */}
      <g
        transform={`translate(0, ${HDR_H})`}
        stroke="rgba(240,235,226,0.18)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      >
        {segs}
      </g>
    </svg>
  )
}

// ── Match card ───────────────────────────────────────────────────────

function formatDateJST(utcStr) {
  return new Date(utcStr).toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo', month: 'numeric', day: 'numeric',
  })
}

function isPlaceholder(name) {
  return !name || name === 'TBD' || /^(1st|2nd|3rd|Best|W )/.test(name)
}

function resolveDisplay(teamId, teamName) {
  if (teamId && TEAMS[teamId]) return { flag: TEAMS[teamId].flag, name: TEAMS[teamId].name }
  return { flag: null, name: teamName ?? 'TBD' }
}

function BracketMatch({ match }) {
  const homePH  = isPlaceholder(match.homeTeam) && !match.homeTeamId
  const awayPH  = isPlaceholder(match.awayTeam) && !match.awayTeamId
  const homeWon = match.status === 'FINISHED' && match.winnerId === match.homeTeamId
  const awayWon = match.status === 'FINISHED' && match.winnerId === match.awayTeamId
  const home    = resolveDisplay(match.homeTeamId, match.homeTeam)
  const away    = resolveDisplay(match.awayTeamId, match.awayTeam)

  const rowClass = (ph, won) => [
    'bk-match__row',
    ph  && 'bk-match__row--placeholder',
    won && 'bk-match__row--winner',
  ].filter(Boolean).join(' ')

  return (
    <div className={`bk-match${match.status === 'LIVE' ? ' bk-match--live' : ''}`}>
      <div className={rowClass(homePH, homeWon)}>
        <span className="bk-match__team">
          {home.flag && <span className="bk-match__flag">{home.flag}</span>}
          {home.name}
        </span>
        <span className="bk-match__score">{match.homeScore ?? '–'}</span>
      </div>
      <div className={rowClass(awayPH, awayWon)}>
        <span className="bk-match__team">
          {away.flag && <span className="bk-match__flag">{away.flag}</span>}
          {away.name}
        </span>
        <span className="bk-match__score">{match.awayScore ?? '–'}</span>
      </div>
      <div className="bk-match__date">
        {formatDateJST(match.kickoff)}
        {match.status === 'LIVE' && (
          <span className="bk-match__live-badge">LIVE</span>
        )}
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────

export function KnockoutBracket() {
  const { knockoutMatches, loading, source } = useKnockout()

  return (
    <div className="bracket-scroll">

      {/* データソースインジケーター（開発確認用） */}
      {import.meta.env.DEV && (
        <div style={{
          margin: '0 0 8px',
          padding: '4px 8px',
          background: source === 'api' ? 'rgba(0,200,100,0.07)' : 'rgba(255,160,0,0.07)',
          border: `1px solid ${source === 'api' ? 'rgba(0,200,100,0.25)' : 'rgba(255,160,0,0.25)'}`,
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '0.58rem',
          color: source === 'api' ? '#00c864' : '#ffa000',
        }}>
          knockout: {source}{loading ? ' (loading…)' : ''}
        </div>
      )}

      <div className="bracket-inner">
        {KNOCKOUT_ROUNDS.map((round, roundIdx) => {
          const matches = knockoutMatches.filter(m => m.round === round.id)
          return (
            <React.Fragment key={round.id}>

              {/* ラウンド列 */}
              <div style={{ flexShrink: 0, width: COL_W }}>

                {/* ヘッダー（高さは HDR_H と一致させる） */}
                <div className="bracket-col__header">
                  <span className="bracket-col__label">{round.label}</span>
                  <span className="bracket-col__count">{matches.length}</span>
                </div>

                {/* カードエリア（TOTAL_H 固定、absolute 配置） */}
                <div style={{ position: 'relative', height: TOTAL_H }}>
                  {matches.map((match, idx) => (
                    <div
                      key={match.id}
                      style={{
                        position: 'absolute',
                        top: getCardTop(roundIdx, idx),
                        width: '100%',
                      }}
                    >
                      <BracketMatch match={match} />
                    </div>
                  ))}
                </div>
              </div>

              {/* コネクター SVG（最終ラウンドには不要） */}
              {roundIdx < KNOCKOUT_ROUNDS.length - 1 && (
                <ConnectorSVG
                  roundIdx={roundIdx}
                  matchCount={matches.length}
                />
              )}

            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
