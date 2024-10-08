// // CartContext.tsx
// import React, { createContext, useReducer, useContext, useEffect } from 'react';
// import { addToCartApi } from './api'; // giả lập API

// type ProductVariant = {
//   size: string;
//   color: string;
// };

// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   variant: ProductVariant;
// };

// type CartState = {
//   cartItems: Product[];
// };

// type CartAction =
//   | { type: 'ADD_TO_CART'; product: Product }
//   | { type: 'REMOVE_FROM_CART'; id: string };

// const initialState: CartState = {
//   cartItems: [],
// };

// function cartReducer(state: CartState, action: CartAction): CartState {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       const itemExists = state.cartItems.find(
//         item =>
//           item.id === action.product.id &&
//           item.variant.size === action.product.variant.size &&
//           item.variant.color === action.product.variant.color
//       );
//       if (itemExists) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map(item =>
//             item.id === action.product.id &&
//             item.variant.size === action.product.variant.size &&
//             item.variant.color === action.product.variant.color
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, { ...action.product, quantity: 1 }],
//         };
//       }
//     case 'REMOVE_FROM_CART':
//       return {
//         ...state,
//         cartItems: state.cartItems.filter(item => item.id !== action.id),
//       };
//     default:
//       return state;
//   }
// }

// const CartContext = createContext<{
//   state: CartState;
//   dispatch: React.Dispatch<CartAction>;
// }>({ state: initialState, dispatch: () => null });

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   const addToCart = async (product: Product) => {
//     try {
//       await addToCartApi(product); // Gọi API để lưu vào database
//       dispatch({ type: 'ADD_TO_CART', product });
//     } catch (error) {
//       console.error('Failed to add to cart', error);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);import { createContext, useState } from 'react';

import React, { createContext, useState, useContext, ReactNode } from "react";
import { Cart_detail } from "../interfaces/Cart";

interface CartContextType {
  cart: Cart_detail | null;  // Giỏ hàng có thể là null nếu chưa có sản phẩm nào
  setCart: React.Dispatch<React.SetStateAction<Cart_detail | null>>;  // Hàm để cập nhật giỏ hàng
}

// Tạo context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook useCart để lấy dữ liệu context giỏ hàng
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Interface cho props của CartProvider
interface CartProviderProps {
  children: ReactNode;
}

// CartProvider để quản lý trạng thái giỏ hàng
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart_detail | null>(null); // Khởi tạo giỏ hàng là null

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
