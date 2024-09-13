import React, { useEffect } from "react";
import { CartItemProps } from "../interface/Product";
import axiosIntance from "../axios/intance";
import axios from "axios";

export const useCart = () =>{
    const [cart , setCart] = React.useState<CartItemProps[]>([])
    const [quantity, setQuantity] = React.useState<number>(1)
    const getAllCart = async () => {
        const {data} = await axiosIntance.get("/carts"  )
        console.log(data);
        setCart(data)
    }
   const handlenCreaseQuantity = (id:number) =>{
        setQuantity(quantity + 1)
   }
   const handlenDecreaseQuantity = (id:number) =>{
       if(quantity > 1){
           setQuantity(quantity - 1)
       }
   }
   React.useEffect(() => {
    getAllCart(); // Gọi hàm getAllCart để fetch dữ liệu cart
  }, []);
    return { getAllCart , cart, handlenCreaseQuantity, handlenDecreaseQuantity };
}