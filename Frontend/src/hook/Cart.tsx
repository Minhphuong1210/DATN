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

  const addToCart = async ({product, size_id , quantity, color_id, price}: AddtoCart) => {
    try {
      // Only send the product ID instead of the full product object
      await axios.post('/api/cart/add', { 
        id: product.id, 
        color_id, 
        size_id, 
        quantity ,
        price: product.price
      });
      toast.success('Thêm sản phẩm vào giỏ hàng thành công');
      nav('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }

  // Thực hiện các thao tác thêm vào giỏ hàng tại đây
  }
  

  return { productCart, setProductCart, addToCart, cart , setCart };

};
