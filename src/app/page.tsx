'use client'

import { Placeholder, Button, Text } from '@telegram-apps/telegram-ui';
import { useRouter } from 'next/navigation'
import TonWeb from "tonweb";
const tonweb = new TonWeb();

export default function Home() {
  const router = useRouter()
  return (
    <Placeholder
      header="Hello mini app"
      description="some description">
      <Text>
        Some Details
      </Text>
      <Button
        onClick={
          () => router.push('/transaction')
        }>
        Navigate to test page
      </Button>

      <img
        alt="Telegram sticker"
        src="https://xelene.me/telegram.gif"
        style={{ display: 'block', width: '144px', height: '144px' }}
      />
    </Placeholder>
  )
}
