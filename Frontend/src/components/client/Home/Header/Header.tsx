import React, { useEffect, useState } from "react";
import yourImage from "../../../../public/images/logofix.png";
import {
  AlignJustify,
  Heart,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import "../../../../css/tableHeader.css";
import MenuHeader from "./MenuHeader";
import DropdownMenu from "./DropdowUser";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
interface HeaderProps {
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ isMobile }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const token = localStorage.getItem('token');
  // console.log(token);
  
  //CHỨC NĂNG TÌM KIẾM SẢN PHẨM
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(searchTerm);
    e.preventDefault();

    // kiểm tra điều kiện trước khi điều hướng
        navigate(`/search?q=${searchTerm}`);
    

    // try {
    //   setError(null);
    // console.log(searchTerm);
    //   const search= await axios.post(`http://127.0.0.1:8000/api/search?q=${searchTerm}`)
    //   setSearchResults(search.data)
    //   console.log(search);
      
    //   if (!search.ok) {
    //     throw new Error("Không thể tải dữ liệu sản phẩm");
    //   }

     
    // } catch (error) {
    //   // console.log(error);
    // }
  };

  // Gọi API lần đầu khi component mount
  // useEffect(() => {
  //   searchProduct();
  // }, []);
  // Debounce search để tránh gọi API quá nhiều
  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     searchProduct(searchTerm);
  //   }, 500);

  //   return () => clearTimeout(timeoutId);
  // }, [searchTerm]);

  return (
    <div className={`sticky top-0 z-50 w-full bg-white p-2`}>
      <div>
        <div className="relative mt-2 flex items-center justify-between md:mx-[60px] md:mt-0 lg:mx-[150px] xl:mx-[150px]">
          {/* Logo */}
          <div className="z-50">
            <a
              href="/"
              className="flex items-center justify-center md:justify-start"
            >
              <div className="w-10 md:w-16">
                <img src={yourImage} alt="Logo" className="h-auto w-full" />
              </div>
              <h1 className="hidden text-[24px] font-bold lg:block">
                Modern Men
              </h1>
            </a>
          </div>

          {/* Menu cho màn hình desktop */}
          <div className="ml-10 hidden flex-grow text-sm md:flex">
            <ul className="flex space-x-5">
              <li className="hovermenuNav relative">
                <a href="allproduct" className="hover:text-slate-600">
                  TẤT CẢ SẢN PHẨM
                </a>
              </li>

              <li
                className={`hovermenuNav ${isOpen ? "text-yellow-500" : ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <a href="#" className="hover:text-slate-600">
                  ÁO NAM
                </a>
              </li>
              <li className="hovermenuNav">
                <a href="#" className="hover:text-slate-600">
                  QUẦN
                </a>
              </li>
              <li className="hovermenuNav">
                <a href="#" className="hover:text-slate-600">
                  BỘ VEST
                </a>
              </li>
              <li className="hovermenuNav">
                <a href="#" className="hover:text-slate-600">
                  PHỤ KIỆN
                </a>
              </li>
              <li className="hovermenuNav">
                <a href="#" className="hover:text-slate-600">
                  TIN TỨC
                </a>
              </li>
              <li className="hovermenuNav">
                <a href="contact" className="hover:text-slate-600">
                  LIÊN HỆ
                </a>
              </li>
            </ul>
          </div>

          {/* Menu di động */}
          {/* Menu di động */}
          {openMenu && isMobile && (
            <div className="absolute right-0 top-full z-50 mt-2 h-screen w-1/2 bg-slate-200 p-2 text-sm">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-slate-600 hover:underline">
                    NEW ITEM
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-600 hover:underline">
                    ÁO NAM
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-600 hover:underline">
                    QUẦN
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-600 hover:underline">
                    BỘ VEST
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-600 hover:underline">
                    PHỤ KIỆN
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-600 hover:underline">
                    TIN TỨC
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-600 hover:underline">
                    LIÊN HỆ
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Biểu tượng menu */}
          <div className="mr-2 flex rounded-full border-2 px-2 py-2">
           <form action="" method="get" onSubmit={handleSearch}>
           <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-6 outline-none"
            />
           </form>

            <Search
              size={25}
              className="hidden cursor-pointer text-slate-500 hover:text-black md:block lg:block"
            />
          </div>
          {/* No results
          {!loading && searchTerm && searchResults.length === 0 && !error && (
            <div className="mt-4 text-center text-gray-500">
              Không tìm thấy sản phẩm nào phù hợp
            </div>
          )} */}

          <div className="mr-1 flex space-x-2">
            <a href="/wishlist">
              <Heart
                className="cursor-pointer text-slate-500 hover:text-black"
                size={30}
              />
            </a>
            <a
              href="/login"
              onMouseEnter={() => setIsOpenUser(true)}
              onMouseLeave={() => setIsOpenUser(false)}
              className="cursor-pointer text-slate-500 hover:text-black"
            >
              <User size={30} />
            </a>
            { token ?(
               <DropdownMenu
               isOpenUser={isOpenUser}
               setIsOpenUser={setIsOpenUser}
             />
            ):null

            }
            {/* <DropdownMenu
              isOpenUser={isOpenUser}
              setIsOpenUser={setIsOpenUser}
            /> */}

            <a href="/cart">
              <ShoppingCart
                size={30}
                className="cursor-pointer text-slate-500 hover:text-black"
              />
            </a>

            {/* Nút mở/đóng menu di động */}
            {isMobile && (
              <div className="mt-[-15x]">
                {openMenu ? (
                  <X
                    size={30}
                    onClick={handleMenu}
                    className="cursor-pointer text-slate-500 hover:text-black"
                  />
                ) : (
                  <AlignJustify
                    size={25}
                    onClick={handleMenu}
                    className="cursor-pointer text-slate-500 hover:text-black"
                  />
                )}
              </div>
            )}
          </div>
        </div>
        {isOpen && (
          <MenuHeader
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            isOpen={isOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
