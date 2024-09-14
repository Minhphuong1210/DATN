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
                <img src={images} alt="hungvy" className='w-[150px]' />
            </div>
            <div className="flex flex-col items-start self-stretch text-lg">
                <div className="self-stretch">{name}</div>
                <div className="mt-2.5">Màu sắc : {color}</div>
                <div className="mt-2.5">Kích cỡ : {size}</div>
            </div>
            <div className='flex flex-wrap gap-14 pl-[200px] text-lg'>
                <div className="flex gap-5 self-stretch pr-1 pl-2.5 my-auto whitespace-nowrap bg-zinc-300 border border-current ">
                    <button onClick={() => onQuantityChange(quantity - 1)}>-</button>
                    <div>|</div>
                    <div>{quantity}</div>
                    <div>|</div>
                    <button onClick={() => onQuantityChange(quantity + 1)}>+</button>
                </div>
                <div className="grow shrink self-stretch my-auto w-28 ">
                    {price.toLocaleString()} đ
                </div>
                <div className="grow shrink self-stretch my-auto w-28 ">
                    {(price * quantity).toLocaleString()} đ
                </div>
            </div>
            <button onClick={onDelete} className="self-start mt-5  pt-4 text-lg ">
                Xóa
            </button>
        </div>
    );
};

export default CartItem;