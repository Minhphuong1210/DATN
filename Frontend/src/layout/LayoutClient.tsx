import React, { useEffect, useState } from "react";

import Footer from "../components/client/Footer";


import { Outlet } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useLoading } from "../context/Loading";
import Header from "../components/client/Home/Header/Header";
import { PhoneCall } from "lucide-react";
import LoadingPage from "../components/loading/LoadingPage";

const LayoutClient: React.FC = () => {
  const { loading } = useLoading()
  const [windowSize, setWindowSize] = useState<{
    width?: number;
    height?: number;
  }>({
    width: undefined,
    height: undefined,
  });
  const [isMobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleSize);
    handleSize();

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  useEffect(() => {
    if (windowSize.width !== undefined && windowSize.width < 770) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [windowSize]);

  const [loadingPage, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập việc tải dữ liệu (có thể là gọi API hoặc tải tài nguyên khác)
    const timer = setTimeout(() => {
      setLoading(false); // Sau 2 giây, set loading thành false
    }, 1000);

    return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount
  }, []);

  if (loadingPage) {
    return <LoadingPage />;
  }


  return (
    <>
      <Loading isShow={loading} />
      <div className="min-h-screen   ">

        <div className=" flex items-center ml-1 lg:mx-[100px] xl:mx-[150px]  gap-2 text-[14px] mb-2 ">
          <PhoneCall strokeWidth={1} className="w-5 md:w-10" />
          <div>
            Hỗ trợ khách hàng:
          </div>
          <div className="text-yellow-500 ">1900 1000</div>
        </div>
        <hr className="md:mb-2 lg:mb-[0px]" />

        <Header isMobile={isMobile} />

        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default LayoutClient;
