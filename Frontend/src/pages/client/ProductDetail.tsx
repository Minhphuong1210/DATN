import React, { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { Eye, Heart, ShoppingCart, User } from "lucide-react";
import { useProduct } from "../../hook/Product";
import { Colors, Product, Sizes } from "../../interfaces/Product";
import { useColor } from "../../hook/Color";
import { useCart } from "../../context/Cart";

const ProductDetail: React.FC = () => {
    const { product, comments, ProductBycategorys } = useProduct();
    const [selectSize, setSelectSize] = useState<Sizes>({ id: '', name: '' });
    const [selectColor, setSelectColor] = useState<Colors>({ id: '', name: '', color_code: '' });
    const [quantity, setQuantity] = useState(1);
    const [showDescription, setShowDescription] = useState(true);
    const [showComment, setShowComment] = useState(false);
    const { color, size } = useColor();
    const [selectedImage, setSelectedImage] = useState(null);
    const { addToCart } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
        }).format(price);
    };
    // Tăng giảm sô lượng
    const incurement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };
    const dercrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleChangeSize = (event: ChangeEvent<HTMLInputElement>, sizeName: string) => {
        setSelectSize({
            id: event.target.value,
            name: sizeName
        });
    };

    const handleChangeColor = (event: ChangeEvent<HTMLInputElement>, colorName: string) => {
        setSelectColor({
            id: event.target.value,
            name: colorName,
            color_code: ''
        });
    };

    // Mô tả & Comment
    const showOnlyDescription = () => {
        setShowDescription(true);
        setShowComment(false);
    };
    const showOnlyComment = () => {
        setShowComment(true);
        setShowDescription(false);
    };

    const handleAddToCart = async (product: Product, color_id: string, size_id: string) => {
        try {
            await addToCart(product, color_id, size_id, quantity); // Gọi addToCart từ context
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            {product && (
                <div className="mx-2 mt-4 overflow-hidden md:mx-7 lg:mx-[150px] lg:mt-14">
                    <div className="lg:flex justify-center lg:space-x-56">
                        <div className="flex gap-6">
                            {/* Danh sách ảnh */}
                            <div className="mb-3 h-[560px] overflow-y-scroll scrollable-content">
                                {product.images.map((img) => (
                                    <div
                                        key={img.id}
                                        className="mr-2 p-1 h-[140px] hover:bg-slate-300 cursor-pointer"
                                        onClick={() => setSelectedImage(`http://127.0.0.1:8000/storage/${img.image}`)}
                                    >
                                        <img
                                            className="h-full w-12 lg:h-full lg:w-full object-fill"
                                            src={`http://127.0.0.1:8000/storage/${img.image}`}
                                            alt=""
                                        />
                                    </div>
                                ))}
                            </div>
                            {/* Ảnh chính */}
                            <div className="mb-3 flex justify-center w-[450px]  h-[560px]">
                                <img
                                    src={selectedImage || product.imageUrl}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="text-[16px]">
                                {product.name}
                            </div>
                            <div className="flex items-center">
                                <span>4.0</span>
                                <span className="ml-2 mr-2 flex text-[14px]">
                                    <FontAwesomeIcon icon={faStarSolid} />
                                    <FontAwesomeIcon icon={faStarSolid} />
                                    <FontAwesomeIcon icon={faStarSolid} />
                                    <FontAwesomeIcon icon={faStarSolid} />
                                    <FontAwesomeIcon icon={faStarRegular} />
                                </span>
                                <span className="text-xs">| Đã bán: {product.soldQuantity}</span>
                            </div>
                            <div className="text-xs">
                                Tình trạng:
                                {product.stock > 0 ? (
                                    <span className="text-sm font-bold text-green-500">Còn hàng</span>
                                ) : (
                                    <span className="text-sm font-bold text-green-500">Hết hàng</span>
                                )
                                }
                            </div>
                            <div className="text-lg font-bold">
                                {product.price_sale !== null ? (
                                    <>
                                        <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                            {formatPrice(product.price)}
                                        </span>
                                        <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                            {formatPrice(product.price_sale)}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                        {formatPrice(product.price)}
                                    </span>
                                )}

                            </div>
                            <form action="">
                                <div>
                                    <div className="mb-2 flex justify-between text-sm md:block">

                                        <span className="hover:text-yellow-400 md:mr-11">
                                            <a href="">Giúp bạn chọn size</a>
                                        </span>
                                        <span className="hover:text-yellow-400">
                                            <a href="">Bảng size</a>
                                        </span>
                                    </div>
                                    <div className="mb-2 mt-3 text-sm">
                                        <span>Màu Sắc:{selectColor.name} </span>
                                        <div className="mt-2 flex space-x-2">
                                            {color.map((color, index) => {
                                                return (
                                                    <div key={index} className="inline-flex items-center">
                                                        <label className="relative flex cursor-pointer items-center">
                                                            <input
                                                                type="radio"
                                                                name={color.name}
                                                                value={color.id}
                                                                checked={selectColor.id === color.id}
                                                                onChange={(event) => handleChangeColor(event, color.name)}
                                                                className="peer h-7 w-7 cursor-pointer appearance-none border border-slate-300 shadow transition-all hover:shadow-md rounded-full"
                                                                style={{ backgroundColor: color.color_code }}
                                                            />
                                                        </label>

                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="inline-flex items-center text-sm md:block md:mr-11 md:mt-3">
                                            <span className="md:mr-11  uppercase">Kích thước: {selectSize.name}</span>
                                            <div className="flex space-x-2">
                                                {size.map((size, index) => {
                                                    return (
                                                        <label key={index} className="relative flex cursor-pointer items-center">
                                                            <input
                                                                type="radio"
                                                                name={size.name}
                                                                value={size.id}
                                                                checked={selectSize.id === size.id}
                                                                onChange={(event) => handleChangeSize(event, size.name)}
                                                                className="peer h-9 w-9 cursor-pointer appearance-none border border-slate-300 shadow transition-all checked:bg-yellow-500 hover:bg-zinc-400 hover:shadow-md"
                                                            />
                                                            <span className=" uppercase pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-500 opacity-100 transition-colors peer-checked:text-black peer-checked:opacity-100">
                                                                {size.name}
                                                            </span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </form>
                            <div className="mt-5">Mô tả:</div>
                            <div className="m-2">
                                <p>{product.description}</p>
                            </div>
                            <div className="mt-7 flex ">
                                <button
                                    className="rounded-sm border bg-gray-200 px-3 py-1 hover:bg-gray-300"
                                    onClick={dercrement}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    readOnly
                                    className="w-16 appearance-none border-b border-t border-gray-300 text-center"
                                    style={{
                                        WebkitAppearance: "none",
                                        MozAppearance: "textfield",
                                    }}
                                />
                                <button
                                    className="mr-4 rounded-sm border bg-gray-200 px-3 py-1 hover:bg-gray-300"
                                    onClick={incurement}
                                >
                                    +
                                </button>
                                <button className=" w-[300px] rounded-sm bg-yellow-400 px-10 py-3" onClick={() => handleAddToCart(product, selectColor.id, selectSize.id, quantity)}>
                                    Thêm vào giỏ hàng
                                </button>

                                {/* <button className="rounded-sm bg-yellow-400 px-10 py-3" onClick={() => { handleAddToCart(product, setSelectColor, setsize_id

                                ) }} >
                                    Thêm vào giỏ hàng
                                </button> */}
                            </div>
                        </div>
                    </div>
                    <hr className="mt-7" />
                    <div>

                        <div className="mb-5 mt-10 flex justify-center space-x-4 lg:space-x-10 lg:text-xl">
                            <h1
                                className={`hovermenuNav hover:text-yellow-500 ${showDescription ? "text-yellow-500" : "text-gray-800"
                                    } hover:bg-blue-700}`}
                            >
                                <button onClick={showOnlyDescription}>Mô tả chi tiết</button>
                            </h1>
                            <h1
                                className={`hovermenuNav hover:text-yellow-500 ${showComment ? "text-yellow-500" : "text-gray-800"
                                    } hover:bg-blue-700}`}
                            >
                                <button onClick={showOnlyComment}>Đánh giá</button>
                            </h1>
                        </div>
                        {showDescription && (
                            <p className="mb-8 text-sm lg:text-lg opacity-85  lg:mx-20 lg:mt-8">
                                {product.content}
                            </p>
                        )}

                        {showComment && (
                            <div className="mb-10 border-2 lg:mt-8">
                                <div className="flex flex-col items-center justify-center p-5 ">
                                    <div>ĐÁNH GIÁ SẢN PHẨM</div>
                                    <span>5.0</span>
                                    <span className="ml-2 mr-2 flex text-[14px]">
                                        <FontAwesomeIcon icon={faStarSolid} />
                                        <FontAwesomeIcon icon={faStarSolid} />
                                        <FontAwesomeIcon icon={faStarSolid} />
                                        <FontAwesomeIcon icon={faStarSolid} />
                                        <FontAwesomeIcon icon={faStarRegular} />
                                        <span className="text-xs">| 1900 đánh giá</span>
                                    </span>
                                </div>
                                <div className="ml-2 lg:mx-20 h-[500px] overflow-y-scroll">

                                    {comments.map((comment) => (
                                        <div className="mb-3" key={comment.id}>
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <User
                                                        size={25}
                                                        strokeWidth={1.5}
                                                        className="rounded-full bg-slate-300 p-1"
                                                    />
                                                </div>
                                                <div>
                                                    <div>{comment.user.name}</div>
                                                    <span className="flex text-[10px]">
                                                        {Array.from({ length: 5 }, (_, index) => (
                                                            <FontAwesomeIcon
                                                                key={index}
                                                                icon={index < comment.rating ? faStarSolid : faStarRegular}
                                                            />
                                                        ))}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="ml-8 mb-1">
                                                {comment.content}
                                            </div>
                                            <div className="ml-8 text-sm opacity-70 mt-1">
                                                Ngày đăng: {new Date(comment.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}

                                    <hr className="mr-2 mt-3" />

                                </div>

                            </div>
                        )}
                    </div>
                    <hr className="mb-8" />

                    <h1 className="mb-5 text-center text-lg">CÓ THỂ BẠN SẼ THÍCH</h1>
                    <div className=" overflow-hidden">
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 ">
                            {ProductBycategorys.map((ProductBycategory) => (
                                <div className="relative mt-9 ml-3.5 md:ml-4 lg:ml-3 " key={ProductBycategory.id}>
                                    <div className="product-carousel grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-7">
                                        <div className="group relative mb-4 h-[80vw] w-[45vw] ml-1 right-0 transition-all duration-500 ease-in-out md:h-[60vw] md:w-[30vw] lg:h-[30vw] lg:w-[17vw] xl:w-[18vw]">
                                            <div className="mb-3 h-[80%] w-full overflow-hidden bg-slate-200 transition-transform duration-500 ease-in-out">
                                                <img
                                                    src={ProductBycategory.imageUrl || 'default-image-url.jpg'}
                                                    alt={ProductBycategory.name}
                                                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                                />
                                                {ProductBycategory.discount_id !== null && (
                                                    <div className='absolute top-0 right-0 my-3 mx-3 py-1 px-2 rounded-md bg-red-500 text-white sale-badge'>
                                                        {ProductBycategory.discount.discount_percent}%
                                                    </div>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <div className="absolute bottom-[30px] left-0 right-0 z-10 flex translate-y-10 transform justify-center space-x-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                    <a href={`/productdetail/${ProductBycategory.id}/subcate/${ProductBycategory.sub_category_id}`} className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                                        <Eye
                                                            color="currentColor"
                                                            strokeWidth="1.5"
                                                            className="w-4 h-4 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-6 xl:h-6"
                                                        />
                                                    </a>
                                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                                        <ShoppingCart
                                                            color="currentColor"
                                                            strokeWidth="1.5"
                                                            className="w-4 h-4 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-6 xl:h-6"
                                                        />
                                                    </div>
                                                    <div className="rounded-full bg-white p-2 hover:bg-black hover:text-white">
                                                        <Heart
                                                            color="currentColor"
                                                            strokeWidth="1.5"
                                                            className="w-4 h-4 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-6 xl:h-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <a href={`/productdetail/${ProductBycategory.id}/subcate/${ProductBycategory.sub_category_id}`} className="block overflow-hidden">
                                                <div className="truncate text-center text-sm md:text-base lg:text-base xl:text-base hover:text-yellow-500">
                                                    {ProductBycategory.name}
                                                </div>
                                                <div className="text-center block">
                                                    {ProductBycategory.price_sale !== null ? (
                                                        <>
                                                            <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                                                {formatPrice(ProductBycategory.price)}
                                                            </span>
                                                            <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                                {formatPrice(ProductBycategory.price_sale)}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                            {formatPrice(ProductBycategory.price)}
                                                        </span>
                                                    )}
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetail;