// types/donations.ts
export type DonationType = 'crypto' | 'stars' | 'gift' | 'subscription'

// Base interface for all donation types
interface BaseDonation {
  type: DonationType
  donator: string
}

// Crypto donation
export interface CryptoDonation extends BaseDonation {
  type: 'crypto'
  message: string
  currency: string
  amount: number
}

// Stars donation
export interface StarsDonation extends BaseDonation {
  type: 'stars'
  message: string
  starsAmount: number
}

// Gift donation
export interface GiftDonation extends BaseDonation {
  type: 'gift'
  message: string
  giftImage: string
  giftTitle: string
  starsValue: number
}

// Subscription
export interface Subscription extends BaseDonation {
  type: 'subscription'
}

// Union type for all donation types
export type Donation = CryptoDonation | StarsDonation | GiftDonation | Subscription

// Available gifts data
export interface Gift {
  id: string
  title: string
  image: string
  starsValue: number
}

// Predefined gifts
export const AVAILABLE_GIFTS: Gift[] = [
  {
    id: 'cake',
    title: 'Birthday Cake',
    image: '🎂',
    starsValue: 100,
  },
  {
    id: 'heart',
    title: 'Love Heart',
    image: '❤️',
    starsValue: 50,
  },
  {
    id: 'rocket',
    title: 'To The Moon',
    image: '🚀',
    starsValue: 200,
  },
]

// Available cryptocurrencies
export const AVAILABLE_CURRENCIES = ['TON', 'USDT']
