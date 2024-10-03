import React from 'react'

type Props = {}

const Contact = (props: Props) => {
    return (
        <>
            <h1 className='text-center text-3xl font-semibold pt-10'>Liên hệ với chúng tôi</h1>
            <div className='flex justify-center gap-12 pt-10 py-20'>
                <div className='border-2 border-slate-200 p-4 w-[700px] rounded-xl shadow-xl'>
                    <h2 className='text-xl font-semibold'>Viết cho chúng tôi</h2>
                    <p>Chúng tôi sẽ trả lời bạn nhanh nhất có thể.</p>
                    <div className='flex gap-4 justify-center pt-5'>
                        <label
                            className=" w-[300px] h-[45px] relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                                type="type"
                                id="UserName"
                                placeholder="Name"
                                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />

                            <span
                                className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                            >
                                Name
                            </span>
                        </label>
                        <label
                            className=" w-[300px] h-[45px] relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                                type="email"
                                id="UserEmail"
                                placeholder="Email"
                                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />

                            <span
                                className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                            >
                                Email
                            </span>
                        </label>
                    </div>
                    <div className='flex gap-4 justify-center pt-5'>
                    <label
                            className=" w-[300px] h-[45px] relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                                type="number"
                                id="phone"
                                placeholder="Số điện thoại"
                                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />

                            <span
                                className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                            >
                                Số điện thoại
                            </span>
                        </label>
                        <label
                            className=" w-[300px] h-[45px] relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                                type="type"
                                id="UserPhanhoi"
                                placeholder="Bạn đang nghĩ gì"
                                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />

                            <span
                                className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                            >
                                Bạn đang nghĩ gì?
                            </span>
                        </label>
                    </div>
                    <div className='pt-8 flex justify-center'>
                        <button className='w-[200px] h-[45px]  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Gửi</button>
                    </div>
                </div>
                <div className='border-2 border-slate-200 p-4 w-[400px] rounded-xl shadow-xl'>
                    <h2 className='text-xl font-semibold'>Văn phòng</h2>
                    <p className='pt-5'> <strong>Hotline:</strong> 1900.8079</p>
                    <p className='pt-3'> <strong>Thời gian mở cửa:</strong> 8:00 - 19h Thứ 2 - Thứ 7</p>
                    <p className='pt-3'><strong>VP Phía Bắc:</strong>Tầng 17 tòa nhà Viwaseen, 48 Phố Tố Hữu, Trung Văn, Nam Từ Liêm, Hà Nội.</p>
                    <p className='pt-3'><strong>VP Phía Nam:</strong>186A Nam Kỳ Khởi Nghĩa, Phường Võ Thị Sáu, Quận 3, TP.HCM</p>
                </div>
            </div>
        </>
    )
}

export default Contact