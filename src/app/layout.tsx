import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import localFont from 'next/font/local'

import Layout from '../components/Layout/Layout'
import '../styles/globals.scss'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'TOS',
  description: 'Telegram Streaming and donation platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
        <ClarityAnalytics />
      </body>
    </html>
  )
}
