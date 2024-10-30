import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface PaymentFormProps {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  totalPayment: number; // Nhận tổng tiền thanh toán từ Checkout
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentMethod,
  setPaymentMethod,
  totalPayment,
}) => {
  const navigate = useNavigate();

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);
  };

  const handlePayment = async () => {
    if (isNaN(totalPayment) || totalPayment <= 0) {
      console.error("Tổng tiền thanh toán không hợp lệ:", totalPayment);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/payment/momo",
        {
          orderInfo: "Thông tin đơn hàng",
          amount: totalPayment,
        },
      );

      const { payUrl } = response.data;
      if (payUrl) {
        window.location.href = payUrl;
      } else {
        console.error("URL thanh toán không được trả về.");
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const handlePaymentVnp = async () => {
    if (isNaN(totalPayment) || totalPayment <= 0) {
      console.error("Tổng tiền thanh toán không hợp lệ:", totalPayment);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/vnpay/payment",
        {
          orderInfo: "Thông tin đơn hàng",
          amount: totalPayment,
        },
      );

      const  payUrl  = response.data.data;
      console.log(payUrl);
      
      if (payUrl) {
        window.location.href = payUrl;
      } else {
        console.error("URL thanh toán không được trả về.");
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="mt-5">
      <FormControl component="fieldset" style={{ marginTop: "20px" }}>
        <FormLabel component="legend">Phương thức thanh toán</FormLabel>
        <RadioGroup
          aria-label="payment-method"
          name="paymentMethod"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
          onClick={handlePayment}
        >
          <FormControlLabel value="Momo" control={<Radio />} label="Momo" />
        </RadioGroup>

        <RadioGroup
          aria-label="payment-method"
          name={paymentMethod}
          onChange={handlePaymentMethodChange}
          onClick={handlePaymentVnp}
        >
          <FormControlLabel value="VND" control={<Radio />} label="VND" />
        </RadioGroup>
        {/* <button onClick={handlePayment} className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'>
                    Thanh toán với Momo
                </button> */}
      </FormControl>
    </div>
  );
};

export default PaymentForm;
