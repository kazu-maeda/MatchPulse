import { useState, useEffect } from 'react'
import { MatchCard }  from '../components/MatchCard'
import { useMatches } from '../hooks/useMatches'
import { getMatchDates, getMatchesByDate } from '../data/matches'

function formatDateLabel(dateStr) {
  return new Date(dateStr + 'T00:00:00+09:00').toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short',
  })
}

export function Matches() {
  const { matches, loading, error, source } = useMatches()
  const [view, setView]               = useState('schedule')
  const [selectedDate, setSelectedDate] = useState('')

  // スケジュール用
  const scheduleDates = getMatchDates(matches.filter(m => m.status !== 'FINISHED'))

  useEffect(() => {
    if (scheduleDates.length > 0) {
      setSelectedDate(prev =>
        scheduleDates.includes(prev) ? prev : scheduleDates[0]
      )
    }
  }, [matches])

  const selectedMatches = selectedDate
    ? getMatchesByDate(selectedDate, matches.filter(m => m.status !== 'FINISHED'))
    : []

  // 結果用
  const finishedMatches = matches.filter(m => m.status === 'FINISHED')
  const resultDates     = getMatchDates(finishedMatches).reverse()

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-header__title">試合スケジュール</h1>
        <p className="page-header__sub">
          {loading ? '取得中...' : `${matches.length} 試合`}
        </p>
      </header>

      {/* ── デバッグ表示（開発時のみ） ── */}
      {import.meta.env.DEV && <div style={{
        margin: '0 16px 8px',
        padding: '8px 12px',
        background: source === 'api' ? 'rgba(0,200,100,0.08)' : 'rgba(255,160,0,0.08)',
        border: `1px solid ${source === 'api' ? 'rgba(0,200,100,0.3)' : 'rgba(255,160,0,0.3)'}`,
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '0.65rem',
        lineHeight: 1.6,
      }}>
        <div style={{ color: source === 'api' ? '#00c864' : '#ffa000', fontWeight: 700 }}>
          source: {source}
        </div>
        <div style={{ color: '#888' }}>matches: {matches.length}</div>
        <div style={{ color: '#888' }}>finished: {finishedMatches.length}</div>
        <div style={{ color: '#888' }}>loading: {String(loading)}</div>
        {error && <div style={{ color: '#f44' }}>error: {error}</div>}
      </div>}

      {/* ビュー切替タブ */}
      <div className="date-tabs">
        <div className="date-tabs__inner">
          <button
            className={`date-tab${view === 'schedule' ? ' date-tab--active' : ''}`}
            onClick={() => setView('schedule')}
          >
            スケジュール
          </button>
          <button
            className={`date-tab${view === 'results' ? ' date-tab--active' : ''}`}
            onClick={() => setView('results')}
          >
            試合結果
            {finishedMatches.length > 0 && (
              <span style={{ marginLeft: '4px', fontSize: '0.6rem', opacity: 0.7 }}>
                ({finishedMatches.length})
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── スケジュール ── */}
      {view === 'schedule' && (
        <>
          {/* 日付タブ */}
          <div className="date-tabs">
            <div className="date-tabs__inner">
              {scheduleDates.map(date => (
                <button
                  key={date}
                  className={`date-tab${date === selectedDate ? ' date-tab--active' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="date-tab__month">
                    {new Date(date + 'T00:00:00+09:00')
                      .toLocaleDateString('ja-JP', { month: 'numeric' })}
                  </span>
                  <span className="date-tab__day">
                    {new Date(date + 'T00:00:00+09:00')
                      .toLocaleDateString('ja-JP', { day: 'numeric' })}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <section className="section-pad" style={{ paddingTop: 'var(--sp-5)' }}>
            {selectedDate && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-mid)', marginBottom: '12px' }}>
                {formatDateLabel(selectedDate)}
              </p>
            )}
            <div className="match-list">
              {selectedMatches.length > 0
                ? selectedMatches.map(m => <MatchCard key={m.id} match={m} />)
                : <p className="empty-state">この日の試合はありません</p>
              }
            </div>
          </section>
        </>
      )}

      {/* ── 試合結果 ── */}
      {view === 'results' && (
        <section className="section-pad" style={{ paddingTop: 'var(--sp-5)' }}>
          {resultDates.length === 0 ? (
            <p className="empty-state">まだ終了した試合はありません</p>
          ) : (
            resultDates.map(date => (
              <div key={date} style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-mid)', marginBottom: '12px' }}>
                  {formatDateLabel(date)}
                </p>
                <div className="match-list">
                  {getMatchesByDate(date, finishedMatches).map(m => (
                    <MatchCard key={m.id} match={m} />
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      )}
    </div>
  )
}
