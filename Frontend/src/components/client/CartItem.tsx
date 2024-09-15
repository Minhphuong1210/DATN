import React from 'react';
import { CartItemProps } from '../../interfaces/Cart';

type Props = {
    onDelete: () => void;
    onQuantityChange: (newQuantity: number) => void;
};

const CartItem: React.FC<CartItemProps & Props> = ({
    name,
    color,
    size,
    quantity,
    price,
    images,
    onDelete,
    onQuantityChange,
}) => {
    return (
        <div className="flex gap-10 items-center self-center mt-9 ml-3 max-w-full text-black w-[1298px]">
            <div className='flex '>
                <img src={images} alt="hungvy" className='w-[100px] h-auto' />
            </div>
            <div className="flex flex-col items-start self-stretch text-base">
                <div className="self-stretch">{name}</div>
                <div className="mt-2.5">Màu sắc : {color}</div>
                <div className="mt-2.5">Kích cỡ : {size}</div>
            </div>
            <div className='flex flex-wrap gap-14 pl-[250px] text-base'>
                <div className="flex self-stretch pr-1 pl-2.5 my-auto whitespace-nowrap  ">
                    <button className='rounded-sm border bg-gray-200 px-3 py-1 hover:bg-gray-300' onClick={() => onQuantityChange(quantity - 1)}>-</button>
                    <div className='w-16 appearance-none border-b border-t border-gray-300 text-center border border-collapse'>{quantity}</div>
                    <button className='mr-4 rounded-sm border bg-gray-200 px-3 py-1 hover:bg-gray-300' onClick={() => onQuantityChange(quantity + 1)}>+</button>
                </div>
                <div className="grow shrink self-stretch my-auto w-28 ">
                    {price.toLocaleString()} đ
                </div>
                <div className="grow shrink self-stretch my-auto w-28 ">
                    {(price * quantity).toLocaleString()} đ
                </div>
            </div>
            <button onClick={onDelete} className="self-start mt-5  pt-8 text-lg ">
                Xóa
            </button>
        </div>
    );
};

export default CartItem;