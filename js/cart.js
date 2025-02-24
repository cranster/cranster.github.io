document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    const cartTotalElement = document.getElementById('cart-total');
    const payButton = document.getElementById('pay-button');
    const paymentOptions = document.querySelector('.payment-options');
    const itemsData = {
        'greenmonster': { image: '/images/greenmonster.jpg', price: 2.99 },
        'peachmonster': { image: '/images/peachmonster.jpg', price: 2.99 },
        'strawberrymonster': { image: '/images/strawberrymonster.jpg', price: 2.99 },
        'whitemonster': { image: '/images/whitemonster.jpg', price: 2.99 },
        'peachvibecelsius': { image: '/images/peachvibecelsius.jpg', price: 2.99 },
        'tropicalvibecelsius': { image: '/images/tropicalvibecelsius.jpg', price: 2.99 },
        'watermeloncelsius': { image: '/images/watermeloncelsius.jpg', price: 2.99 },
        'sugarfreewinterredbull': { image: '/images/sugarfreewinterredbull.jpg', price: 3.49 },
    };
    const cartData = JSON.parse(localStorage.getItem('cart')) || {};
    
    const updateCartTotal = () => {
        let totalAmount = 0;
        let itemCount = 0;
        Object.entries(cartData).forEach(([itemId, quantity]) => {
            const itemInfo = itemsData[itemId];
            if (itemInfo) {
                const adjustedItemPrice = itemInfo.price + 0.01;
                const itemTotalPrice = (adjustedItemPrice * quantity - 0.01).toFixed(2);
                totalAmount += parseFloat(itemTotalPrice);
                itemCount += quantity;
            }
        });
        totalAmount = totalAmount.toFixed(2);
        if (itemCount > 0) {
            cartTotalElement.style.display = 'block';
            paymentOptions.style.display = 'block';
            totalAmountElement.textContent = totalAmount;
            payButton.textContent = 'CHECKOUT';
            payButton.onclick = () => showPaymentOptions();
        } else {
            cartTotalElement.style.display = 'none';
            paymentOptions.style.display = 'none';
            payButton.textContent = 'No items in cart';
            payButton.onclick = () => navigateTo('store');
        }
    };

    Object.entries(cartData).forEach(([itemId, quantity]) => {
        const itemInfo = itemsData[itemId];
        if (!itemInfo) return;
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        const imgElement = document.createElement('img');
        imgElement.src = itemInfo.image;
        imgElement.width = 100;
        imgElement.height = 100;
        const priceElement = document.createElement('span');
        priceElement.className = 'item-price';
        const updateItemPrice = () => {
            const adjustedItemPrice = itemInfo.price + 0.01;
            const itemTotalPrice = (adjustedItemPrice * quantity - 0.01).toFixed(2);
            priceElement.textContent = `Price: $${itemTotalPrice}`;
        };
        updateItemPrice();
        const quantityElement = document.createElement('span');
        quantityElement.className = 'item-quantity';
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = quantity;
        quantityInput.min = 1;
        quantityInput.addEventListener('change', () => {
            quantity = parseInt(quantityInput.value, 10);
            if (quantity <= 0) {
                delete cartData[itemId];
                itemElement.remove();
            } else {
                cartData[itemId] = quantity;
            }
            localStorage.setItem('cart', JSON.stringify(cartData));
            updateItemPrice();
            updateCartTotal();
        });
        quantityElement.textContent = 'Qty: ';
        quantityElement.appendChild(quantityInput);
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        removeButton.addEventListener('click', () => {
            delete cartData[itemId];
            localStorage.setItem('cart', JSON.stringify(cartData));
            itemElement.remove();
            updateCartTotal();
        });
        itemElement.appendChild(imgElement);
        itemElement.appendChild(priceElement);
        itemElement.appendChild(quantityElement);
        itemElement.appendChild(removeButton);
        cartItemsContainer.appendChild(itemElement);
    });
    
    // Get references to payment buttons and pay button
    const paymentButtons = document.querySelectorAll('.payment-button');
    let selectedPayment = null;
    
    // Add event listeners to each payment button
    paymentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Log the click to see if it registers
            console.log(`Clicked payment button for: ${button.dataset.payment}`);
    
            // Remove the 'selected' class from all buttons
            paymentButtons.forEach(btn => {
                btn.classList.remove('selected');
            });

            // Add the 'selected' class to the clicked button
            button.classList.add('selected');
    
            // Set the selectedPayment to the clicked button's data-payment value
            selectedPayment = button.dataset.payment;
        });
    });
    
    // Add event listener to the pay button
    payButton.addEventListener('click', function() {
        console.log("Pay button clicked!");

        if (selectedPayment) {
            console.log(`Proceeding with payment method: ${selectedPayment}`);

            // Save the payment method in local storage
            localStorage.setItem('selectedPayment', selectedPayment);
            
            // Redirect to the checkout page
            window.location.href = '/checkout';
        } else {
            console.log("No payment method selected.");
            alert("Please select a payment method.");
        }
    });

    updateCartTotal();
    
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
});