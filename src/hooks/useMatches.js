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

const DEV = import.meta.env.DEV

export function useMatches() {
  const [matches, setMatches] = useState(() => _cache ?? MATCHES)
  const [loading, setLoading] = useState(!_cache)
  const [error,   setError]   = useState(null)
  const [source,  setSource]  = useState(_cache ? 'api' : 'dummy')

  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true

    if (_cache) {
      DEV && console.log('[useMatches] cache hit →', _cache.length, 'matches')
      setMatches(_cache)
      setSource('api')
      setLoading(false)
      return
    }

    if (!_pending) {
      DEV && console.log('[useMatches] fetching API...')
      _pending = fetchWcMatches()
        .then(data => {
          _cache = data
          DEV && console.log('[useMatches] fetched →', data.length, 'matches cached')
          return data
        })
        .catch(err => {
          _pending = null
          throw err
        })
    } else {
      DEV && console.log('[useMatches] joining in-flight fetch')
    }

    setLoading(true)

    _pending
      .then(data => {
        if (!mountedRef.current) return
        setMatches(data)
        setSource('api')
        setError(null)
      })
      .catch(err => {
        if (!mountedRef.current) return
        console.warn('[useMatches] fetch failed, falling back to dummy:', err.message)
        setError(err.message)
        setMatches(MATCHES)
        setSource('dummy')
      })
      .finally(() => {
        if (mountedRef.current) setLoading(false)
      })

    return () => { mountedRef.current = false }
  }, [])

  return { matches, loading, error, source }
}
