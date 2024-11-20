import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategory } from "../../../../hook/useCategory";

type Menu = {
    handleMouseEnter: (data: any) => void;
    handleMouseLeave: (data: any) => void;
    isOpen: boolean;
    categoryId: number;
};

const MenuHeader = ({ handleMouseEnter, handleMouseLeave, isOpen, categoryId }: Menu) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [categoryData, setCategoryData] = useState<any>(null);
    const { categories } = useCategory();


    useEffect(() => {
        if (categoryId) {

            const category = categories.find((cat: any) => cat.id === categoryId);
            if (category) {
                setCategoryData(category);
            }
        }
    }, [categoryId, categories]);


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
        <div
            className={`absolute left-0 z-40 h-80 top-5 mt-[26px] w-full transform overflow-hidden bg-white pb-9 pt-6 shadow-lg transition-all duration-700 ease-in-out ${isOpen && isAnimating ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className=" flex justify-between mx-[150px]  h-full  border-t-2 pt-5 md:hidden lg:flex">
                <div className=" grid grid-cols-7 grid-rows-4 ">
                    {categoryData && categoryData.sub_categories && categoryData.sub_categories.length > 0 ? (
                        categoryData.sub_categories.map((subcategory: any, index: number) => (
                            <div key={index}>
                                <Link to={`/subcategory/${subcategory.id}`}>{subcategory.name}</Link>

                            </div>
                        ))
                    ) : (
                        <div>    </div>
                    )}
                </div>
                <div className="h-60 w-80">
                    <img
                        src="https://yody.vn/images/menu-desktop/menu_man.png"
                        alt="category image"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default MenuHeader;
