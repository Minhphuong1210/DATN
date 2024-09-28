import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Collapse, CollapseProps } from 'antd';
import { useNavigate } from 'react-router-dom';

interface PaymentFormProps {
    paymentMethod: string;
    setPaymentMethod: (value: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ paymentMethod, setPaymentMethod }) => {
    const navigate = useNavigate();

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedMethod = event.target.value;
        setPaymentMethod(selectedMethod);
        navigate('/payment');
    };

    const text = "Sau khi nhấp vào “Thanh toán ngay”, bạn sẽ được chuyển hướng đến VNPAY để hoàn tất việc mua hàng một cách an toàn.";
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Thanh toán MOMO',
            children: <p>{text}</p>,
        },
        {
            key: '2',
            label: 'Thanh toán VN PAY',
            children: <p>{text}</p>,
        },
        {
            key: '3',
            label: 'Thanh toán khi nhận hàng',
            children: <p>{text}</p>,
        },
    ];

    return (
        <div className='mt-5'>
            <FormControl component="fieldset" style={{ marginTop: '20px' }}>
                <FormLabel component="legend">Phương thức thanh toán</FormLabel>
                <RadioGroup
                    aria-label="payment-method"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                >
                    <FormControlLabel value="Momo" control={<Radio />} label="Momo" />

                </RadioGroup>
            </FormControl>

        </div >
    );
};

export default PaymentForm;
