import { useState, useEffect } from 'react'

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    // すでにスタンドアロン（インストール済み）なら非表示
    if (window.matchMedia('(display-mode: standalone)').matches) return

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const install = async () => {
    if (!deferredPrompt) return false
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setIsInstallable(false)
    return outcome === 'accepted'
  }

  return { isInstallable, install }
}
