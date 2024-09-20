import React from "react";
import yourImage from "../../public/images/logo.jpg";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="mt-10 bg-black text-white">
      <div className="ml-32">
        <a
          href="#"
          className="flex items-center justify-center md:justify-start"
        >
          <div className="mt-10 w-10 md:w-16">
            <img src={yourImage} alt="Logo" className="h-auto w-full" />
          </div>
          <h1 className="ml-2 mt-7 hidden text-[24px] font-bold lg:block">
            Modern Men
          </h1>
        </a>
      </div>
      <div className="ml-32 flex">
        <div className="mt-5">
          <p className="">Địa chỉ: Tầng 5, số nhà 32,</p>
          <p>Đường, P. ,Q.Hà Đông, Tp.Hà Nội</p>
          <p className="mt-2">Dịch vụ khách hàng: </p>
          <a className="underline" href="">
            Điện thoại: 1800 6136
          </a>
          <p className="mt-2">Hỗ trợ/Tư vấn KH mua online: </p>
          <a className="underline" href="">
            Điện thoại: 0247 xxx 2882
          </a>
          <p className="mt-2">Mã số thuế: xxxxxxxxx</p>
        </div>

        <div className="mb-2 ml-40">
          <p className="text-xl">Chính Sách</p>
          <p className="mt-2">Điều khoản sử dụng</p>
          <p className="mt-2">Chính sách bảo mật</p>
          <p className="mt-2">Chính sách giao hàng</p>
          <p className="mt-2">Chính sách đổi trả</p>
          <p className="mt-2">Chính sách xử lý khiếu nại</p>
          <p className="mt-2">Chính sách khách hàng</p>
          <p className="mt-2">Chính sách bảo hành</p>
        </div>

        <div className="ml-40">
          <p className="text-xl">Hỗ trợ khách hàng</p>
          <p className="mt-2">Giới thiệu</p>
          <p className="mt-2">Chính sách giao hàng</p>
          <p className="mt-2">Hướng dẫn chọn size</p>
          <p className="mt-2">Hướng dẫn thanh toán</p>
          <p className="mt-2">Liên hệ</p>
        </div>

        <div className="ml-40">
          <p className="text-xl">Đăng ký thông tin</p>
          <div>
            <input
              className="w-full rounded-full border border-gray-300 py-2 pl-4 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Nhập địa chỉ Email..."
            />
            <button className="absolute right-[2%] top-[33%] h-8 rounded-full bg-black px-4 text-white transition hover:bg-gray-800">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;