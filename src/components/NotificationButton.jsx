import { useState } from 'react'

export function NotificationButton({ match }) {
  const [permission, setPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  )
  const [scheduled, setScheduled] = useState(false)

  const handleClick = async () => {
    if (!('Notification' in window)) {
      alert('このブラウザは通知をサポートしていません。')
      return
    }
    if (permission === 'denied') {
      alert('通知がブロックされています。ブラウザの設定から許可してください。')
      return
    }
    if (permission !== 'granted') {
      const result = await Notification.requestPermission()
      setPermission(result)
      if (result !== 'granted') return
    }
    setScheduled(true)
    new Notification('MatchPulse', {
      body: `まもなく ${match.homeTeam} vs ${match.awayTeam} が始まります！`,
      icon: '/logo.svg',
    })
  }

  if (scheduled) {
    return (
      <button className="notif-btn notif-btn--scheduled" disabled>
        <span>🔔</span> 通知をセットしました
      </button>
    )
  }

  return (
    <button className="notif-btn" onClick={handleClick}>
      <span>🔔</span> キックオフ10分前に通知
    </button>
  )
}
