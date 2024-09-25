import React, { createContext, useContext, useState } from 'react';

export type Cart_detail = {
  id: number;
  NameProduct: string;
  cart_id: number;
  product_detail: Product_detail[];
  quantity: number;
  PriceProduct: number;
  total_price: number;
  colorName: string;
  ImageProduct: string;
  sizeName: string;
};

export type Product_detail = {
  id: number | string;
  product_id: number;
  size_id: number;
  color_id: number;
};

interface CartContextType {
  cart: Cart_detail[];
  addToCart: (
    product: Omit<Cart_detail, 'cart_id' | 'total_price'>,
    quantity: number
  ) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [cart, setCart] = useState<Cart_detail[]>([]);

  const addToCart = (
    product: Omit<Cart_detail, 'cart_id' | 'total_price'>,
    quantity: number
  ) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.sizeName === product.sizeName &&
          item.colorName === product.colorName
      );

      if (itemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += quantity;
        updatedCart[itemIndex].total_price =
          updatedCart[itemIndex].quantity * updatedCart[itemIndex].PriceProduct;
        return updatedCart;
      } else {
        const newItem: Cart_detail = {
          ...product,
          cart_id: prevCart.length + 1, // Giả lập `cart_id`, bạn có thể thay đổi theo yêu cầu
          total_price: product.PriceProduct * quantity,
        };
        return [...prevCart, { ...newItem, quantity }];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart phải được sử dụng trong CartProvider');
  }
  return context;
};
