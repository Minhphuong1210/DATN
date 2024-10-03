import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Collapse, CollapseProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCarts } from '../../../hook/Cart';
import { Cart_detail } from '../../../interfaces/Cart';

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
        // navigate('/payment');
    };

    // const totalAmount = productCart.reduce( (acc, item) => acc + item.PriceProduct * item.quantity, 0);

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/payment/momo', {
                orderInfo: 'Thông tin đơn hàng',
                amount: 10000, // Số tiền thanh toán
            });
    
            const { payUrl } = response.data; // Giả sử bạn nhận được URL thanh toán từ MoMo
            window.location.href = payUrl; // Chuyển hướng người dùng đến trang thanh toán MoMo
        } catch (error) {
            console.error('Payment error:', error);
        }
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
                <button onClick={handlePayment} className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'>Momo</button>
            </FormControl>

        </div >
    );
};

export default PaymentForm;
