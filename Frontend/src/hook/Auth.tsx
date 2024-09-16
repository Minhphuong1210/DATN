import axios from 'axios';
import { UserInput } from '../types/auth';


export const UseAuth = () => {
    const Register = async (value: UserInput) => {
        try {
            await axios.post('/api/register', value)
        } catch (error) {
            console.error(error); // Log lỗi để dễ dàng gỡ lỗi
            alert("Error");
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