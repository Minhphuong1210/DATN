import React from 'react';
import { CartSummaryProps } from '../interface/Product';

type Props = {
};

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, totalPrice }) => {
  return (
    <div className="flex gap-5 justify-between items-start self-end mt-11 mr-10 max-w-full w-[366px] max-md:mt-10 max-md:mr-2.5 text-lg">
      <div className="flex flex-col">
        <div className="text-black">Tổng sản phẩm</div>
        <div className="self-start mt-6 text-yellow-500">TẠM TÍNH</div>
      </div>
      <div className="flex flex-col mt-1.5 text-black">
        <div className="self-center">{totalItems}</div>
        <div className="mt-6">{totalPrice.toLocaleString()} đ</div>
      </div>
    </div>
  );
};

export default CartSummary;