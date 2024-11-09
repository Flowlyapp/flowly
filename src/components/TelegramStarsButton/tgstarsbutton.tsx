import React from 'react';
import useTelegramWebApp from '../../app/hooks/useTelegramWebApp';
import { Button } from '@telegram-apps/telegram-ui';

const TelegramStarsButton: React.FC = () => {
  const { openInvoice } = useTelegramWebApp();

  const getInvoiceLink = async () => {
    const response = await fetch('http://localhost:3000/tg/getInvoiceLink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    const invoiceLink = await response.json();
    return invoiceLink;
  };

  const handleOpenInvoice = async () => {
    const getInvoiceLinkResult = await getInvoiceLink();
    if (getInvoiceLinkResult.success) {
      const invoiceLink = getInvoiceLinkResult.data;
      openInvoice(invoiceLink, (status, url) => {
        // URL and status handling after invoice opening
        console.log(`Invoice Status: ${status}, Invoice URL: ${url}`);
      });
    }
  };

  return (
    <Button onClick={handleOpenInvoice}>
      Pay via Telegram Stars
    </Button>
  );
};

export default TelegramStarsButton;