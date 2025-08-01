import { addToCart } from '../lib/cart';

// Example product data
const product = {
    id: 1,
    name: 'Sample Product',
    price: 10,
    color: "default",
    size: "default",
    quantity: 1
};

// Add to Cart button handler
function handleAddToCart() {
    addToCart(product);
}

// ...existing code...

<button onClick={handleAddToCart}>Add to Cart</button>

// ...existing code...