import React from 'react';
import { Typography } from '@mui/material';
import { Order } from '../../../interfaces/oder';

interface ConfirmationProps {
    shippingInfo: Omit<Order, 'commodity_money' | 'total_amount' | 'shipping_id' | 'code_order'> & {
        shippingMethod: string;
    };
    paymentMethod: string;
    shippings: { id: number; name: string; cost: number }[];
}

const Confirmation: React.FC<ConfirmationProps> = ({ shippingInfo, paymentMethod, shippings }) => {
    const shippingId = parseInt(shippingInfo.shippingMethod, 10); // Chuyển đổi thành number
    const selectedShipping = shippings.find(shipp => shipp.id === shippingId);

    return (
        <div>
            <Typography variant="h6">Xác nhận thông tin</Typography>
            <Typography><strong>Họ và tên:</strong> {shippingInfo.username}</Typography>
            <Typography><strong>Địa chỉ:</strong> {shippingInfo.address}</Typography>
            <Typography><strong>Email:</strong> {shippingInfo.email}</Typography>
            <Typography><strong>Số điện thoại:</strong> {shippingInfo.phone}</Typography>
            <Typography><strong>Ghi chú:</strong> {shippingInfo.note}</Typography>
            <Typography><strong>Phương thức vận chuyển:</strong> {selectedShipping ? selectedShipping.name : 'Chưa chọn'}</Typography>
            <Typography><strong>Phương thức thanh toán:</strong> {paymentMethod}</Typography>
        </div>
    );
};


export default Confirmation;
