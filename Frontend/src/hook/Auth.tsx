import axios from 'axios';
import { UserInput } from '../types/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const UseAuth = () => {
    const navigate = useNavigate();
    const Register = async (value: UserInput) => {
        try {
            const {data} =
            await axios.post('/api/register', value)
            console.log(data);
            toast.success("Đăng ký thành công");
            navigate('/login')
        } catch (error) {
            console.error(error); // Log lỗi để dễ dàng gỡ lỗi
            toast.error("Lỗi đăng ký");
        }
    };

    const Login = async (value: UserInput) => {
        try {
            const { data } = await axios.post('/api/login', value)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            console.log(data);
            navigate('/')
            toast.success("Đăng nhập thành công")
        } catch (error) {
            console.error(error); // Log lỗi để dễ dàng gỡ lỗi
            toast.error("Lỗi đăng nhập");
        }
    };
    return { Register ,Login};
};