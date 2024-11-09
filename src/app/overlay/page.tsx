// app/overlay/page.tsx
'use client'

import { useCallback, useEffect, useState } from 'react'

import styles from './styles.module.scss'

// app/overlay/page.tsx

export default function OverlayPage() {
  const [message, setMessage] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  const connectWebSocket = useCallback(() => {
    console.log('Attempting to connect to WebSocket...')
    const ws = new WebSocket('ws://localhost:3001')

    ws.onopen = () => {
      console.log('Successfully connected to WebSocket')
      setIsConnected(true)
    }

    ws.onmessage = event => {
      try {
        const data = JSON.parse(event.data)
        setMessage(data.message)
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
      console.log('WebSocket connection closed. Attempting to reconnect...')
      setIsConnected(false)
      // Try to reconnect after 3 seconds
      setTimeout(() => {
        connectWebSocket()
      }, 3000)
    }

    return ws
  }, [])

  useEffect(() => {
    // First, check if the WebSocket server is running
    fetch('/api/socket')
      .then(response => response.json())
      .then(() => {
        const ws = connectWebSocket()
        return () => {
          ws.close()
        }
      })
      .catch(error => {
        console.error('Error checking WebSocket server:', error)
      })
  }, [connectWebSocket])

  if (!isVisible || !message) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.alert}>
        <p>{message}</p>
      </div>
      {!isConnected && <div className={styles.connectionError}>Reconnecting to server...</div>}
    </div>
  )
}
