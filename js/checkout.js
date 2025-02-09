document.addEventListener('DOMContentLoaded', () => {
    // Retrieve cart data and selected payment method from local storage
    const cartData = JSON.parse(localStorage.getItem('cart'));
    const selectedPayment = localStorage.getItem('selectedPayment');

    // Log the retrieved data for debugging purposes
    console.log('Cart Data: ', cartData);
    console.log('Selected Payment Method: ', selectedPayment);

    // DOM elements
    const cartSummaryElement = document.getElementById('cart-summary');
    const paymentSummaryElement = document.getElementById('payment-summary');
    const paymentImageElement = document.getElementById('payment-image');

    // Display cart items
    if (cartData && cartSummaryElement) {
        Object.entries(cartData).forEach(([itemId, quantity]) => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${itemId}: ${quantity}`;
            cartSummaryElement.appendChild(itemElement);
        });
    }

    // Display payment method and related image
    if (selectedPayment) {
        paymentSummaryElement.textContent = `Payment Method: ${selectedPayment}`;
        
        if (selectedPayment === "cashapp") {
            if (paymentImageElement) {
                const imgElement = document.createElement('img');
                imgElement.src = '/images/cashapppayment.png';
                imgElement.alt = 'Cash App Payment';
                paymentImageElement.appendChild(imgElement);
            }
        }
    }

    // Add logic for further processing, if needed
});
const navigateTo = (path) => {
    window.location.href = `/${path}`;
};

document.getElementById('store-btn')?.addEventListener('click', event => {
    event.preventDefault();
    navigateTo('store');
});

document.getElementById('cart-btn')?.addEventListener('click', event => {
    event.preventDefault();
    navigateTo('cart');
});

document.getElementById('request-btn')?.addEventListener('click', event => {
    event.preventDefault();
    navigateTo('request');
});