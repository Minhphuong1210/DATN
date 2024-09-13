import React, { useState } from "react";
import yourImage from "../../public/images/logo.jpg";
import { AlignJustify, Search, ShoppingCart, User, X } from "lucide-react";

interface HeaderProps {
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ isMobile }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className={`sticky top-0 z-50 w-full bg-white p-2`}>
      <div className="relative mt-2 flex items-center justify-between md:mx-[60px] md:mt-0 lg:mx-[150px]">
        {/* Logo */}
        <div>
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
        <div className="hidden flex-grow md:flex md:justify-center">
          <ul className="flex space-x-5">
            <li className="menuNav">
              <a href="#" className="hover:text-slate-600">
                NEW ITEM
              </a>
            </li>
            <li className="menuNav">
              <a href="#" className="hover:text-slate-600">
                ÁO NAM
              </a>
            </li>
            <li className="menuNav">
              <a href="#" className="hover:text-slate-600">
                QUẦN
              </a>
            </li>
            <li className="menuNav">
              <a href="#" className="hover:text-slate-600">
                BỘ VEST
              </a>
            </li>
            <li className="menuNav">
              <a href="#" className="hover:text-slate-600">
                PHỤ KIỆN
              </a>
            </li>
            <li className="menuNav">
              <a href="#" className="hover:text-slate-600">
                TIN TỨC
              </a>
            </li>
            <li className="menuNav">
              <a href="#" className="hover:text-slate-600">
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
        <div className="mr-1 flex space-x-2">
          <User
            size={25}
            className="cursor-pointer text-slate-500 hover:text-black"
          />
          <a href="/cart">
          <ShoppingCart
            size={25}
            className="cursor-pointer text-slate-500 hover:text-black"
          /></a>
          <Search
            size={25}
            className="hidden cursor-pointer text-slate-500 hover:text-black md:block lg:block"
          />

          {/* Nút mở/đóng menu di động */}
          {isMobile && (
            <div className="mt-[-15x]">
              {openMenu ? (
                <X
                  size={25}
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
    </div>
  );
};

export default Header;
