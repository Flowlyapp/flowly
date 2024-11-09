// app/api/socket/route.ts
import { NextResponse } from 'next/server'
import { WebSocket, WebSocketServer } from 'ws'

// Create WebSocket server as a global variable
declare global {
  var wss: WebSocketServer | undefined
}

if (!global.wss) {
  console.log('Initializing WebSocket Server...')
  global.wss = new WebSocketServer({ port: 3001 })

  global.wss.on('connection', ws => {
    console.log('Client connected to WebSocket')

    ws.on('error', error => {
      console.error('WebSocket error:', error)
    })

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket')
    })
  })
}

export function broadcastToClients(message: string) {
  if (!global.wss) return

  global.wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  })
}

export async function GET() {
  return NextResponse.json({ status: 'WebSocket server is running' })
}
