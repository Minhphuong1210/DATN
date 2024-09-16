import axios, { AxiosError } from "axios"
import { Product } from "../types/Product"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useLoading } from "../context/Loading"
import { toast } from "react-toastify";
export const useProduct = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product>()
    const [productsHot, setProductsHot] = useState<Product[]>([]);
    const { loading, setLoading } = useLoading();
    const { id } = useParams()
    //Lấy tất cả sản phẩm
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/products')
            setProductsHot(response.data.products_hot);
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllProducts();
    }, [])

    // Lấy sản phẩm theo id 
    const getProductById = async (id: string) => {
        try {
            setLoading(true)
            const { data } = await axios.get('/api/products' + id)
            setProduct(data)
        } catch (error) {
            toast.error((error as AxiosError)?.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (!id) return
        getProductById(id)
    }, [id])
    return { products, product, loading, productsHot }
}