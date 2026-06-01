import { useInstallPrompt } from '../hooks/useInstallPrompt'

export function InstallBanner() {
  const { isInstallable, install } = useInstallPrompt()
  if (!isInstallable) return null

  return (
    <div className="install-banner">
      <div className="install-banner__left">
        <img src="/icons/icon-192.png" alt="" className="install-banner__icon" aria-hidden="true" />
        <div>
          <p className="install-banner__title">MatchPulse</p>
          <p className="install-banner__sub">ホーム画面に追加できます</p>
        </div>
      </div>
      <button className="install-banner__btn" onClick={install}>
        インストール
      </button>
    </div>
  )
}
