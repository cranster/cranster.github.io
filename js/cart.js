document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartData = JSON.parse(localStorage.getItem('cart'));

    if (cartData) {
        Object.entries(cartData).forEach(([itemId, quantity]) => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `Item: ${itemId}, Quantity: ${quantity}`;
            cartItemsContainer.appendChild(itemElement);
        });
    } else {
        cartItemsContainer.textContent = 'Your cart is empty.';
    }
});

document.getElementById('store-btn').addEventListener('click', () => {
    window.location.href = 'index.html'; // Change this to your store's main page URL
});

document.getElementById('cart-btn').addEventListener('click', () => {
    window.location.href = 'cart.html'; // Redirect to cart.html on cart button click
});
