export type CartItemProps = {
    id:number
    name: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
}
export type CartSummaryProps = {
    totalItems: number;
    totalPrice: number;
} 