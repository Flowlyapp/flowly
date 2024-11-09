import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import localFont from 'next/font/local'
import Layout from '../components/Layout/Layout'
import '../styles/globals.scss'
import Providers from './providers'
import '@telegram-apps/telegram-ui/dist/styles.css';
import { ContentWrapper } from '@/components/ContentWrapper/ContentWrapper'
import { AppRoot } from '@telegram-apps/telegram-ui';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

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
        <AppRoot>
          {children}
        </AppRoot>
      </body>
    </html>
  )
}
