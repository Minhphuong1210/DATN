import axios from "axios"
import { useEffect, useState } from "react"
import { SubCategory } from "../interfaces/Category"

export const useCategory = () => {
    const [subcategory, setSubcate] = useState<SubCategory[]>([])
    const subcates = async () => {
        try {
            const responsive = await axios.get("api/subcategory")
            setSubcate(responsive.data.data)
            console.log(subcategory);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        subcates()
    }, [])
    return { subcategory }

}