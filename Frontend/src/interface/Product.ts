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