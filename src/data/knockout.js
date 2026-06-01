/**
 * WC 2026 ノックアウトステージ データ
 *
 * - グループステージ通過後は homeTeam / awayTeam を API の実データで上書きする
 * - homeTeamId / awayTeamId を埋めると TEAMS の国旗が自動表示される
 * - winnerId を設定すると勝者ハイライトが有効になる
 * - status: 'SCHEDULED' | 'LIVE' | 'FINISHED'
 */

export const KNOCKOUT_ROUNDS = [
  { id: 'r32',   label: 'Round of 32',    shortLabel: 'R32', matchCount: 16 },
  { id: 'r16',   label: 'Round of 16',    shortLabel: 'R16', matchCount: 8  },
  { id: 'qf',    label: 'Quarter Finals', shortLabel: 'QF',  matchCount: 4  },
  { id: 'sf',    label: 'Semi Finals',    shortLabel: 'SF',  matchCount: 2  },
  { id: 'final', label: 'Final',          shortLabel: 'FNL', matchCount: 1  },
]

export const KNOCKOUT_MATCHES = [

  // ── Round of 32 (16 matches / June 28 – July 2) ──────────────────
  {
    id: 'r32-01', round: 'r32',
    homeTeam: '1st Group A', awayTeam: '2nd Group B',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-06-28T18:00:00Z',
  },
  {
    id: 'r32-02', round: 'r32',
    homeTeam: '1st Group C', awayTeam: '2nd Group D',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-06-28T21:00:00Z',
  },
  {
    id: 'r32-03', round: 'r32',
    homeTeam: '1st Group B', awayTeam: '2nd Group A',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-06-29T01:00:00Z',
  },
  {
    id: 'r32-04', round: 'r32',
    homeTeam: '1st Group D', awayTeam: '2nd Group C',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-06-29T04:00:00Z',
  },
  {
    id: 'r32-05', round: 'r32',
    homeTeam: '1st Group E', awayTeam: '2nd Group F',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-06-29T18:00:00Z',
  },
  {
    id: 'r32-06', round: 'r32',
    homeTeam: '1st Group G', awayTeam: '2nd Group H',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-06-29T21:00:00Z',
  },
  {
    id: 'r32-07', round: 'r32',
    homeTeam: '1st Group F', awayTeam: '2nd Group E',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-06-30T01:00:00Z',
  },
  {
    id: 'r32-08', round: 'r32',
    homeTeam: '1st Group H', awayTeam: '2nd Group G',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-06-30T04:00:00Z',
  },
  {
    id: 'r32-09', round: 'r32',
    homeTeam: '1st Group I', awayTeam: '2nd Group J',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-06-30T18:00:00Z',
  },
  {
    id: 'r32-10', round: 'r32',
    homeTeam: '1st Group K', awayTeam: '2nd Group L',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-06-30T21:00:00Z',
  },
  {
    id: 'r32-11', round: 'r32',
    homeTeam: '1st Group J', awayTeam: '2nd Group I',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-01T01:00:00Z',
  },
  {
    id: 'r32-12', round: 'r32',
    homeTeam: '1st Group L', awayTeam: '2nd Group K',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-01T04:00:00Z',
  },
  {
    id: 'r32-13', round: 'r32',
    homeTeam: '3rd Best (A/B/C)', awayTeam: '3rd Best (D/E/F)',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-01T18:00:00Z',
  },
  {
    id: 'r32-14', round: 'r32',
    homeTeam: '3rd Best (G/H/I)', awayTeam: '3rd Best (J/K/L)',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-01T21:00:00Z',
  },
  {
    id: 'r32-15', round: 'r32',
    homeTeam: '3rd Best (A/D/G/J)', awayTeam: '3rd Best (B/E/H/K)',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-02T18:00:00Z',
  },
  {
    id: 'r32-16', round: 'r32',
    homeTeam: '3rd Best (C/F/I/L)', awayTeam: '3rd Best (remaining)',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-02T21:00:00Z',
  },

  // ── Round of 16 (8 matches / July 4–7) ────────────────────────────
  {
    id: 'r16-01', round: 'r16',
    homeTeam: 'W R32-01', awayTeam: 'W R32-02',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-04T18:00:00Z',
  },
  {
    id: 'r16-02', round: 'r16',
    homeTeam: 'W R32-03', awayTeam: 'W R32-04',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-04T21:00:00Z',
  },
  {
    id: 'r16-03', round: 'r16',
    homeTeam: 'W R32-05', awayTeam: 'W R32-06',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-05T18:00:00Z',
  },
  {
    id: 'r16-04', round: 'r16',
    homeTeam: 'W R32-07', awayTeam: 'W R32-08',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-05T21:00:00Z',
  },
  {
    id: 'r16-05', round: 'r16',
    homeTeam: 'W R32-09', awayTeam: 'W R32-10',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-06T18:00:00Z',
  },
  {
    id: 'r16-06', round: 'r16',
    homeTeam: 'W R32-11', awayTeam: 'W R32-12',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-06T21:00:00Z',
  },
  {
    id: 'r16-07', round: 'r16',
    homeTeam: 'W R32-13', awayTeam: 'W R32-14',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-07T18:00:00Z',
  },
  {
    id: 'r16-08', round: 'r16',
    homeTeam: 'W R32-15', awayTeam: 'W R32-16',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-07T21:00:00Z',
  },

  // ── Quarter Finals (4 matches / July 11–12) ───────────────────────
  {
    id: 'qf-01', round: 'qf',
    homeTeam: 'W R16-01', awayTeam: 'W R16-02',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-11T18:00:00Z',
  },
  {
    id: 'qf-02', round: 'qf',
    homeTeam: 'W R16-03', awayTeam: 'W R16-04',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-11T21:00:00Z',
  },
  {
    id: 'qf-03', round: 'qf',
    homeTeam: 'W R16-05', awayTeam: 'W R16-06',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-12T18:00:00Z',
  },
  {
    id: 'qf-04', round: 'qf',
    homeTeam: 'W R16-07', awayTeam: 'W R16-08',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-12T21:00:00Z',
  },

  // ── Semi Finals (2 matches / July 14–15) ─────────────────────────
  {
    id: 'sf-01', round: 'sf',
    homeTeam: 'W QF-01', awayTeam: 'W QF-02',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-14T21:00:00Z',
  },
  {
    id: 'sf-02', round: 'sf',
    homeTeam: 'W QF-03', awayTeam: 'W QF-04',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-15T21:00:00Z',
  },

  // ── Final (July 19, MetLife Stadium) ─────────────────────────────
  {
    id: 'final-01', round: 'final',
    homeTeam: 'W SF-01', awayTeam: 'W SF-02',
    homeTeamId: null, awayTeamId: null, winnerId: null,
    homeScore: null, awayScore: null,
    status: 'SCHEDULED', kickoff: '2026-07-19T20:00:00Z',
  },
]
