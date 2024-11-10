// app/api/socket/route.ts
import { NextResponse } from 'next/server'

export async function GET() {  
  return NextResponse.json({ status: 'WebSocket server is running' })
}
