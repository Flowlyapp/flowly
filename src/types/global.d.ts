// src/types/global.d.ts

// Add this interface before declare global
interface ClarityGlobal {
  (command: string, ...args: any[]): void
  q?: any[]
}

declare global {
  interface Window {
    appConfig: AppConfig
    Telegram?: {
      WebApp: {
        platform: 'web' | 'android' | 'ios'
        colorScheme: 'light' | 'dark'
        initDataUnsafe: {
          user: {
            id: number
            username: string
            last_name: string
            first_name: string
            is_premium: boolean
            language_code: string
            allows_write_to_pm: boolean
          }
        }
        BackButton: {
          show: () => void
          hide: () => void
          onClick: (callback: () => void) => void
        }
      }
    }
    clarity: ClarityGlobal
    clarityCustomEvents?: {
      track: (eventName: string, metadata?: Record<string, any>) => void
    }
  }
}

// Add this export statement at the end
export {}
