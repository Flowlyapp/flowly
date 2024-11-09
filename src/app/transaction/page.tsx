'use client'

import styles from './transaction.module.css';
import { Placeholder, Text, Input, type InputProps, Button, List } from '@telegram-apps/telegram-ui';
import { THEME, TonConnectUIProvider, TonConnectButton, useTonConnectUI, useTonWallet, SendTransactionRequest } from "@tonconnect/ui-react";
import React, { useState } from 'react';

export default function Transaction() {
  return <TonConnectUIProvider
    manifestUrl="https://mr-procrastinator.github.io/hivebits-nft-store/tonconnect-manifest.json"
    uiPreferences={{ theme: THEME.DARK }}
    walletsListConfiguration={{
      includeWallets: [
        {
          appName: "tonwallet",
          name: "TON Wallet",
          imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
          aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
          universalLink: "https://wallet.ton.org/ton-connect",
          jsBridgeKey: "tonwallet",
          bridgeUrl: "https://bridge.tonapi.io/bridge",
          platforms: ["chrome", "android"]
        }
      ]
    }}
  >
    <ContentPayload />
  </TonConnectUIProvider>
}

export const ContentPayload = () => {
  return <List>
    <Placeholder
      header="Transaction"
      description="Transaction screen">
      <TonConnectButton />
    </Placeholder>
    <TransactionPayload />
  </List>
}

export const TransactionPayload = () => {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const handleAddressChange: InputProps['onChange'] = (event) => {
    setAddress(event?.target?.value);
  };
  const handleAmountChange: InputProps['onChange'] = (event) => {
    let value = event?.target?.value
    if (/^\d*[\.,]?\d*$/.test(value)) {
      setAmount(value.replace(',', '.'));
    }
  };
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();

  const transferPayload: SendTransactionRequest = {
    validUntil: Math.floor(Date.now() / 1000) + 600,
    messages: [
      {
        address: address,
        amount: amount,
        stateInit: 'te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==',
        payload: 'te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g==',
      },
    ],
  };

  return (
    <div>
      <List className={styles.list}>
        <Input header="Amount" placeholder="Amount in nanoTON" onChange={handleAmountChange} value={amount} />
        <Input header="Wallet" placeholder="Enter wallet to transfer" onChange={handleAddressChange} />
        {wallet ? (
          <Button className={styles.button} onClick={() => tonConnectUi.sendTransaction(transferPayload)}>
            Send transaction
          </Button>
        ) : (
          <Button className={styles.button} onClick={() => tonConnectUi.openModal()}>
            Connect wallet to send the transaction
          </Button>
        )}
      </List>
      <Placeholder>
        <pre style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          maxWidth: '100%',
          overflowX: 'auto',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f8f8f8'
        }}>
          {JSON.stringify(transferPayload, null, 2)}
        </pre>
      </Placeholder>
    </div>
  )
}