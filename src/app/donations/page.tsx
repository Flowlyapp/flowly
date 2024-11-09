// app/donations/page.tsx
'use client'

import { useState } from 'react'

import { AVAILABLE_CURRENCIES, AVAILABLE_GIFTS, Donation, DonationType } from '../../types/donations'
import styles from './styles.module.scss'

// app/donations/page.tsx

export default function DonationsPage() {
  const [donationType, setDonationType] = useState<DonationType>('crypto')
  const [isLoading, setIsLoading] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    donator: '',
    message: '',
    currency: AVAILABLE_CURRENCIES[0],
    amount: '',
    starsAmount: '',
    giftId: AVAILABLE_GIFTS[0].id,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    let donationData: Donation

    switch (donationType) {
      case 'crypto':
        donationData = {
          type: 'crypto',
          donator: formData.donator,
          message: formData.message,
          currency: formData.currency,
          amount: Number(formData.amount),
        }
        break

      case 'stars':
        donationData = {
          type: 'stars',
          donator: formData.donator,
          message: formData.message,
          starsAmount: Number(formData.starsAmount),
        }
        break

      case 'gift':
        const selectedGift = AVAILABLE_GIFTS.find(gift => gift.id === formData.giftId)!
        donationData = {
          type: 'gift',
          donator: formData.donator,
          message: formData.message,
          giftImage: selectedGift.image,
          giftTitle: selectedGift.title,
          starsValue: selectedGift.starsValue,
        }
        break

      case 'subscription':
        donationData = {
          type: 'subscription',
          donator: formData.donator,
        }
        break

      default:
        return
    }

    try {
      await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      })

      // Clear form
      setFormData({
        donator: '',
        message: '',
        currency: AVAILABLE_CURRENCIES[0],
        amount: '',
        starsAmount: '',
        giftId: AVAILABLE_GIFTS[0].id,
      })
    } catch (error) {
      console.error('Error sending donation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <select
          value={donationType}
          onChange={e => setDonationType(e.target.value as DonationType)}
          className={styles.select}
        >
          <option value="crypto">Crypto Donation</option>
          <option value="stars">Stars Donation</option>
          <option value="gift">Send Gift</option>
          <option value="subscription">Subscribe</option>
        </select>

        <input
          type="text"
          name="donator"
          value={formData.donator}
          onChange={handleInputChange}
          placeholder="Your Name"
          required
          className={styles.input}
        />

        {donationType !== 'subscription' && (
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            required
            className={styles.textarea}
          />
        )}

        {donationType === 'crypto' && (
          <>
            <select name="currency" value={formData.currency} onChange={handleInputChange} className={styles.select}>
              {AVAILABLE_CURRENCIES.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              required
              min="0"
              step="0.01"
              className={styles.input}
            />
          </>
        )}

        {donationType === 'stars' && (
          <input
            type="number"
            name="starsAmount"
            value={formData.starsAmount}
            onChange={handleInputChange}
            placeholder="Stars Amount"
            required
            min="1"
            className={styles.input}
          />
        )}

        {donationType === 'gift' && (
          <select name="giftId" value={formData.giftId} onChange={handleInputChange} className={styles.select}>
            {AVAILABLE_GIFTS.map(gift => (
              <option key={gift.id} value={gift.id}>
                {gift.image} {gift.title} ({gift.starsValue} stars)
              </option>
            ))}
          </select>
        )}

        <button type="submit" disabled={isLoading} className={styles.submitButton}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
