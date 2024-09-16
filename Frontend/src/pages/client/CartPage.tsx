import React from 'react';
import Header from '../../components/client/Header';
import { CartItemProps } from '../../interfaces/Cart';
import CartItem from '../../components/client/CartItem';
import CartSummary from '../../components/client/CartSummary';



const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<CartItemProps[]>([
    {
      id: 1,
      name: 'Áo sơ mi - AR240033DT',
      color: 'Trắng',
      size: '38',
      quantity: 1,
      price: 700000,
      images: 'https://owen.cdn.vccloud.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/a/s/as240047d._3_1.jpg'
    },
  ]);


  const handleDelete = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex overflow-hidden flex-col pb-5 bg-white">
        <div className='container mx-auto px-[160px]'>
      <main className="flex flex-col self-center mt-16 w-full text-2xl  max-w-[1535px] max-md:mt-10 max-md:max-w-full">
        <h1 className="self-start text-xl font-bold text-black max-md:ml-1.5">
          GIỎ HÀNG
        </h1>
        <div className="flex flex-wrap gap-10 justify-between mt-16 w-full text-black text-lg max-w-[1413px] max-md:mt-10 max-md:max-w-full">
          <div className='text-lg'>Sản phẩm</div>
          <div className="flex gap-20 max-md:max-w-full pr-[150px]">
            <div className='text-lg'>Số lượng</div>
            <div className='text-lg px-8'>Giá</div>
            <div className='text-lg '>Tổng tiền</div>
          </div>
        </div>
        <hr className="shrink-0 mt-2.5 w-full h-1 border border-black border-solid max-md:mr-1.5" />
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            {...item}
            onDelete={() => handleDelete(item.id)}
            onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
          />
        ))}
        
        <hr className="shrink-0 mt-8 w-full h-1 border border-black border-solid" />
        <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
        <div className="flex flex-wrap gap-5 justify-between self-center mt-20 w-full font-semibold max-w-[1515px] max-md:mt-10 max-md:max-w-full">
          <button className="self-start px-16 py-3 text-lg text-black bg-white rounded border border-black border-solid max-md:px-5">
            Tiếp tục mua hàng
          </button>
          <button className="px-16 py-3 text-lg text-white bg-black rounded max-md:px-5">
            <a href="/checkout">Đặt hàng</a>
          </button>
        </div>
      </main>
      </div>
      
</div>
);
};

export default CartPage;