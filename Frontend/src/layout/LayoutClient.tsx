import React, { useEffect, useState } from "react";
import Header from "../components/client/Header";
import Footer from "../components/client/Footer";


import { Outlet } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { useLoading } from "../context/Loading";

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
      <div className="h-screen overflow-y-auto overflow-x-hidden">
        <Header isMobile={isMobile} />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default LayoutClient;
