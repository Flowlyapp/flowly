// app/api/donate/route.ts
import { NextResponse } from 'next/server'

import { Donation } from '@/types/donations'

import { broadcastToClients } from '../../lib/socket'

function validateDonation(donation: Donation): boolean {
  try {
    switch (donation.type) {
      case 'crypto':
        return (
          typeof donation.donator === 'string' &&
          donation.donator.length > 0 &&
          typeof donation.message === 'string' &&
          typeof donation.currency === 'string' &&
          typeof donation.amount === 'number' &&
          donation.amount > 0
        )

      case 'stars':
        return (
          typeof donation.donator === 'string' &&
          donation.donator.length > 0 &&
          typeof donation.message === 'string' &&
          typeof donation.starsAmount === 'number' &&
          donation.starsAmount > 0
        )

      case 'gift':
        return (
          typeof donation.donator === 'string' &&
          donation.donator.length > 0 &&
          typeof donation.message === 'string' &&
          typeof donation.giftImage === 'string' &&
          typeof donation.giftTitle === 'string' &&
          typeof donation.starsValue === 'number' &&
          donation.starsValue > 0
        )

      case 'subscription':
        return typeof donation.donator === 'string' && donation.donator.length > 0

      default:
        return false
    }
  } catch {
    return false
  }
}

function formatDonationMessage(donation: Donation) {
  const baseData = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    type: donation.type,
  }

  switch (donation.type) {
    case 'crypto':
      return {
        ...baseData,
        donator: donation.donator,
        message: donation.message,
        currency: donation.currency,
        amount: donation.amount,
      }

    case 'stars':
      return {
        ...baseData,
        donator: donation.donator,
        message: donation.message,
        starsAmount: donation.starsAmount,
      }

    case 'gift':
      return {
        ...baseData,
        donator: donation.donator,
        message: donation.message,
        giftImage: donation.giftImage,
        giftTitle: donation.giftTitle,
        starsValue: donation.starsValue,
      }

    case 'subscription':
      return {
        ...baseData,
        donator: donation.donator,
      }
  }
}

export async function POST(req: Request) {
  try {
    const donation = (await req.json()) as Donation

    // Validate the donation data
    if (!validateDonation(donation)) {
      return NextResponse.json({ error: 'Invalid donation data' }, { status: 400 })
    }

    // Format the message for WebSocket broadcast
    const formattedMessage = formatDonationMessage(donation)

    // Broadcast the formatted message
    broadcastToClients(JSON.stringify(formattedMessage))

    // Log the donation (you could also save to a database here)
    console.log(`New ${donation.type} received:`, formattedMessage)

    return NextResponse.json({
      success: true,
      message: `${donation.type} processed successfully`,
    })
  } catch (error) {
    console.error('Error processing donation:', error)
    return NextResponse.json({ error: 'Failed to process donation' }, { status: 500 })
  }
}

// Optional: Add GET method to get donation stats or recent donations
export async function GET() {
  return NextResponse.json({
    message: 'Donation endpoint is working',
  })
}
