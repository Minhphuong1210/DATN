import React from 'react';
import { Typography } from '@mui/material';

interface ConfirmationProps {
    shippingInfo: {
        fullName: string;
        address: string;
        city: string;
        tel: string;
        note: string;
        shippingMethod: string;
    };

    paymentMethod: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({ shippingInfo, paymentMethod }) => {
    return (
        <div>
            <Typography variant="h6">Xác nhận thông tin</Typography>
            <Typography><strong>Họ và tên:</strong> {shippingInfo.fullName}</Typography>
            <Typography><strong>Địa chỉ:</strong> {shippingInfo.address}</Typography>
            <Typography><strong>Thành phố:</strong> {shippingInfo.city}</Typography>
            <Typography><strong>Số điện thoại:</strong> {shippingInfo.tel}</Typography>
            <Typography><strong>Ghi chú:</strong> {shippingInfo.note}</Typography>
            <Typography><strong>Phường thức vận chuyển:</strong> {shippingInfo.shippingMethod}</Typography>
            <Typography><strong>Phương thức thanh toán:</strong> {paymentMethod}</Typography>
        </div>
    );
};

export default Confirmation;
