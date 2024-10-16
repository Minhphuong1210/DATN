import React from "react";
import { useForm } from "react-hook-form";
import { UseAuth } from "../../hook/Auth";
import imageRegister from "../../public/images/imageRegister.png";

type AuthFormProps = {
  onSubmit: (data: any) => void;
};

const RegisterForm = ({ onSubmit }: AuthFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="ml-9 pb-10">
      <div
        className="mt-10 flex h-[550px] w-[500px] rounded-lg bg-white shadow-lg"
        style={{ width: "900px" }}
      >
        
        {/* Left Image Section */}
        <div className="flex w-1/2 items-center justify-center bg-white p-10">
          <img
            src={imageRegister}
            alt="Illustration"
            className="object-cover"
            style={{ width: "384px", height: "335px" }}
          />
        </div>

        {/* Form Section */}
        
        <div className="w-1/2 p-10 mt-14">
          <h2 className="mb-6 text-center text-2xl font-semibold text-black">
            Đăng Ký Tài Khoản
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username Field */}
            <div className="mb-4">
              <label className="mb-2 block text-black" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên"
                {...register("name", {
                  required: "Username là bắt buộc",
                  minLength: {
                    value: 3,
                    message: "Username không ít hơn 3 ký tự",
                  },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {String(errors.name.message)}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="mb-2 block text-black" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email"
                {...register("email", {
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {String(errors.email.message)}
                </p>
              )}
            </div>
            {/* Password Field */}
            <div className="mb-6">
              <label className="mb-2 block text-black" htmlFor="password">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mật khẩu"
                {...register("password", { required: "Mật khẩu là bắt buộc" })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full rounded-md bg-yellow-400 px-4 py-2 font-semibold text-white hover:bg-yellow-500"
              >
                Đăng Ký
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <a href="/login" className="text-sm text-blue-500 hover:underline">
                Bạn đã có tài khoản?
              
                Đăng Nhập
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;