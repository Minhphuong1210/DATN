import React, { ChangeEvent, useEffect, useState } from "react";
import yourImage from "../../public/images/AoPolo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { Eye, Heart, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../hook/Product"; import { toast } from "react-toastify";
import { Colors, Product, Sizes, Comment } from "../../interfaces/Product";
import { useColor } from "../../hook/Color";
import axios from "axios";




const ProductDetail: React.FC = () => {
    const { product, comments, ProductBycategorys } = useProduct();
    const [selectSize, setSelectSize] = useState<Sizes>({ id: '', name: '' });
    const [selectColor, setSelectColor] = useState<Colors>({ id: '', name: '', color_code: '' });
    const [quantity, setQuantity] = useState(1);
    const [showDescription, setShowDescription] = useState(true);
    const [showComment, setShowComment] = useState(false);
    const { color, size } = useColor();
    const token = localStorage.getItem('token');
    const [addcomment, setAddcomment] = useState({
        comment: '',
        rating: '',
        parent_id: '',
        product_id: product ? product.id : '',
    });

    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        setAddcomment(prev => ({
            ...prev,
            product_id: product ? product.id : '',
        }));
    }, [product]);

    const handleChangeComment = (e) => {
        const { name, value } = e.target;
        setAddcomment({
            ...addcomment,
            [name]: value,
        });
    };
    const handleSubmitComment = async (e) => {
        e.preventDefault();
        console.log(addcomment); 
        const id = product.id;
        try {
            if (!token) {
                toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng")
                nav('/login')
            }
            setLoading(true);
            const response = await axios.post(`/api/comment/${id}`, {
                comment: addcomment.comment,
                rating: addcomment.rating,
                parent_id: addcomment.parent_id,
                product_id: addcomment.product_id,
            });
            toast.success("Bình luận thành công");
            // Reset form sau khi gửi thành công
            setAddcomment({
                comment: '',
                rating: '',
                parent_id: '',
                product_id: product ? product.id : '',
            });
            // window.location.reload();
        } catch (error) {
            toast.error("bạn cần mua sản phẩm mới được bình luận");
        } finally {
            setLoading(false);
        }
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
    const nav = useNavigate()
    const handleAddToCart = async (
        product: Product,
        color_id: string,
        size_id: string,
        quantity: number,

    ) => {

        try {
            if (!token) {
                toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng")
                nav('/login')
            }
            await axios.post('/api/cart/add', {
                id: product.id,
                color_id,
                size_id,
                quantity,
                price: product.price
            });
            toast.success('Thêm sản phẩm vào giỏ hàng thành công');
            nav('/cart');
        } catch (error) {
            console.error('Error adding to cart:', error);
        }

    };

    return (
        <>
            {product && (
                <div className="mx-2 mt-4 overflow-hidden md:mx-7 lg:mx-[150px] lg:mt-14">
                    <div className=" lg:flex justify-center lg:space-x-56">

                        <div className=" flex ">
                            <div className="mb-3 h-[700px]  ">
                                <div className="mr-2 p-1 h-[140px] hover:bg-slate-300">
                                    <img className="h-full w-12 lg:h-full lg:w-full object-fill" src={yourImage} alt="" />
                                </div>
                                <div className="mr-2 p-1 h-[140px] hover:bg-slate-300">
                                    <img className="h-full w-12 lg:h-full lg:w-full object-fill" src={yourImage} alt="" />
                                </div>
                                <div className="mr-2 p-1 h-[140px] hover:bg-slate-300">
                                    <img className="h-full w-12 lg:h-full lg:w-full object-fill" src={yourImage} alt="" />
                                </div>
                                <div className="mr-2 p-1 h-[140px] hover:bg-slate-300">
                                    <img className="h-full w-12 lg:h-full lg:w-full object-fill" src={yourImage} alt="" />
                                </div>
                                <div className="mr-2 p-1 h-[140px] hover:bg-slate-300">
                                    <img className="h-full w-12 lg:h-full lg:w-full object-fill" src={yourImage} alt="" />
                                </div>

                            </div>
                            <div className="mb-3 flex justify-center w-[500px] h-[700px]">
                                <img src={product.image} alt="" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div>
                            <div className="text-[16px]">
                                Áo Polo Trắng Recycle Phối họa Tiết Cổ Thân Thiện Với Da 8APCT407TRK
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
                                <span className="text-xs">| Đã bán: 1490</span>
                            </div>
                            <div className="text-xs">
                                Tình trạng:
                                <span className="text-sm font-bold text-green-500">Còn hàng</span>
                            </div>
                            <div className="text-lg font-bold">{product?.price} </div>
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
                                    Add to Cart
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
                                {product.description}
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
                                <div className=" lg:flex justify-center">
                                    <div className="w-full mx-20 mt-10">
                                        <form onSubmit={handleSubmitComment}>
                                            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                                    <textarea
                                                        id="comment"
                                                        name="comment"
                                                        rows={4}
                                                        className="w-full px-0 text-sm text-gray-900 bg-white border-0 outline-none dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 pt-4 ml-4"
                                                        placeholder="Viết đánh giá của bạn về sản phẩm..."
                                                        required
                                                        value={addcomment.comment}
                                                        onChange={handleChangeComment}
                                                    />
                                                    <input type="hidden" name="product_id" value={addcomment.product_id}
                                                        onChange={handleChangeComment}
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                                    <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                                        Post comment
                                                    </button>
                                                    <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                                                        <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth={2} d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                                                            </svg>
                                                            <span className="sr-only">Attach file</span>
                                                        </button>
                                                        <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                                                <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                                            </svg>
                                                            <span className="sr-only">Set location</span>
                                                        </button>
                                                        <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                                            </svg>
                                                            <span className="sr-only">Upload image</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
                                    </div>

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
                                                    src={ProductBycategory.image || 'default-image-url.jpg'}
                                                    alt={ProductBycategory.name}
                                                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                                />
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
                                                    <span className="mr-1 text-xs md:text-sm lg:text-base xl:text-base text-gray-500 line-through hover:text-yellow-500">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(399000)} {/* Giá cũ */}
                                                    </span>
                                                    <span className="text-sm md:text-base lg:text-lg xl:text-xl hover:text-yellow-500">
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ProductBycategory.price)} {/* Giá hiện tại */}
                                                    </span>
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