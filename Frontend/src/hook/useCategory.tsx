import axios from "axios"
import { Category, SubCategory } from "../interfaces/Category"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { Product } from "../interfaces/Product"

export const useCategory = () => {
    const { id } = useParams();
    const { name } = useParams();
    // console.log(name);

    const { data: subcates = [] } = useQuery<SubCategory[]>({
        queryKey: ["subcates"],
        queryFn: async () => {
            const response = await axios.get(`/api/subcategory`);
            return response.data.data
        }

    })

    const { data: productBySubCateId = [] } = useQuery<Product[]>({
        queryKey: ["productByCateId", id],
        queryFn: async () => {
            try {
                const response = await axios.get(`/api/productSubcate/${id}`);
                return response.data.productcate || [];  // Trả về mảng rỗng nếu không có dữ liệu
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
                return []; // Trả về mảng rỗng nếu có lỗi
            }
        },
        enabled: !!id // Chỉ thực hiện truy vấn nếu id có giá trị
    });


    const { data: categories = [] } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axios.get(`/api/categorys`);
            return response.data.data
        }

    })

    return { subcates, categories, productBySubCateId, name }

}