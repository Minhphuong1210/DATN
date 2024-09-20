import React from 'react'
import { useForm } from 'react-hook-form';
import { UseAuth } from '../../hook/Auth';


type AuthFormProps = {
    onSubmit: (data: any) => void
}

const RegisterForm = ({ onSubmit }: AuthFormProps) => {
    const { handleSubmit, register, formState: { errors } } = useForm();

    return (
        <div>
            <div className="bg-white rounded-lg shadow-lg pt-44 flex h-[800px] w-[500px]" style={{ width: '900px' }}>

{/* Left Image Section */}
<div className="flex items-center justify-center w-1/2 bg-white p-10 ">
    <img
        src="https://via.placeholder.com/384x335"
        alt="Illustration"
        className="object-cover"
        style={{ width: '384px', height: '335px' }}
    />
</div>

{/* Form Section */}
<div className="w-1/2 p-10">
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Đăng Ký Tài Khoản
    </h2>

    <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username Field */}
        <div className='mb-4'>
            <label className='block text-gray-600 mb-2' htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên"
                {...register("name", {
                    required: "Username là bắt buộc",
                    minLength: {
                        value: 3,
                        message: "Username không ít hơn 3 ký tự",
                    }
                })}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{String(errors.username.message)}</p>}
        </div>

        {/* Email Field */}
        <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email"
                {...register("email", {
                    required: "Email là bắt buộc",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Email không hợp lệ",
                    },
                })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-6">
            <label className="block text-gray-600 mb-2" htmlFor="password">Mật khẩu</label>
            <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mật khẩu"
                {...register("password", { required: "Mật khẩu là bắt buộc" })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{String(errors.password.message)}</p>}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
            <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md">
                Đăng Ký
            </button>
        </div>

        {/* Login Link */}
        <div className="text-center">
            <a href="/login" className="text-sm text-blue-500 hover:underline">Bạn đã có tài khoản? Đăng Nhập</a>
        </div>
    </form>
</div>
</div>

        </div>
    );
}

export default RegisterForm