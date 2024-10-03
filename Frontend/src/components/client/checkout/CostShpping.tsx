import React from 'react';
import { Typography } from '@mui/material';
import { Order } from '../../../interfaces/oder';
import { Shipping } from '../../../interfaces/Shipping';



interface ConfirmationProps {
    shippingInfo: Omit<Order, 'commodity_money' | 'total_amount' | 'shipping_id' | 'code_order'> & {
        shippingMethod: string;
    };
    shippings: Shipping[];
    onCostChange: (cost: number) => void; // Hàm callback để truyền cost về component cha
}

const CostShipping: React.FC<ConfirmationProps> = ({ shippingInfo, shippings, onCostChange }) => {
    const selectedShipping = shippings.find(shipp => shipp.id.toString() === shippingInfo.shippingMethod);
    const cost = selectedShipping ? selectedShipping.cost : 0;

    // Gọi hàm callback khi cost thay đổi
    React.useEffect(() => {
        onCostChange(cost);
    }, [cost, onCostChange]);

    return (
        <div>
            <Typography><strong></strong> {cost} VNĐ</Typography>
        </div>
    );
};

export default CostShipping;