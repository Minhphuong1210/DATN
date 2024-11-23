import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import axios from "axios";
import { Cart_detail } from "../interfaces/Cart";
import { toast } from "react-toastify";
import { Product } from "../interfaces/Product";

// Interface cho context của giỏ hàng
interface CartContextType {
  cart: Cart_detail[];
  setCart: React.Dispatch<React.SetStateAction<Cart_detail[]>>;
  addToCart: (product: Product, color_id: string, size_id: string, quantity: number) => Promise<void>;
  removeFromCart: (id: number) => void;
  fetchCartItems: () => Promise<void>;
  totalQuantity: number; // Lưu tổng số lượng sản phẩm
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
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
  const [cart, setCart] = useState<Cart_detail[]>([]);

  // Hàm để thêm sản phẩm vào giỏ hàng
  const addToCart = async (product: Product, color_id: string, size_id: string, quantity: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng');
        return;
      }
      if (!color_id || !size_id) {
        toast.error('Vui lòng chọn màu sắc và kích thước trước khi thêm vào giỏ hàng');
        return;
      }
      await axios.post('/api/cart/add', {
        id: product.id,
        color_id,
        size_id,
        quantity,
        price: product.price,
      });

      // Thêm sản phẩm vào giỏ hàng trong state của context
      setCart(prevItems => [
        ...prevItems,
        { product, color_id, size_id, quantity }
      ]);
      toast.success('Thêm sản phẩm vào giỏ hàng thành công');
    } catch {
      toast.error('Sản phẩm đã hết hàng hoặc có lỗi xảy ra');
    }
  };


  // Hàm để xoá sản phẩm khỏi giỏ hàng
  const removeFromCart = async (id: number) => {
    try {
      const response = await axios.delete(`/api/cart/${id}/delete`);
      toast.success(response.data.message);
      fetchCartItems()
      if (response.data && Array.isArray(response.data.cart)) {
        setCart(response.data.cart);

      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
      setCart([]);
    }
  };

  // Hàm để lấy tất cả sản phẩm trong giỏ hàng từ API
  const fetchCartItems = async () => {
    try {
      const response = await axios.get("/api/cart");
      if (response.data && Array.isArray(response.data.cart)) {
        setCart(response.data.cart);
      } else {
        console.error("Dữ liệu trả về không phải là mảng:", response.data);
        setCart([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
      setCart([]);
    }
  };

  // Hàm tăng số lượng sản phẩm
  const increaseQuantity = async (id: number) => {
    try {
      const updatedCart = cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      await axios.put(`/api/cart/${id}/update`, { quantity: updatedCart.find(item => item.id === id)?.quantity });
    } catch (error) {
      console.error("Lỗi khi tăng số lượng sản phẩm:", error);
    }
  };

  // Hàm giảm số lượng sản phẩm
  const decreaseQuantity = async (id: number) => {
    try {
      const updatedCart = cart.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart); // Cập nhật giỏ hàng tạm thời
      await axios.put(`/api/cart/${id}/update`, { quantity: updatedCart.find(item => item.id === id)?.quantity });
    } catch (error) {
      console.error("Lỗi khi giảm số lượng sản phẩm:", error);
    }
  };

  // Cập nhật totalQuantity khi giỏ hàng thay đổi
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        fetchCartItems,
        totalQuantity,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
