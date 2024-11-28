import React, { useEffect, useState } from "react";
import yourImage from "../../../../public/images/logofix2.png";
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
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../../../hook/useCategory";


import { useLoading } from "../../../../context/Loading";
import { useCart } from "../../../../context/Cart";
import { Badge } from "@mui/material";
import ModalCart from "../../ModalCart/ModalCart";
// import { useLoading } from "../../../../context/Loading";


interface HeaderProps {
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ isMobile }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCart, setsOpenCart] = useState(false)
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { totalQuantity } = useCart();
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0); // Thêm state để quản lý số lượng sản phẩm trong giỏ hàng



  const handleOpenCart = () => {
    setsOpenCart(true)
  }
  const handleCloseCart = () => {
    setsOpenCart(false)
  }
// Thêm state để quản lý số lượng sản phẩm trong giỏ hàng
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleMouseEnter = (id: number) => {
    setIsOpen(true);
    setActiveCategoryId(id); // Lưu lại id của category khi hover vào
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setActiveCategoryId(null); // Đặt lại id khi rời khỏi
  };
  const token = localStorage.getItem('token');

  //CHỨC NĂNG TÌM KIẾM SẢN PHẨM
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // kiểm tra điều kiện trước khi điều hướng
    navigate(`/allproduct/?q=${searchTerm}`);
  };

  const { categories, subcates } = useCategory();

    // Hàm lấy dữ liệu giỏ hàng từ AP


    // Hàm lấy dữ liệu giỏ hàng từ API
    const fetchCartCount = async () => {
      try {
        if (!token) {
          setCartCount(0);
          return} ; // Nếu chưa đăng nhập thì không gọi API
        const response = await axios.get("/api/cart"); // Gọi API giỏ hàng
        const cartItems = response.data.cart; // Lấy danh sách sản phẩm trong giỏ hàng
        const totalItems = cartItems.reduce((total: number, item: any) => total + item.quantity, 0); // Tính tổng số lượng
        setCartCount(totalItems);
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
      }
    };
  
    useEffect(() => {
      fetchCartCount(); // Gọi hàm để lấy dữ liệu giỏ hàng
    }, []);


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
                <a href="/allproducts" className="hover:text-slate-600">
                  TẤT CẢ SẢN PHẨM
                </a>
              </li>


              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`hovermenuNav ${isOpen && activeCategoryId === category.id ? "text-yellow-500" : ""}`}
                  onMouseEnter={() => handleMouseEnter(category.id)} // Truyền id khi hover vào
                  onMouseLeave={handleMouseLeave}
                >
                  <a href="" className="hover:text-slate-600">
                    {category.name}
                  </a>
                </li>
              ))}


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
            {token ? (
              <DropdownMenu
                isOpenUser={isOpenUser}
                setIsOpenUser={setIsOpenUser}
              />
            ) : null

            }
            <div className="relative" onMouseEnter={handleOpenCart} onMouseLeave={handleCloseCart}>
              <Badge badgeContent={totalQuantity} color="primary">
                <a href="/cart">
                  <ShoppingCart
                    size={30}
                    className="cursor-pointer text-slate-500 hover:text-black"
                  />
                </a>
              </Badge>

            </div>

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
        {isOpen && activeCategoryId !== null && (
          <MenuHeader
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            isOpen={isOpen}
            categoryId={activeCategoryId} // Truyền id của category đang hover vào
          />
        )}

        {isOpenCart && (
          <ModalCart
            handleMouseEnterCart={handleOpenCart}
            handleMouseLeaveCart={handleCloseCart}
            isOpenModalCart={isOpenCart}
          />
        )}

      </div>
    </div>
  );
};

export default Header;