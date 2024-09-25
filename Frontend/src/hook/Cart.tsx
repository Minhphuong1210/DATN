import { useEffect, useState } from "react";
import { Cart_detail } from "../interfaces/Cart";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/Cart"; // Sử dụng đúng context
import { Product } from "../interfaces/Product";

type AddtoCart = {
  product_id: string
  size: string
  color: string
  quantity: number
  price: number
}

export const useCarts = () => {
  const [productCart, setProductCart] = useState<Cart_detail[]>([]); // Giỏ hàng local
  const { cart, setCart } = useCart(); // Sử dụng useCart từ context

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

  const addToCart = async ({product_id, size , quantity, color, price}: AddtoCart) => {
    try {
      await axios.post('/api/cart/add', { product_id, size , quantity, color, price })
      toast.success('Thêm sản phẩm vào giỏ hàng thành công')
    } catch (error) {
      toast.error('Thêm sản phẩm vào giỏ hàng thất bại')
    }
  }
  

  return { productCart, setProductCart, addToCart, cart , setCart };
};
