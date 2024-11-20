import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { toast } from "react-toastify";

export const useFilterProducts = (
    min_price: number | null,
    max_price: number | null,
    color_id: string,
    size_id: string | null,
    subcate: string | null,
    category: string | null
) => {
    const [filterProductsPrice, setFilterProductsPrice] = useState<Product[]>([]);
    const [message, setMessage] = useState<string | null>(null);

    const FilterProductsByPrice = async () => {
        // Nếu không có bất kỳ điều kiện nào, không gọi API
        if (!min_price && !max_price && !color_id && !size_id && !subcate && !category) {
            setFilterProductsPrice([]); // Đặt dữ liệu rỗng khi không có filter
            return;
        }

        try {
            const response = await axios.post("/api/filterProduct", {
                min_price,
                max_price,
                color_id,
                size_id,
                subcate,
                category,
            });

            const products = response.data.products?.data || [];
            const responseMessage = response.data.message || null;

            setFilterProductsPrice(products);
            setMessage(responseMessage);

            if (responseMessage) {
                toast.success(responseMessage); // Chỉ gọi toast nếu message có giá trị
            }
        } catch (error) {
            console.error("Error fetching filtered products:", error);
            toast.error("Lỗi khi tải sản phẩm!");
        }
    };

    // Gọi API mỗi khi một trong các giá trị phụ thuộc thay đổi
    useEffect(() => {
        FilterProductsByPrice();
    }, [min_price, max_price, category, color_id, size_id, subcate]);

    return { filterProductsPrice, FilterProductsByPrice };
};
