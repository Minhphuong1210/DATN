
import { Heart, LockKeyhole, PenLine, ShoppingBag, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Profile = () => {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            const user = JSON.parse(userJson);
            setName(user.name ?? "Anonymous");
        }
    }, []);




import { Heart, LockKeyhole, PenLine, ShoppingBag } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {

    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 mb-16">
            {/* Breadcrumb */}
            <div className="sticky top-16 z-30 bg-white py-3">
                <div className="mb-5 text-sm text-gray-400">
                    <Link to="/" className="text-gray-500 hover:underline">
                        Trang chủ
                    </Link>
                    <span className="mx-1">/</span>
                    <span className="text-gray-600">Đơn hàng của tôi</span>
                </div>

                <div className=" grid grid-cols-5">
                    <div className="col-span-1 border-2 h-96 text-[14px]">
                        <div className="m-4">
                            <div className="mt-2">
                                <div className="flex  items-center  gap-4">
                                    <img
                                        className="w-11 rounded-full"
                                        src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"
                                        alt="Profile"
                                    />
                                    <div className="flex flex-col ">
                                        <div className="text-[15px]">{name}</div>
                                        <Link to={"/account"} className="opacity-45 flex items-center gap-2"> <PenLine size={15} />Sửa hồ sơ</Link>
                                    </div>
                                </div>

                                <div className="ml-3 text-[15px] mt-6 opacity-75">
                                    <ul className=''>
                                        {/* <li className='pb-2 flex items-center gap-2'>
                                            <User size={20} color='#0046d1' strokeWidth={1.5} /><Link to='/profile/account' className='hover:text-yellow-500 focus:text-yellow-500 active:text-yellow-500'>Thông tin cá nhân</Link>
                                        </li> */}
                                        <li className='pb-2 flex items-center gap-2'>
                                            <Heart color='#0046d1' size={20} strokeWidth={1.5} /><a href="">Sản phẩm yêu thích</a>
                                        </li>
                                        <li className='pb-2 flex items-center gap-2'>
                                            <LockKeyhole color='#0046d1' size={20} strokeWidth={1.5} />
                                            <Link to="/profile/changepassword">Đổi mật khẩu</Link>
                                        </li>
                                        <li className="pb-2 flex items-center gap-2">
                                            <ShoppingBag color="#0046d1" size={20} strokeWidth={1.5} />
                                            <Link
                                                to="/profile/order"
                                                className='hover:text-yellow-500 focus:text-yellow-500 active:text-yellow-500'>
                                                Đơn hàng
                                            </Link>
                                        </li>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {/* Sidebar */}
                <aside className="col-span-1 md:col-span-1 lg:col-span-1 bg-white border rounded-lg p-4">
                    <div className="flex flex-col items-center md:items-start gap-4 mb-6">
                        <img
                            className="w-16 h-16 rounded-full object-cover"
                            src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg"
                            alt="Profile"
                        />
                        <div className="text-center md:text-left">
                            <p className="text-base font-semibold">Hoàng Hùng</p>
                            <Link
                                to="/account"
                                className="flex items-center text-sm text-gray-500 hover:text-blue-500 mt-2 gap-1"
                            >
                                <PenLine size={15} />
                                Sửa hồ sơ
                            </Link>
                        </div>
                    </div>

                    <ul className="space-y-4 text-sm">
                        <li className="flex items-center gap-3">
                            <Heart color="#0046d1" size={20} strokeWidth={1.5} />
                            <Link to="/profile/favorites" className="hover:text-yellow-500">
                                Sản phẩm yêu thích
                            </Link>
                        </li>
                        <li className="flex items-center gap-3">
                            <LockKeyhole color="#0046d1" size={20} strokeWidth={1.5} />
                            <Link to="/profile/changepassword" className="hover:text-yellow-500">
                                Đổi mật khẩu
                            </Link>
                        </li>
                        <li className="flex items-center gap-3">
                            <ShoppingBag color="#0046d1" size={20} strokeWidth={1.5} />
                            <Link to="/profile/order" className="hover:text-yellow-500">
                                Đơn hàng
                            </Link>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="col-span-1 md:col-span-3 lg:col-span-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Profile;