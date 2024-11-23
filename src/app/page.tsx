'use client'

import React, { useState } from 'react'

import {
  Button,
  Cell,
  IconContainer,
  Input,
  List,
  Placeholder,
  Section,
  Tabbar,
  Text,
} from '@telegram-apps/telegram-ui'
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import TonWeb from 'tonweb'

import BuyMeABeer from '@/components/Donation/Donation'

// Define types for tab items and component props
interface Tab {
  id: number
  text: string
  icon: string
}

const Avatar = dynamic(() => import('@telegram-apps/telegram-ui').then((mod: any) => mod.Avatar), {
  ssr: false, // Optional: Disable Server-Side Rendering for this component if necessary
})

interface DefaultProps {}

const Default: React.FC<DefaultProps> = _props => {
  const tabs: Tab[] = [
    { id: 1, text: 'Profile', icon: '/images/person_24.svg' },
    { id: 2, text: 'Live', icon: '/images/channel_24.svg' },
  ]

  function getTabContent(tab: number) {
    switch (tab) {
      case 1:
        return <SupportScreen />
      case 2:
        return (
          <div>
            <img src="/images/live.png" alt="Live Stream" className={styles.liveImage} />
          </div>
        )
      default:
        return null
    }
  }

  const [currentTab, setCurrentTab] = useState<number>(tabs[0].id)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ paddingBottom: '96px' }}>{getTabContent(currentTab)}</div>

      <Tabbar>
        {tabs.map(({ id, text, icon }) => (
          <Tabbar.Item key={id} text={text} selected={id === currentTab} onClick={() => setCurrentTab(id)}>
            <img src={icon} alt={text} />
          </Tabbar.Item>
        ))}
      </Tabbar>
    </div>
  )
}

const imageUrl =
  'https://raw.githubusercontent.com/mr-procrastinator/data2/refs/heads/main/88a3789df6ea0e263f51544a80fe305f.png'
const SupportHeaderScreen: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.profileImageContainer}>
          <Avatar size={96} src={imageUrl} className={styles.profileImage} />
          <div className={styles.liveBadge}>LIVE</div>
        </div>
        <h2 className={styles.username}>Tea Farm</h2>
        <p className={styles.description}>Hey Tea Farmer. Welcome to the club.</p>
      </div>
      <div className={styles.tier}>
        <span className={styles.tierName}>Thanks</span>
        <span className={styles.price}>10 USDT/month</span>
      </div>
      <div className={styles.tier}>
        <span className={styles.tierName}>Respect</span>
        <span className={styles.price}>50 USDT/month</span>
      </div>
      <div className={`${styles.tier} ${styles.selectedTier}`}>
        <span className={styles.tierName}>Honour</span>
        <span className={styles.price}>100 USDT/month</span>
      </div>
    </div>
  )
}

const SupportScreen: React.FC = () => {
  return (
    <List
      style={{
        background: 'var(--tgui--secondary_bg_color)',
      }}
    >
      <Section style={{ paddingBottom: '8px' }}>
        <SupportHeaderScreen></SupportHeaderScreen>
      </Section>
      <Section style={{ paddingBottom: '8px' }} header="Donate">
        <BuyMeABeer />
      </Section>
      <Section header="Gifts">
        <img src="/images/gift_group2.png" alt="Gift Group" className={styles.giftImage} />
      </Section>
    </List>
  )
}

export default function Home() {
  const router = useRouter()
  return (
    <TonConnectUIProvider
      manifestUrl="https://gist.githubusercontent.com/mr-procrastinator/19827a4d182ab83dccd1d9035cec99bd/raw/8f49aad837f23a7ce902f1cd2b5e44326c63ed8c/flowly.json"
      uiPreferences={{ theme: THEME.DARK }}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: 'tonwallet',
            name: 'TON Wallet',
            imageUrl: 'https://wallet.ton.org/assets/ui/qr-logo.png',
            aboutUrl: 'https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd',
            universalLink: 'https://wallet.ton.org/ton-connect',
            jsBridgeKey: 'tonwallet',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['chrome', 'android'],
          },
        ],
      }}
    >
      <Default />
    </TonConnectUIProvider>
  )
}
