'use client'

import { useState } from 'react';
import styles from './Donation.module.scss';
import { Button, Cell, Checkbox, Input, Select, Text, Textarea } from '@telegram-apps/telegram-ui';
import useTelegramWebApp from '../../app/hooks/useTelegramWebApp';

export default function BuyMeABeer() {
  const [selectedOption, setSelectedOption] = useState('TON');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const resetForm = () => {
    setAmount('');
    setName('');
    setMessage('');
    setIsAnonymous(false);
    setSelectedOption('TON');
    setIsWalletConnected(false);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const { openInvoice } = useTelegramWebApp();

  const getInvoiceLink = async (amount: string) => {
    const response = await fetch('/api/stars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ 'amount': amount }),
    });
    const invoiceLink = await response.json();
    console.log('invoicedLink', invoiceLink)
    return invoiceLink;
  };

  const handleOpenInvoice = async () => {
    const getInvoiceLinkResult = await getInvoiceLink(amount);
    if (getInvoiceLinkResult.success) {
      const invoiceLink = getInvoiceLinkResult.data;
      openInvoice(invoiceLink, async (status, url) => {
        if(status === 'paid') {
          await displayMessage();
        }
        console.log(`Invoice Status: ${status}, Invoice URL: ${url}`);
      });
    }
  };

  const handleDonateClick = () => {
    if (selectedOption === 'TON') {
      if (isWalletConnected) {
        // Logic for TON payment
        console.log('TON payment initiated');
      } else {
        // Logic to connect wallet
        console.log('Connecting wallet...');
        setIsWalletConnected(true); // Simulate wallet connection
      }
    } else if (selectedOption === 'Stars') {
      // Logic for Stars payment
      //displayMessage();
      handleOpenInvoice();
    }
  };

  return (
    <div style={{ paddingBottom: '24px' }}>
      <Input 
        header="Your name" 
        value={name}
        onChange={handleNameChange}
      />

      <div className={styles.anonymousContainer}>
        <Text weight="3">Anonymous?</Text>
        <Checkbox 
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
        />
      </div>

      <div className={styles.donationContainer}>
        <Select onChange={handleOptionChange} value={selectedOption}>
          <option value="TON">TON</option>
          <option value="Stars">Stars</option>
        </Select>
        <Input placeholder='Amount' value={amount} onChange={handleAmountChange} />
      </div>

      {selectedOption === 'TON' && !isWalletConnected && (
        <Button onClick={() => setIsWalletConnected(true)}>Connect Wallet</Button>
      )}

      <Textarea 
        header="Message" 
        placeholder="Text max 240 characters" 
        value={message}
        onChange={handleMessageChange}
      />

      <div className={styles.donationContainer}>
        <Button
          className={styles.donateButton}
          stretched
          onClick={handleDonateClick}
          disabled={selectedOption === 'TON' && !isWalletConnected}
        >
          DONATE
        </Button>
      </div>
    </div>
  );

  async function displayMessage() {
    const donationData = {
      type: 'stars' as const,
      donator: isAnonymous ? 'Anonymous' : name,
      message: message,
      starsAmount: parseInt(amount, 10)
    };

    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        throw new Error('Failed to process donation');
      }

      const result = await response.json();
      console.log('Donation processed:', result);
      resetForm(); // Reset form after successful donation
    } catch (error) {
      console.error('Error processing donation:', error);
    }
  }
}
