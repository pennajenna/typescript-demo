export interface OrderItem {
    name: string;
    price: number;
    quantity: number;
}

export function calculateTotal (
    items: OrderItem[]
): number {
    return items.reduce(
        (total, item) => total +item.price * item.quantity, 
        0
    );
}