import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center px-16 pt-20 pb-44 w-full bg-black mt-[733px] max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full">
      <div className="mb-0 ml-5 w-full max-w-[1459px] max-md:mb-2.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-xl font-bold text-white max-md:mt-10">
              <div className="self-start text-5xl max-md:text-4xl">Logo</div>
              <address className="mt-3.5 mr-3 ml-6 font-semibold max-md:mx-2.5 not-italic">
                Địa chỉ: Tầng 5, số nhà 32, Đường , P. , Q. Hà Đông, Tp. Hà Nội
              </address>
              <div className="mt-6">
                <span className="font-semibold">Dịch vụ Khách hàng: Điện thoại: </span>
                <a href="tel:18006136" className="font-semibold underline">1800 6136</a>
                <span className="font-semibold">Email: cskh@.vn</span>
              </div>
              <div className="mt-8 ml-6 max-md:ml-2.5">
                <span className="font-semibold">Hỗ trợ/Tư vấn KH mua online: Điện thoại: </span>
                <a href="tel:02473062882" className="font-semibold underline">0247 xxx 2882</a>
                <span className="font-semibold"> Email: </span>
                <a href="mailto:contact@format.vn" className="font-semibold underline">contact@.vn</a>
                <span className="font-semibold"> Mã Số Thuế: xxxxxxx</span>
              </div>
              <div className="self-center mt-8 font-semibold">© Bản quyền thuộc về ....</div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <nav className="flex flex-col items-start self-stretch my-auto text-xl font-semibold text-white max-md:mt-10">
              <h3>CHÍNH SÁCH</h3>
              <a href="#" className="mt-9">Điều khoản sử dụng</a>
              <a href="#" className="mt-7">Chính sách bảo mật</a>
              <a href="#" className="mt-7">Chính sách giao hàng</a>
              <a href="#" className="mt-7">Chính sách đổi trả</a>
              <a href="#" className="self-stretch mt-7">Chính sách xử lý khiếu nại</a>
              <a href="#" className="self-stretch mt-7 mr-6 max-md:mr-2.5">Chính sách Khách hàng</a>
              <a href="#" className="mt-7">Chính sách bảo hành</a>
            </nav>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <nav className="flex flex-col mt-6 text-xl font-semibold text-white max-md:mt-10">
              <h3>HỖ TRỢ KHÁCH HÀNG</h3>
              <a href="#" className="self-start mt-9">Giới thiệu</a>
              <a href="#" className="mt-7 max-md:mr-0.5">Hướng dẫn sử sử dụng</a>
              <a href="#" className="mt-7 max-md:mr-2.5">Chính sách giao hàng</a>
              <a href="#" className="mt-7 max-md:mr-2.5">Hướng dẫn chọn size</a>
              <a href="#" className="mt-7 max-md:mr-1.5">Hướng dẫn thanh toán</a>
              <a href="#" className="self-start mt-7">Liên hệ</a>
            </nav>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-6 w-full font-semibold max-md:mt-10">
              <h3 className="self-start text-xl text-white">Đăng ký nhận tin</h3>
              <form className="flex gap-10 py-1 pr-1 pl-5 mt-6 text-base rounded-3xl bg-zinc-300">
                <label htmlFor="emailInput" className="sr-only">Nhập địa chỉ email</label>
                <input
                  id="emailInput"
                  type="email"
                  placeholder="Nhập địa chỉ email..."
                  className="grow shrink my-auto text-black w-[138px] bg-transparent"
                  aria-label="Nhập địa chỉ email"
                />
                <button type="submit" className="px-4 py-4 text-white bg-black rounded-3xl">
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;