import { useState, useEffect } from 'react';
import { Product } from '../interfaces/Product';// Interface Product
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const useFavorites = () => {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const navigate = useNavigate()
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
            toast.success('Đã thêm sản phẩm vào yêu thích!');
            navigate('/wishlist');
        }  catch (error: any) {
            if (error.response?.status === 409) {
                toast.warning('Sản phẩm đã có trong danh sách yêu thích!');
            } else {
                toast.error('Vui lòng đăng nhập để thêm sản phẩm yêu thích');
            }
        }
    };
    


    // Xóa sản phẩm khỏi danh sách yêu thích
    const removeFromFavorites = async (productId: string) => {
        try {
            await axios.delete(`/api/wishlist/${productId}`);
            // Cập nhật danh sách yêu thích sau khi xóa
            const updatedFavorites = favorites.filter(product => product.id !== productId);
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm khỏi yêu thích:', error);
        }
    };

    return {
        favorites,
        addToFavorites,
        removeFromFavorites,
    };
};

export default useFavorites;
