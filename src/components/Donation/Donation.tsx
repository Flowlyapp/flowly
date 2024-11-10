'use client'

import styles from './Donation.module.scss';
import { Button, Cell, Checkbox, Input, Select, Text, Textarea } from '@telegram-apps/telegram-ui';

export default function BuyMeABeer() {
  return (
    <div style={{ paddingBottom: '24px' }}>
      <Input header="Your name"  />

      <div className={styles.anonymousContainer}>
        <Text weight="3">Anonymous?</Text>
        <Checkbox />
      </div>
      
      <div className={styles.donationContainer}>
        <Select>
          <option>TON</option>
          <option>Stars</option>
        </Select>
        <Input placeholder='Amount' />
      </div>
      
      <Textarea header="Message" placeholder="Text max 240 characters" />

      <div className={styles.donationContainer}>
        <Button className={styles.donateButton} stretched> DONATE</Button> 
      </div> 
    </div>
  );
}
