'use client'

import { useState } from 'react';
import styles from './Donation.module.scss';
import { Button, Cell, Checkbox, Input, Select, Text, Textarea } from '@telegram-apps/telegram-ui';
import useTelegramWebApp from '../../app/hooks/useTelegramWebApp';
import { SendTransactionRequest, THEME, TonConnectButton, TonConnectUIProvider, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

export default function BuyMeABeer() {
  const [selectedOption, setSelectedOption] = useState('TON');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const wallet = useTonWallet()
  const [tonConnectUi] = useTonConnectUI()

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

  // Updated to handle any event type that has a target with value
  const handleMessageChange = (event: { target: { value: string } }) => {
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
          await displayMessage('stars');
        }
        console.log(`Invoice Status: ${status}, Invoice URL: ${url}`);
      });
    }
  };

  const tonToNanoton = (value: number) => {
    return value * 1000000000;
  }

  const transferPayload: SendTransactionRequest = {
    validUntil: Math.floor(Date.now() / 1000) + 600,
    messages: [
      {
        address: "0QDmv0ZPBEEhNJctsbNW-POmHso1VtOS7pxXqZ4A-rkoTLbo",
        amount: tonToNanoton(Number(amount)) + '',
      },
    ],
  }
  const handleDonateClick = async () => {
    if (selectedOption === 'TON') {
      if (wallet) {
        // Logic for TON payment
        let bloc = await tonConnectUi.sendTransaction(transferPayload)
        await displayMessage('crypto');
        console.log('TON payment initiated $', bloc);
      } else {
        // Logic to connect wallet
        console.log('Connecting wallet...');
        //setIsWalletConnected(true); // Simulate wallet connection
      }
    } else if (selectedOption === 'Stars') {
      // Logic for Stars payment
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

      {selectedOption === 'TON' && (
        <div className={styles.tonConnectContainer}>
          <TonConnectButton />
        </div>
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
          disabled={selectedOption === 'TON' && !wallet}
        >
          DONATE
        </Button>
      </div>
    </div>
  );

  async function displayMessage(type: 'crypto' | 'stars') {
    const baseData = {
      donator: isAnonymous ? 'Anonymous' : name,
      message: message,
    };

    const donationData = type === 'crypto' 
      ? {
          ...baseData,
          type: 'crypto' as const,
          currency: 'TON',
          amount: parseFloat(amount),
        }
      : {
          ...baseData,
          type: 'stars' as const,
          starsAmount: parseInt(amount, 10),
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
