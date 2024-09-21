import axios, { AxiosError } from "axios"
import { Product } from "../interfaces/Product"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useLoading } from "../context/Loading"
import { toast } from "react-toastify";
export const useProduct = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product>()
    const [productsHots, setProductsHots] = useState<Product[]>([]);
    const [productsSale, setProductsSale] = useState<Product[]>([]);
    const { loading, setLoading } = useLoading();
    const { id, idd } = useParams();
    console.log(id, idd);

    //Lấy tất cả sản phẩm
    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/api/products')
            setProducts(data);

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllProducts();
    }, [])

    // SANR PHẨM HOT 
    const getProductsHot = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/products')
            setProductsHots(response.data.products_hot);
        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getProductsHot();
    }, [])
    // Lấy sản  phẩm Sale
    const getProductsSale = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/products')
            setProductsSale(response.data.products_sale);

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getProductsSale();
    }, [])


    // Lấy sản phẩm theo id 
    const getProductById = async (id: string, idd: string) => {
        try {
            setLoading(true);

            // Combine the two IDs into the URL
            const response = await axios.get(`/api/productDetai/${id}/subcate/${idd}`);

            // Log the response data
            setProduct(response.data.Product
            );

        } catch (error) {
            toast.error((error as AxiosError)?.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!id || !idd) return;
        getProductById(id, idd);
    }, [id, idd]);


    return { products, product, loading, productsHots, productsSale }
}