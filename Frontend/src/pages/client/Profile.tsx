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



    return (
        <>
            <div className="mx-[150px] mb-96">
                <div className="sticky top-16 z-30 bg-white py-3">
                    <div className="mb-5 text-gray-400">
                        <a href="/" className="text-gray-500 hover:underline focus:outline-none">
                            Trang chủ
                        </a>
                        / <span className="text-gray-600">Đơn hàng của tôi</span>
                    </div>
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

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Outlet />
                </div>




            </div>
        </>
    )
}

export default Profile