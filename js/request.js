document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartData = JSON.parse(localStorage.getItem('cart')) || {};

    Object.entries(cartData).forEach(([itemId, quantity]) => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `Item: ${itemId}, Quantity: ${quantity}`;
        cartItemsContainer.appendChild(itemElement);
    });

    const payButton = document.getElementById('pay-button');
    if (payButton) {
        payButton.addEventListener('click', () => {
            // Example payload for your Discord webhook
            const webhookURL = 'https://discord.com/api/webhooks/1336186026015719477/q0mFfbylLsE8N9JdHD0MSiCs_K53WgQ_npdo6_Ul9W0rsx1SAP6G5LLU-4dO2mzc6tqa';
            const message = {
                content: 'hi'
            };

            // Send a request to the Discord webhook
            fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            }).then(response => {
                if (response.ok) {
                    console.log('Message sent successfully');
                } else {
                    console.error('Error in sending message:', response.statusText);
                }
            }).catch(error => {
                console.error('Error during fetch:', error);
            });
        });
    }

    // Navigation button handling
    const navigateTo = (path) => {
        window.location.href = `/${path}`;
    };

    const storeButton = document.getElementById('store-btn');
    const cartButton = document.getElementById('cart-btn');
    const requestButton = document.getElementById('request-btn'); // Assuming request page has a request button

    if (storeButton) {
        storeButton.addEventListener('click', (event) => {
            event.preventDefault();
            navigateTo('store');
        });
    }

    if (cartButton) {
        cartButton.addEventListener('click', (event) => {
            event.preventDefault();
            navigateTo('cart');
        });
    }

    // Ensure handlers for the request button as well, if applicable
    if (requestButton) {
        requestButton.addEventListener('click', (event) => {
            event.preventDefault();
            navigateTo('request');
        });
    }
});
