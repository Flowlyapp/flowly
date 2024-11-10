import { WebSocket, WebSocketServer } from 'ws'

// Extend the global object to hold the WebSocketServer instance
declare global {
  var wss: WebSocketServer | undefined
}

// Initialize the WebSocket server only once
if (!global.wss) {
  console.log('Initializing WebSocket Server...')
  global.wss = new WebSocketServer({ port: 3001 }) // Ensure this port is free

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

/**
 * Broadcasts a message to all connected WebSocket clients.
 * @param message - The message to broadcast.
 */
export function broadcastToClients(message: string) {
  if (!global.wss) {
    console.warn('WebSocket server is not initialized.')
    return
  }

  global.wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  })
}
