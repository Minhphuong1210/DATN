import { useEffect, useState } from "react";
import { Cart_detail } from "../interfaces/Cart";
import axios from "axios";
import { toast } from "react-toastify";

export const useCart = () => {
  const [productCart, setCart] = useState<Cart_detail[]>([]);
  const [productDetail, setProductDetail] = useState<Cart_detail[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const  response  = await axios.get("/api/cart");
        setCart(response.data.cart);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return { productCart, setCart };
};
