import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { toast } from "react-toastify";



export const useFilterProducts = (min_price: number | null, max_price: number | null, color_id: string, size_id: string | null, subcate_id: string | null, category: string | null) => {
    const [filterProductsPrice, setFilterProductsPrice] = useState<Product[]>([]);
    const [message, setMessage] = useState()

    const FilterProductsByPrice = async () => {
        if (!min_price && !max_price && !color_id && !size_id && !subcate_id && !category) {
            return;
        }
        try {
            const response = await axios.post("/api/filterProduct", {
                min_price,
                max_price,
                color_id,
                size_id,
                subcate_id,
                category,
            });


            setFilterProductsPrice(response.data.products.data)
            console.log(response.data.products.data);
            setMessage(response.data.message)
            // toast.success(message)
        } catch (message) {
            console.error(message);
        }
    };


    useEffect(() => {
        FilterProductsByPrice();
    }, [min_price, max_price, category, color_id, size_id, subcate_id]);
    return { filterProductsPrice, FilterProductsByPrice };

};
