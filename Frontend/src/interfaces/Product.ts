// Định nghĩa kiểu cho variants (biến thể)
export interface ProductVariants {
    sizes: string[];
    colors: string[];
}

// Định nghĩa kiểu cho sản phẩm
export interface Product {
    id: string;
    name: string;
    price: number
    image: string;
    variants: ProductVariants;
    description: string;
    sub_category_id: string
    // color: Colors[]
    // size: Sizes[]
}
export interface ApiResponse {
    status: string;
    products: Product[];
    products_hot: Product[];
    products_sale: Product[];
    products_showhome: Product[];
}

export interface Colors {
    id: string
    name: string
    color_code: string
}

export interface Sizes {
    id: string
    name: string
}
export interface Comment{
    id:string,
    rating:string,
    comment:string
}