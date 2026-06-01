import { useState, useEffect } from 'react'

const STORAGE_KEY = 'matchpulse_favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (teamId) => {
    setFavorites(prev =>
      prev.includes(teamId)
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    )
  }

  const isFavorite = (teamId) => favorites.includes(teamId)

  return { favorites, toggleFavorite, isFavorite }
}
