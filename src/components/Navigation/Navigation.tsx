'use client'

import { FC } from 'react'

import cn from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ContentWrapper } from '../ContentWrapper/ContentWrapper'
import styles from './Navigation.module.scss'

const Navigation: FC = () => {
  const currentPath = usePathname()
  console.log('🚀 ~ currentPath:', currentPath)

  const links = [
    {
      href: '/',
      label: 'Home',
    },
  ]

  return (
    <nav className={styles.nav}>
      <ContentWrapper>
        <ul className={styles.list}>
          {links.map((link, index) => (
            <li className={styles.item} key={index}>
              <Link href={link.href} className={cn(styles.link, { [styles.current]: link.href === currentPath })}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </ContentWrapper>
    </nav>
  )
}

export default Navigation
