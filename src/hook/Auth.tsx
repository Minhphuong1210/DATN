import axios from 'axios';
import { UserInput } from '../types/auth';


export const UseAuth = () => {
    const Register = async (userData: UserInput) => {
        console.log(userData);  // Kiểm tra dữ liệu đang được gửi
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', userData);
            console.log(response);
        } catch (error) {
            console.error(error);  // Kiểm tra lỗi
        }
    };


    // const Login = async (value: UserInput) => {
    //     try {
    //         const { data } = await axios.post('http://127.0.0.1:8000/api/login')
    //         console.log(value);
    //         alert("OK");
    //     } catch (error) {
    //         console.error(error); // Log lỗi để dễ dàng gỡ lỗi
    //         alert("Error");
    //     }
    // };

    return { Register };
};