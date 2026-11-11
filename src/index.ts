import { calculateTotal, calculateQuantity } from "./order.js";
import type { OrderItem } from "./order.js";


const items: OrderItem[] = [
    { name: "Notebook", price: 4.99, quantity: 2 },
    { name: "Pen", price: 1.49, quantity: 3 },
    { name: "Backpack", price: 29.99, quantity: 1 },
];

const total = calculateTotal(items);
const quantity = calculateQuantity(items);
console.log(`Total Order Amount: $${total.toFixed(2)}`);
console.log(`Total Items: ${quantity}`);