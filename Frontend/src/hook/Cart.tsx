import { useEffect, useState } from "react";
import { Cart_detail } from "../interfaces/Cart";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/Cart"; // Sử dụng đúng context
import { Product } from "../interfaces/Product";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/Loading";

type AddtoCart = {
  product: Product,
  color_id: string,
  size_id: string,
  quantity: number,
  price: number
}

export const useCarts = () => {
  const [productCart, setProductCart] = useState<Cart_detail[]>([]); // Giỏ hàng local
  const { cart, setCart } = useCart();
  const nav = useNavigate()
  const token = localStorage.getItem('token')
  const { loading, setLoading } = useLoading();
  const getAllCart = async () => {
    try {
      if (!token) {
        toast.error("Bạn cần đăng nhập để xem giỏ hàng")
        nav('/login')
      }
      setLoading(true);
      const response = await axios.get("/api/cart");
      setProductCart(response.data.cart);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getAllCart();
  }, []);

  const addToCart = async ({ product, size_id, quantity, color_id, price }: AddtoCart) => {
    try {
      // Only send the product ID instead of the full product object
      await axios.post('/api/cart/add', {
        id: product.id,
        color_id,
        size_id,
        quantity,
        price: product.price
      });
      toast.success('Thêm sản phẩm vào giỏ hàng thành công');
      nav('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }

    // Thực hiện các thao tác thêm vào giỏ hàng tại đây
  }


  const handleRemoveCart = async (id: number) => {
    try {
      await axios.delete(`/api/cart/${id}/delete `)
      toast.success("Xóa sản phẩm thành công")
      getAllCart();
    } catch (error) {
      toast.error((error as AxiosError)?.message)
    }
  }
  return { productCart, setProductCart, addToCart, cart, setCart, loading, handleRemoveCart };
};
