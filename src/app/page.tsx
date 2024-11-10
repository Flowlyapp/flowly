'use client'

import { Placeholder, Button, Text, Avatar, Tabbar, List, Section, Cell, IconContainer, Input } from '@telegram-apps/telegram-ui';
import { useRouter } from 'next/navigation'
import TonWeb from "tonweb";
const tonweb = new TonWeb();
import styles from './page.module.scss';


import React, { useState } from 'react';
import BuyMeABeer from '@/components/Donation/Donation';

// Define types for tab items and component props
interface Tab {
    id: number;
    text: string;
    icon: string;
}

interface DefaultProps {}

const Default: React.FC<DefaultProps> = (_props) => {
    const tabs: Tab[] = [
        { id: 1, text: "Support", icon: '/images/settings-payment.svg' },
        { id: 2, text: "Stram", icon: "/images/settings-link.svg" }
    ];

    function getTabContent(tab: number) {
        switch (tab) {
            case 1: return <SupportScreen />;
            case 2: return <Placeholder>
                <Text>Stream content will appear here</Text>
            </Placeholder>;
            default: return null;
        }
    }

    const [currentTab, setCurrentTab] = useState<number>(tabs[0].id);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
           <div style={{ paddingBottom: '96px' }}>
            {getTabContent(currentTab)}
           </div>
         
            <Tabbar>
                {tabs.map(({ id, text, icon }) => (
                    <Tabbar.Item
                        key={id}
                        text={text}
                        selected={id === currentTab}
                        onClick={() => setCurrentTab(id)}
                    >
                        <img src={icon} alt={text} />
                    </Tabbar.Item>
                ))}
            </Tabbar>
        </div>
    );
};


const SupportHeaderScreen: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.profileImageContainer}>
        <Avatar
        fallbackIcon={<span>😕</span>}
        size={96}
        src="/images/streamer.png"
        className={styles.profileImage}
        />
          <div className={styles.liveBadge}>LIVE</div>
        </div>
        <h2 className={styles.username}>Melissa2000</h2>
        <p className={styles.description}>Everything about crypto in one place</p>
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
  );
};

const SupportScreen: React.FC = () => {
  return (
    <List
  style={{
    background: 'var(--tgui--secondary_bg_color)',
  }}
>
  <Section
  >
   <SupportHeaderScreen></SupportHeaderScreen>
  </Section>
  <Section
    header="Donate">
    <BuyMeABeer/>
  </Section>
  <Section
    header="Donate">
    <BuyMeABeer/>
  </Section>
</List>
  );
};

export default function Home() {
  const router = useRouter()
  return (
      <Default />
  )
}
