import { UseQueryResult, useQuery } from '@tanstack/react-query'

export interface TelegramUser {
  id: number
  username: string
  last_name: string
  first_name: string
  is_premium: boolean
  language_code: string
  allows_write_to_pm: boolean
}

export type TelegramPlatform = 'web' | 'android' | 'ios'
export type TelegramTheme = 'light' | 'dark'

export const useTelegramPlatform = (): UseQueryResult<TelegramPlatform> => {
  return useQuery({
    queryKey: ['platform'],
    queryFn: () => window?.Telegram?.WebApp.platform ?? 'web',
  })
}

export const useTelegramTheme = (): UseQueryResult<TelegramTheme> => {
  return useQuery({
    queryKey: ['telegramTheme'],
    queryFn: () =>
      window?.Telegram?.WebApp.colorScheme ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  })
}

export const useUnsafeTelegramUser = (): UseQueryResult<TelegramUser | undefined> => {
  return useQuery({
    queryKey: ['unsafeTelegramUser'],
    queryFn: () => window?.Telegram?.WebApp.initDataUnsafe.user,
  })
}
