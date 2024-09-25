import React from "react";
import { useForm } from "react-hook-form";
import { UseAuth } from "../../hook/Auth";
import { Header } from "react-native/Libraries/NewAppScreen";
import imageRegister from "../../public/images/imageRegister.png";

type AuthFormProps = {
  onSubmit: (data: any) => void;
};
const LoginForm = ({ onSubmit }: AuthFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="absolute mt-5 rounded-lg bg-blue-950">
      <div
        className="flex h-[600px] w-[500px] rounded-lg shadow-lg"
        style={{ width: "900px" }}
      >
        {/* Left Image Section */}
        <div className="flex w-1/2 items-center justify-center bg-white p-10 pb-60">
          <img
            src={imageRegister}
            alt="Illustration"
            className="rounded-2xl object-cover"
            style={{ width: "384px", height: "335px", marginTop: "123px" }}
          />
        </div>

        {/* Form Section */}
        <div className="mt-12 w-1/2 p-10">
          <h2 className="mb-6 text-center text-2xl font-semibold text-white">
            Đăng Nhập Tài Khoản
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username Field */}

            {/* Email Field */}
            <div className="mb-4">
              <label className="mb-2 block text-white" htmlFor="email">
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
              <label className="mb-2 block text-white" htmlFor="password">
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
                Đăng Nhập
              </button>
            </div>

            {/* Login Link */}
            <div className="flex justify-center">
              <a href="" className="text-base text-blue-400 hover:underline">
                Bạn đã có tài khoản?
              </a>
              <a
                href="/register"
                className="animate-bounce-bottom ml-2 text-base text-blue-400 underline"
              >
                {" "}
                Đăng Ký
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
