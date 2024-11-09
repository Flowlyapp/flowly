import { useCallback } from 'react';

const useTelegramWebApp = () => {
  // Checking if Telegram WebApp API is available
  const isTelegramWebAppAvailable = typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp;

  // Function for opening an invoice
  const openInvoice = useCallback(
    (invoiceLink: string, callback: (status: string, url?: string) => void) => {
      if (isTelegramWebAppAvailable) {
        window.Telegram.WebApp.openInvoice(invoiceLink, callback);
      } else {
        console.warn('Telegram WebApp API is not available.');
      }
    },
    [isTelegramWebAppAvailable]
  );

  return { openInvoice, isTelegramWebAppAvailable };
};

export default useTelegramWebApp;