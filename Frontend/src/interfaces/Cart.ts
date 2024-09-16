export type CartItemProps = {
    id:number 
    name: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    images: string 
}
export type CartSummaryProps = {
    totalItems: number;
    totalPrice: number;
} 
export type Cart_detail = {
    id: number
    cart_id: number
    product_detail: Product_detail[]
    quantity: number
    price: number
    total_price: number
}
export type Product_detail = {
    id: number|string
    product_id: number
    size_id: number
    color_id: number
}