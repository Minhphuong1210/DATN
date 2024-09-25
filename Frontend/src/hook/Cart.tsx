import { useEffect, useState } from "react";
import { Cart_detail } from "../interfaces/Cart";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/Cart"; // Sử dụng đúng context
import { Product } from "../interfaces/Product";
import { useNavigate } from "react-router-dom";

type AddtoCart = {
  product: Product,
  color_id: string,  // Truyền trực tiếp giá trị đã chọn
  size_id: string,    // Truyền trực tiếp giá trị đã chọn
  quantity: number,
  price: number
}

export const useCarts = () => {
  const [productCart, setProductCart] = useState<Cart_detail[]>([]); // Giỏ hàng local
  const { cart, setCart } = useCart(); // Sử dụng useCart từ context
  const nav = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/cart");
        setProductCart(response.data.cart); // Gán giỏ hàng vào state productCart
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);




  return { productCart, setProductCart, cart, setCart };
};
