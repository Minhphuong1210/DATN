import React from 'react'
import Header from '../../components/client/Header'
import Footer from '../../components/client/Footer'

type Props = {}

const Checkout = (props: Props) => {
    return (
        <>

            <Header isMobile={false} />
            <main className='flex flex-col pl-40 self-center mt-10 w-full max-w-[1535px] max-md:mt-10 max-md:max-w-full'>
                <div className='flex text-gray-500 '>
                    <a href='/cart' className='hover:text-black '>Giỏ Hàng</a>/
                    <div className='hover:text-black '>Thanh Toán</div>
                </div>
                <div className='pt-10 text-xl font-bold'>Thanh Toán</div>
                <div className='pt-3'>
                    <div className='flex justify-between text-xl '>1.Địa chỉ nhận hàng</div>
                    <div className='flex flex-col pt-2 '>
                        <label className='text-lg'>Họ và tên</label>
                        <input type="text" className=' w-[550px] h-[35px] bg-slate-50 border border-black border-solid rounded ' placeholder='Nguyen Van A' />
                    </div>
                    <div className='flex flex-col pt-2 '>
                        <label className='text-lg'>Số điện thoại</label>

                        <input type="text" className=' w-[550px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='012345678' />
                    </div>
                    <div className='flex flex-col pt-2 '>
                        <label className='text-lg'>Tỉnh/Thành phố</label>
                        <input type="text" className=' w-[550px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='Ha Noi' />
                    </div>
                    <div className='flex flex-col pt-2 '>
                        <label className='text-lg'>Quận/Huyện</label>
                        <input type="text" className=' w-[550px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='Thanh Trì' />
                    </div>
                    <div className='flex flex-col pt-2 '>
                        <label className='text-lg'>Phường/Xã</label>
                        <input type="text" className=' w-[550px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='Vạn Phúc' />
                    </div>
                    <div className='flex flex-col pt-2 '>
                        <label className='text-lg'>Địa chỉ đường</label>
                        <input type="text" className=' w-[550px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='Xóm 4' />
=======
                        <input type="text" className=' w-[550px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='012345678'/>
                    </div>
                    <div className='flex flex-col pt-2 '>
                        <label className='text-lg'>Tỉnh/Thành phố</label>
                        <input type="text" className=' w-[550px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='Ha Noi'/>
                    </div>
                    <div className='flex flex-col pt-2 '>
                        <label className='text-lg'>Quận/Huyện</label>
                        <input type="text" className=' w-[550px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='Thanh Trì'/>
                    </div>
                    <div className='flex flex-col pt-2 '>
                        <label className='text-lg'>Phường/Xã</label>
                        <input type="text" className=' w-[550px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='Vạn Phúc'/>
                    </div>
                    <div className='flex flex-col pt-2 '>
                        <label className='text-lg'>Địa chỉ đường</label>
                        <input type="text" className=' w-[550px] h-[35px] bg-slate-50 border border-black border-solid rounded' placeholder='Xóm 4'/>
                    </div>
                    <div className='flex flex-col pt-2 '>
                        <label className='text-lg'>Ghi chú</label>
                        <textarea name="" id="" className=' w-[550px] h-[135px] bg-slate-50 border border-black border-solid rounded' placeholder='Ghi chú'></textarea>
                    </div>
                </div>
                <hr className='shrink-0 mt-8 w-[600px] h-1 border border-black border-solid' />
                <div className='flex justify-between text-xl pt-10'>2.Vận chuyển</div>
                <div className='pt-3 flex flex-col'>
                    <div className='flex flex-row gap-5'>
                        <input type="radio" className='ml-2 w-5' />
                        <label htmlFor="" className='text-lg'>Giao hàng nhanh</label>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <input type="radio" className='ml-2 w-5' />
                        <label htmlFor="" className='text-lg'>Giao tiết kiệm</label>
                    </div>
                </div>
                <hr className='shrink-0 mt-8 w-[600px] h-1 border border-black border-solid' />
                <div className='flex justify-between text-xl pt-10'>3.Phương thức thanh toán</div>
                <div className='pt-3 flex flex-col'>
                    <div className='flex flex-row gap-5'>
                        <input type="radio" className='ml-2 w-5' />
                        <label htmlFor="" className='text-lg'>Thanh toán khi nhận hàng</label>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <input type="radio" className='ml-2 w-5' />
                        <label htmlFor="" className='text-lg'>Thanh toán thẻ VNPAY</label>
                    </div>
                </div>
                <hr className='shrink-0 mt-8 w-[600px] h-1 border border-black border-solid' />
                <div className='flex justify-between text-xl pt-10'>4.Áp dụng mã giảm giá</div>
                <div className='pt-3 flex pl-10'>
                    <input type="text" className=' w-[400px] h-[35px] bg-slate-50 border border-black border-solid ' placeholder='Áp dụng mã giảm giá' />
                    <button className='w-[100px] h-[35px] bg-[#F3F81D] border border-black border-solid'>Áp dụng</button>
                </div>
                <hr className='shrink-0 mt-8 w-[600px] h-1 border border-black border-solid' />
                <div className='flex gap-96 text-lg pt-10'>
                    <div className='pl-4'>Thành tiền</div>
                    <div>2.000.000 đ</div>
                </div>
                <div className='pt-10 pl-10'>
                    {/* <button className='w-[500px] h-[45px] bg-[#F3F81D] border border-black border-solid rounded'>Đặt hàng</button> */}
                    <a className="group relative inline-block focus:outline-none focus:ring" href="#">
                        <span
                            className="w-[500px] absolute inset-0 translate-x-0 translate-y-0 bg-[#D9D9D9] transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"
                        ></span>

                        <span
                            className=" w-[500px] text-center relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest"
                        >
                            Đặt hàng
                        </span>
                    </a>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default Checkout