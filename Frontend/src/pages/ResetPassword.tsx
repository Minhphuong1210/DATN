import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import imageRegister from "../public/images/imageRegister.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
// type AuthFormProps = {
//   onSubmit: (data: any) => void;
// };

const ResetPassword = () => {
    const [password, setpassword] = useState('');
    const { token } = useParams();
    const nav = useNavigate()
    // console.log(token);
    
    const handleChange = (e) => {
        setpassword(e.target.value);
    };
    console.log(setpassword);

    const handleSend = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/reset_password/${token}`, {
                password: password,
            });


            if (response.data.message) {
                toast.success(response.data.message)
                nav('/login')
            } else {

            }
        } catch (error) {
            console.error('Error during request:', error);

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
                        Tạo mật khẩu mới
                    </h2>

                    <form>
                        <div className="mb-6">
                            <label className="mb-2 block text-gray-600" htmlFor="password">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                onChange={handleChange} value={password}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập mật khẩu"
                            // {...register("password", { required: "Mật khẩu là bắt buộc" })}
                            />
                            {/* {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {String(errors.password.message)}
                </p>
              )} */}
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;