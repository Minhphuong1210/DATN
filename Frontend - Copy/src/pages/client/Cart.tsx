import React from 'react';
import Header from '../../components/client/Header'
import { useCart } from '../../hook/useCart'
import { CartItemProps } from '../../interface/Product';
import Footer from '../../components/client/Footer';

type Props = {
  onQuantityChange: (newQuantity: number) => void;
  onDelete: ()=> void;
}

const Cart = (props: Props) => {
  const { getAllCart, cart, handlenCreaseQuantity, handlenDecreaseQuantity } = useCart();

  


  return (
    <>
      <Header isMobile={false} />
      <div className='container mx-auto px-[160px]'>
        <h2 className='text-xl font-bold py-14'>GIỎ HÀNG</h2>
        <div className='flex flex-wrap gap-5 justify-between font-semibold max-w-[1413px] max-md:mt-10 max-md:max-w-full'>
          <div>Sản Phẩm</div>
          <div className='flex gap-20'>
            <div>Số lượng</div>
            <div>Giá</div>
            <div>Tổng tiền</div>
          </div>
        </div>
        <hr className='shrink-0 mt-2.5 w-full h-1 border border-black border-solid max-md:mr-1.5' />
        <div>
          {cart.map((item: CartItemProps) => (
            <div key={item.id} className=' max-w-[1413px] max-md:mt-10 max-md:max-w-full'>
              <div>{item.name}</div>
              <div>{item.color}</div>
              <div>{item.size}</div>
              <div className='flex gap-2 '>
                <button onClick={() => handlenCreaseQuantity(item.id)}>-</button>
                <div>|</div>
                <span>{item.quantity}</span>
                <div>|</div>
                <button onClick={()=>handlenDecreaseQuantity(item.id)}>+</button>
              </div>
              <div className='flex justify-end font-semibold text-red-600 '>
                <div>{item.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <hr className='shrink-0 mt-2.5 w-full h-1 border border-black border-solid max-md:mr-1.5' />
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Cart