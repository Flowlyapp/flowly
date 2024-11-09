// app/donations/page.tsx
'use client'

import { useState } from 'react'

import styles from './styles.module.scss'

// app/donations/page.tsx

export default function DonationsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleDonate = async () => {
    setIsLoading(true)
    try {
      await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'Hello World' }),
      })
    } catch (error) {
      console.error('Error sending donation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <button onClick={handleDonate} disabled={isLoading} className={styles.donateButton}>
        {isLoading ? 'Sending...' : 'Donate'}
      </button>
    </div>
  )
}
