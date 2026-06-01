import { useState, useEffect, useRef } from 'react'
import { fetchWcMatches } from '../services/footballApi'
import { MATCHES } from '../data/matches'

/**
 * モジュールレベルキャッシュ（全インスタンスで共有）
 * _cache   : フェッチ済みデータ
 * _pending : 進行中フェッチ Promise（重複防止）
 */
let _cache   = null
let _pending = null

export function useMatches() {
  // キャッシュがあれば即座に API データで初期化
  const [matches, setMatches] = useState(() => _cache ?? MATCHES)
  const [loading, setLoading] = useState(!_cache)
  const [error,   setError]   = useState(null)
  const [source,  setSource]  = useState(_cache ? 'api' : 'dummy')

  // Strict Mode の二重実行でキャンセルされないよう ref で管理
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true

    console.log('[useMatches] mount | _cache:', _cache ? `${_cache.length}件` : 'null')

    // キャッシュ済みならフェッチ不要
    if (_cache) {
      console.log('[useMatches] キャッシュヒット → 即時反映', _cache.length, '件')
      setMatches(_cache)
      setSource('api')
      setLoading(false)
      return
    }

    // 未フェッチ → 開始（または進行中 Promise に合流）
    if (!_pending) {
      console.log('[useMatches] APIフェッチ開始...')
      _pending = fetchWcMatches()
        .then(data => {
          _cache = data
          console.log('[useMatches] フェッチ完了 →', data.length, '件をキャッシュ')
          return data
        })
        .catch(err => {
          _pending = null
          throw err
        })
    } else {
      console.log('[useMatches] 既存フェッチに合流')
    }

    setLoading(true)

    _pending
      .then(data => {
        if (!mountedRef.current) return
        console.log('[useMatches] setMatches →', data.length, '件')
        setMatches(data)
        setSource('api')
        setError(null)
      })
      .catch(err => {
        if (!mountedRef.current) return
        console.warn('[useMatches] フェッチ失敗 → ダミーにフォールバック:', err.message)
        setError(err.message)
        setMatches(MATCHES)
        setSource('dummy')
      })
      .finally(() => {
        if (mountedRef.current) setLoading(false)
      })

    return () => {
      mountedRef.current = false
    }
  }, [])

  return { matches, loading, error, source }
}
