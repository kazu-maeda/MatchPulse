import { useState, useEffect } from 'react'

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null)
      return
    }

    const target = new Date(targetDate).getTime()

    const calc = () => {
      const diff = target - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false,
      })
    }

    calc()
    const timer = setInterval(calc, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}
