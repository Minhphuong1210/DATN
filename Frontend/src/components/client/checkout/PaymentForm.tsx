import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

interface PaymentFormProps {
    paymentMethod: string;
    setPaymentMethod: (value: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ paymentMethod, setPaymentMethod }) => {
    return (
        <div>
            <FormControl component="fieldset" style={{ marginTop: '20px' }}>
                <FormLabel component="legend">Phương thức thanh toán</FormLabel>
                <RadioGroup
                    aria-label="payment-method"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <FormControlLabel value="Momo" control={<Radio />} label="Momo" />
                    <FormControlLabel value="VN PAY" control={<Radio />} label="VN PAY" />
                    <FormControlLabel value="Thanh toán khi nhận hàng" control={<Radio />} label="Thanh toán khi nhận hàng" />
                </RadioGroup>
            </FormControl>
        </div >
    );
};

export default PaymentForm;
