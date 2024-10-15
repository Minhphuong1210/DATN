import React, { createContext, useState, useContext, ReactNode } from "react";
import { Cart_detail } from "../interfaces/Cart";

// Interface cho context của giỏ hàng
interface CartContextType {
  cart: Cart_detail[];  // Giỏ hàng là một mảng chứa nhiều sản phẩm
  setCart: React.Dispatch<React.SetStateAction<Cart_detail[]>>;  // Hàm để cập nhật giỏ hàng
  addToCart: (item: Cart_detail) => void;  // Hàm để thêm sản phẩm vào giỏ hàng
  removeFromCart: (id: number) => void;  // Hàm để xoá sản phẩm khỏi giỏ hàng
  cartQuantity: number;  // Tổng số lượng sản phẩm trong giỏ
}

// Tạo context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook useCart để lấy dữ liệu context giỏ hàng
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng trong CartProvider");
  }
  return context;
};

// Interface cho props của CartProvider
interface CartProviderProps {
  children: ReactNode;
}

// CartProvider để quản lý trạng thái giỏ hàng
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart_detail[]>([]);  // Khởi tạo giỏ hàng là một mảng rỗng

  // Hàm để thêm sản phẩm vào giỏ hàng
  const addToCart = (item: Cart_detail) => {
    setCart(prevCart => [...prevCart, item]);  // Thêm sản phẩm vào cuối mảng giỏ hàng
  };

  // Hàm để xoá sản phẩm khỏi giỏ hàng dựa trên ID sản phẩm
  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));  // Loại bỏ sản phẩm có id tương ứng
  };

  // Hàm để tính tổng số lượng sản phẩm trong giỏ hàng
  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, cartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
