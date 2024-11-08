import { NextRouter } from 'next/router'

export const showTelegramBackButton = (router: NextRouter, href: string) => {
  window.Telegram?.WebApp.BackButton?.show()
  window.Telegram?.WebApp.BackButton?.onClick(() => {
    void router.push(href)
  })
}

export const hideTelegramBackButton = () => {
  window.Telegram?.WebApp.BackButton.hide()
}

export const impactHapticFeedback = (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => {
  window.Telegram?.WebApp.HapticFeedback.impactOccurred(style)
}
