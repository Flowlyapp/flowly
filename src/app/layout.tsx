import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import localFont from 'next/font/local'
import Layout from '../components/Layout/Layout'
import '../styles/globals.scss'
import Providers from './providers'
import '@telegram-apps/telegram-ui/dist/styles.css';
import { ContentWrapper } from '@/components/ContentWrapper/ContentWrapper'
import { AppRoot } from '@telegram-apps/telegram-ui';
import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
} from '@telegram-apps/sdk-react';
import Script from 'next/script'

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

function init(debug: boolean): void {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug);

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
  // Also, configure the package.
  initSDK();

  // Mount all components used in the project.
  backButton.isSupported() && backButton.mount();
  miniApp.mount();
  themeParams.mount();
  initData.restore();
  void viewport.mount().catch(e => {
    console.error('Something went wrong mounting the viewport', e);
  });

  // Define components-related CSS variables.
  viewport.bindCssVars();
  miniApp.bindCssVars();
  themeParams.bindCssVars();

  // Add Eruda if needed.
  debug && import('eruda')
    .then((lib) => lib.default.init())
    .catch(console.error);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive"/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRoot>
          {children}
        </AppRoot>
      </body>
    </html>
  )
}
