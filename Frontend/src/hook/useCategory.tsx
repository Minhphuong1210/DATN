import axios from "axios"
import { Category, SubCategory } from "../interfaces/Category"
import { useQuery } from "@tanstack/react-query"

export const useCategory = () => {
    const { data: subcates = [] } = useQuery<SubCategory[]>({
        queryKey: ["subcates"],
        queryFn: async () => {
            const response = await axios.get(`/api/subcategory`);
            return response.data.data
        }

    })

    // const { data: productByCateId = [] } = useQuery<SubCategory[]>({
    //     queryKey: ["productByCateId", id],
    //     queryFn: async () => {
    //         const response = await axios.get(`/api/productSubcate${id}`);
    //         return response.data.data
    //     },
    //     enabled: !!id
    // })

    const { data: categories = [] } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axios.get(`/api/categorys`);
            return response.data.data
        }

    })

    return { subcates, categories }

}