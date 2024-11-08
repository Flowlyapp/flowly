'use client'

import { PropsWithChildren, useEffect } from 'react'

import cn from 'classnames'

import { useTelegramPlatform, useTelegramTheme } from '../../data/telegram'
import styles from './Layout.module.scss'

const Layout = ({ children }: PropsWithChildren) => {
  const { data: platform } = useTelegramPlatform()
  const { data: theme } = useTelegramTheme()

  useEffect(() => {
    if (platform) {
      document.body.classList.add(`${platform}Platform`)
    }

    if (theme) {
      document.body.classList.add(`${theme}Theme`)
    }
  }, [platform, theme])

  return (
    <div className={cn(styles.layout, styles[`${platform}Layout`])}>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout
