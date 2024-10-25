import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Menu = {
    handleMouseEnter: (data: any) => void;
    handleMouseLeave: (data: any) => void;
    isOpen: boolean;
};
const MenuHeader = ({ handleMouseEnter, handleMouseLeave, isOpen }: Menu) => {
    const [isAnimating, setIsAnimating] = useState(false);
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setIsAnimating(true);
            }, 10);
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);
    return (
        <>
            <div
                className={`absolute left-0 z-40 top-5 mt-[26px] w-full transform overflow-hidden  bg-white pb-9 pt-6 shadow-lg transition-all duration-700 ease-in-out ${isOpen && isAnimating ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"} `}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="table-container mx-[150px] hidden h-full  justify-center border-t-2 pt-5 md:hidden lg:flex">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>
                                    <Link to={"/"}>Áo</Link>
                                </th>
                                <th>Quần</th>
                                <th>Đồ bộ</th>
                                <th>Đồ thể thao</th>
                                <th>Phụ kiện nam</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ss</td>
                                <td>Quần jean</td>
                                <td>Bộ đồ thể thao</td>
                                <td>Bộ thể thao nam</td>
                                <td>Kính mát</td>
                            </tr>
                            <tr>
                                <td>Áo thun</td>
                                <td>Quần short</td>
                                <td>Bộ đồ ngủ</td>
                                <td>s</td>
                                <td>Thắt lưng</td>
                            </tr>
                            <tr>
                                <td>Áo sơ mi</td>
                                <td>Quần kaki</td>
                                <td>s</td>
                                <td>s</td>
                                <td>Nón</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="h-60 w-80">
                        <img
                            src="https://yody.vn/images/menu-desktop/menu_man.png"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuHeader;
