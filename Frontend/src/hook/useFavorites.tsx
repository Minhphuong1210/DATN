import { useState, useEffect } from 'react';
import { Product } from '../interfaces/Product';// Interface Product
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const useFavorites = () => {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    // Lấy danh sách sản phẩm yêu thích từ API Laravel khi component được mount
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('/api/wishlist');
                setFavorites(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách yêu thích:', error);
            }
        };

        fetchFavorites();
    }, []);

    const addToFavorites = async (productId: string) => {
        const isAlreadyFavorite = favorites.some(product => product.id === productId);
        
        if (isAlreadyFavorite) {
            toast.warning('Sản phẩm đã có trong danh sách yêu thích!');
            return;
        }
    
        try {
            await axios.post('/api/wishlist/add', { product_id: productId });
            const response = await axios.get('/api/wishlist');
            setFavorites(response.data);
            toast.success(response.data.message);
            navigate('/wishlist');
        }  catch (error: any) {
            if (error.response?.status === 409) {
                toast.warning('Sản phẩm đã có trong danh sách yêu thích!');
            } else {
                toast.error((error as AxiosError)?.message);
            }
        }
    };
    
    return {
        favorites,
        addToFavorites,
    };
};

export default useFavorites;