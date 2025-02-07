document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
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
    Object.entries(cartData).forEach(([itemId, quantity]) => {
        const itemInfo = itemsData[itemId];
        if (!itemInfo) return;
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        const imgElement = document.createElement('img');
        imgElement.src = itemInfo.image;
        imgElement.width = 100;
        imgElement.height = 100;
        
        // Create price element with new class
        const priceElement = document.createElement('span');
        priceElement.className = 'item-price';
        const updateItemPrice = () => {
            const totalPrice = (Math.ceil(itemInfo.price * quantity) - 0.01).toFixed(2);
            priceElement.textContent = `Price: $${totalPrice}`;
        };
        updateItemPrice();

        // Create quantity input field with new class
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
        });
        quantityElement.textContent = 'Qty: ';
        quantityElement.appendChild(quantityInput);
        
        // Create remove button with trash icon
        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        removeButton.addEventListener('click', () => {
            delete cartData[itemId];
            localStorage.setItem('cart', JSON.stringify(cartData));
            itemElement.remove();
        });

        itemElement.appendChild(imgElement);
        itemElement.appendChild(priceElement);
        itemElement.appendChild(quantityElement);  // Append quantityElement after priceElement
        itemElement.appendChild(removeButton);
        cartItemsContainer.appendChild(itemElement);
    });
    
    const navigateTo = (path) => {
        window.location.href = `/${path}`;
    };
    const storeButton = document.getElementById('store-btn');
    const cartButton = document.getElementById('cart-btn');
    const requestButton = document.getElementById('request-btn');
    storeButton?.addEventListener('click', (event) => {
        event.preventDefault();
        navigateTo('store');
    });
    cartButton?.addEventListener('click', (event) => {
        event.preventDefault();
        navigateTo('cart');
    });
    requestButton?.addEventListener('click', (event) => {
        event.preventDefault();
        navigateTo('request');
    });
    const payButton = document.getElementById('pay-button');
    payButton?.addEventListener('click', () => {
        const webhookURL = 'YOUR_WEBHOOK_HERE';
        const message = {
            content: 'hi',
        };
        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        })
        .then(response => {
            if (response.ok) {
                console.log('Message sent successfully');
            } else {
                console.error('Error in sending message:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        });
    });
});