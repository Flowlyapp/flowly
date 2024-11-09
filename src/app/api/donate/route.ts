import { NextResponse } from 'next/server'

import { broadcastToClients } from '../socket/route'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Broadcast the message to all WebSocket clients
    broadcastToClients(JSON.stringify(body))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error broadcasting message:', error)
    return NextResponse.json({ error: 'Failed to broadcast message' }, { status: 500 })
  }
}
