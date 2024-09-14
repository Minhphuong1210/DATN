import axios from 'axios';
import { UserInput } from '../types/auth';

// Hàm để lấy CSRF token từ cookie
const getCSRFToken = (): string => {
    const name = 'csrftoken'; // Tên cookie chứa CSRF token
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift()!;
    return '';
};
export const UseAuth = () => {
    const Register = async (value: UserInput) => {
        try {
            const csrfToken = getCSRFToken();

            await axios.post('http://127.0.0.1:8000/register', value, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Thêm CSRF token vào header
                }
            });

            console.log(value);
            alert("OK");
        } catch (error) {
            console.error(error); // Log lỗi để dễ dàng gỡ lỗi
            alert("Error");
        }
    };

    const Login = async (value: UserInput) => {
        try {
            const csrfToken = getCSRFToken();

            const { data } = await axios.post('http://127.0.0.1:8000/api/login', value, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Thêm CSRF token vào header
                }
            });

            console.log(value);
            alert("OK");
        } catch (error) {
            console.error(error); // Log lỗi để dễ dàng gỡ lỗi
            alert("Error");
        }
    };

    return { Login, Register };
};