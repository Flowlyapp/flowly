'use client'

import { ContentWrapper } from '@/components/ContentWrapper/ContentWrapper'
import { AppRoot, Placeholder } from '@telegram-apps/telegram-ui';

export default function Home() {
  return (
    <ContentWrapper>
      <AppRoot>
        <Placeholder
          header="Hello mini app"
          description="some description">
          <img
            alt="Telegram sticker"
            src="https://xelene.me/telegram.gif"
            style={{ display: 'block', width: '144px', height: '144px' }}
          />
        </Placeholder>
      </AppRoot>
    </ContentWrapper>
  )
}
