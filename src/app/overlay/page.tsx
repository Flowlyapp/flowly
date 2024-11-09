// app/overlay/page.tsx
'use client'

import { useCallback, useEffect, useState } from 'react'

import { Donation } from '@/types/donations'

import styles from './styles.module.scss'

// app/overlay/page.tsx

interface AlertData extends Donation {
  id: string
  timestamp: string
}

export default function OverlayPage() {
  const [alert, setAlert] = useState<AlertData | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket('ws://localhost:3001')

    ws.onopen = () => {
      console.log('Connected to WebSocket')
      setIsConnected(true)
    }

    ws.onmessage = event => {
      try {
        const data = JSON.parse(event.data) as AlertData
        setAlert(data)
        setIsVisible(true)

        setTimeout(() => {
          setIsVisible(false)
        }, 5000)
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    ws.onerror = error => {
      console.error('WebSocket error:', error)
      setIsConnected(false)
    }

    ws.onclose = () => {
      console.log('WebSocket closed. Attempting to reconnect...')
      setIsConnected(false)
      setTimeout(connectWebSocket, 3000)
    }

    return ws
  }, [])

  useEffect(() => {
    const ws = connectWebSocket()
    return () => ws.close()
  }, [connectWebSocket])

  if (!isVisible || !alert) return null

  const renderAlert = () => {
    const baseClasses = `${styles.alert} ${isVisible ? styles.visible : ''}`

    switch (alert.type) {
      case 'crypto':
        return (
          <div className={`${baseClasses} ${styles.cryptoAlert}`}>
            <div className={styles.cryptoIcon}>💎</div>
            <div className={styles.content}>
              <h2 className={styles.title}>{alert.donator}</h2>
              <div className={styles.amount}>
                {alert.amount} {alert.currency}
              </div>
              <p className={styles.message}>{alert.message}</p>
            </div>
          </div>
        )

      case 'stars':
        return (
          <div className={`${baseClasses} ${styles.starsAlert}`}>
            <div className={styles.starsIcon}>⭐</div>
            <div className={styles.content}>
              <h2 className={styles.title}>{alert.donator}</h2>
              <div className={styles.amount}>{alert.starsAmount} stars</div>
              <p className={styles.message}>{alert.message}</p>
            </div>
          </div>
        )

      case 'gift':
        return (
          <div className={`${baseClasses} ${styles.giftAlert}`}>
            <div className={styles.giftIcon}>{alert.giftImage}</div>
            <div className={styles.content}>
              <h2 className={styles.title}>{alert.donator}</h2>
              <div className={styles.giftInfo}>
                {alert.giftTitle} ({alert.starsValue} stars)
              </div>
              <p className={styles.message}>{alert.message}</p>
            </div>
          </div>
        )

      case 'subscription':
        return (
          <div className={`${baseClasses} ${styles.subscriptionAlert}`}>
            <div className={styles.subscriptionIcon}>🌟</div>
            <div className={styles.content}>
              <h2 className={styles.title}>{alert.donator}</h2>
              <div className={styles.subscriptionMessage}>New Subscriber!</div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={styles.overlay}>
      {renderAlert()}
      {!isConnected && <div className={styles.connectionError}>Reconnecting to server...</div>}
    </div>
  )
}
