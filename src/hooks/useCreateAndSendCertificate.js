import { useState } from 'react';
import config from '../config.js';

function useCreateAndSendCertificate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAndSendCertificate = async ({
                                            sender,
                                            amount, email }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${config.backendUrl}/certificates/create-certificate-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          sender,
          amount, email })
      });
      if (!response.ok) throw new Error('Failed to create and send certificate');

      const data = await response.json();
      const invoiceUrl = data.invoice_url;
      window.location.href = invoiceUrl;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createAndSendCertificate, loading, error };
}

export default useCreateAndSendCertificate;