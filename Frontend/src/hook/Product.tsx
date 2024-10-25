import axios, { AxiosError } from "axios";
import { Comment, Product } from "../interfaces/Product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoading } from "../context/Loading";
import { toast } from "react-toastify";

export const useProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product>();
    const [productsHots, setProductsHots] = useState<Product[]>([]);
    const [productsSale, setProductsSale] = useState<Product[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [ProductBycategorys, setProductBycategory] = useState<Product[]>([]);
    const { loading, setLoading } = useLoading();
    const { id, idd } = useParams();
    
    
    // để nhiều cái này bị lỗi api là 429
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/products');
            setProducts(data);
            setProductsHots(data.products_hot);
            setProductsSale(data.products_sale);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Lấy sản phẩm theo ID
    const getProductById = async (id: string, idd: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/productDetai/${id}/subcate/${idd}`);
            setProduct(response.data.Product);
        } catch (error) {
            toast.error((error as AxiosError)?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id && idd) {
            getProductById(id, idd);
        }
    }, [id, idd]);

    // Lấy bình luận theo sản phẩm
    const getComment = async (id: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/productDetai/${id}/subcate/${idd}`);
            setComments(response.data.comments);
        } catch (error) {
            toast.error((error as AxiosError)?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getComment(id);
        }
    }, [id]);

    // Lấy sản phẩm theo danh mục
    const getProductBycategory = async (id: string, idd: string) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/productDetai/${id}/subcate/${idd}`);
            setProductBycategory(response.data.ProductSubCategory);
            console.log(response.data.ProductSubCategory);
        } catch (error) {
            toast.error((error as AxiosError)?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id && idd) {
            getProductBycategory(id, idd);
        }
    }, [id, idd]);
    // thêm bình luận
  
    return { products, product, loading, productsHots, productsSale, comments, getComment, ProductBycategorys, getProductBycategory };
};
