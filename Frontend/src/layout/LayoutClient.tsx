import React, { useEffect, useState } from "react";

import Footer from "../components/client/Footer";


import { Outlet } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useLoading } from "../context/Loading";
import Header from "../components/client/Home/Header/Header";
import LoadingPage from "../components/loading/LoadingPage";
import { PhoneCall } from "lucide-react";

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



  return (
    <>
      <Loading isShow={loading} />
      <div className="min-h-screen  ">
        <div className="mx-[150px] flex gap-2 text-[15px] mb-3">
          <PhoneCall strokeWidth={1} />
          <div>
            Hỗ trợ khách hàng:
          </div>
          <div className="text-yellow-500">1900 1000</div>
        </div>
        <hr className="mb-2" />
        <Header isMobile={isMobile} />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default LayoutClient;
