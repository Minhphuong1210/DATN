import React from 'react'
import { useCategory } from '../../../../hook/useCategory'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const ListCategory = () => {
    const { subcates } = useCategory();
    const settings = {
        dots: true,
        infinite: subcates.length > 1, // Không vòng lặp nếu chỉ có 1 sản phẩm
        speed: 500,
        slidesToShow: subcates.length > 1 ? 5 : 1, // Nếu có 1 sản phẩm, chỉ hiển thị 1
        slidesToScroll: 1,
        autoplay: subcates.length > 1, // Tự động chạy nếu có hơn 1 sản phẩm
        autoplaySpeed: 3000,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(subcates.length, 3), // Hiển thị tối đa 3 sản phẩm
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: Math.min(subcates.length, 2), // Hiển thị tối đa 2 sản phẩm
                },
            },
        ],
    };



    return (
        <>
            <div className=" mb-14  mx-[350px] justify-center ">
                <Slider {...settings}>
                    {subcates.map((sub) => (
                        <div key={sub.id} className='flex'>
                            <div className="relative w-52 h-52  rounded-full bg-slate-700 bg-[url('https://down-vn.img.susercontent.com/file/f9ce1f63f6b5f142bd98488f46b9c7cd.webp')] bg-cover bg-center">
                                <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold">
                                    {sub.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>


            </div>
        </>
    )
}

export default ListCategory