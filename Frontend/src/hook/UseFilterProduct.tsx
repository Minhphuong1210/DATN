import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../interfaces/Product";

interface PriceRange {
    min: number;
    max: number;
}

export const useFilterProducts = (priceRange: PriceRange | null) => {
    const [filterProductsPrice, setFilterProductsPrice] = useState<Product[]>([]);

    const FilterProductsByPrice = async () => {
        let url = "/api/products"; // URL mặc định để lấy tất cả sản phẩm

        if (priceRange) {
            // Nếu có khoảng giá, thêm tham số vào URL
            url = `/api/products/filter-by-price?min_price=${priceRange.min}&max_price=${priceRange.max}`;
        }

        try {
            const response = await axios.post(url);
            setFilterProductsPrice(response.data.productPrice || []); // Set giá trị mặc định nếu không có sản phẩm
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm theo khoảng giá:', error);
        }
    };

    useEffect(() => {
        FilterProductsByPrice();
    }, [priceRange]);

    return { filterProductsPrice, FilterProductsByPrice };
};
