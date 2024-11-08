'use client'

import { FC, PropsWithChildren } from 'react'

import styles from './ContentWrapper.module.scss'

export const ContentWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}
