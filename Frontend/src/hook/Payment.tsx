import { useState } from 'react';
import axios from 'axios';
import { useLoading } from '../context/Loading';

export const usePayment = () => {
  const { loading, setLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (amount: number, orderInfo: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/payment/momo', {
        orderInfo,
        amount, // Dynamic amount based on input
      });
      
      const { payUrl } = response.data; // Assuming payUrl is returned in the response
      window.location.href = payUrl; // Redirect to payment page
    } catch (error: any) {
      setError('Payment error occurred. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return { handlePayment, loading, error };
};
