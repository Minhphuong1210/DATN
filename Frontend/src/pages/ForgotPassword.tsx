import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import imageRegister from "../public/images/imageRegister.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// type AuthFormProps = {
//   onSubmit: (data: any) => void;
// };

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const nav = useNavigate()
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  console.log(email);

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/check_forgot_password', {
        email: email,
      });

      console.log(response);

      if (response.data.message) {
        toast.success(response.data.message)
        nav('/login')

      } else {
        toast.error(response.data.error)
      }
    } catch (error) {
      console.error('Error during request:', error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }

    }
  };

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
            Quên mật khẩu
          </h2>

          <form>
            <div className="mb-4">
              <label className="mb-2 block text-black" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                onChange={handleChange} value={email}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email"

              />

            </div>
            <div className="mb-4">
              <button
                type="submit"
                onClick={handleSend}
                className="w-full rounded-md bg-yellow-400 px-4 py-2 font-semibold text-white hover:bg-yellow-500"
              >
                Gửi
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

export default ForgotPassword;