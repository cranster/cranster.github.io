const cart = new Map(); // Using a Map to manage cart items and their quantities

function saveCartToLocalStorage() {
    const cartObject = Object.fromEntries(cart);
    localStorage.setItem('cart', JSON.stringify(cartObject));
}

function addItemToCart(item) {
    const itemId = item.getAttribute('data-id');
    
    // Update quantity for this item in the cart
    if (cart.has(itemId)) {
        cart.set(itemId, cart.get(itemId) + 1);
    } else {
        cart.set(itemId, 1);
    }

    // Save cart to localStorage
    saveCartToLocalStorage();

    console.log('Cart:', [...cart.entries()]); // For debugging

    // Show "Added to cart" message and hide overlay
    const message = item.querySelector('.add-to-cart-message');
    const overlay = item.querySelector('.overlay');
    overlay.style.opacity = 0; // Prevent overlay from showing
    overlay.style.pointerEvents = 'none'; // Disable interaction
    message.style.display = 'block';

    // Trigger ripple animation
    const image = item.querySelector('img');
    image.classList.add('ripple-animation');

    // Hide message and reset class after animation
    setTimeout(() => {
        message.style.display = 'none';
        image.classList.remove('ripple-animation');
        
        // Reset overlay to be displayed on hover again
        overlay.style.opacity = 1;
        overlay.style.pointerEvents = 'auto';
    }, 1000);
}

function handleItemClick(event) {
    event.preventDefault();
    const item = event.currentTarget;
    addItemToCart(item);
}

function handleCartClick() {
    window.location.href = 'cart.html'; // Redirect to cart.html on cart button click
}


function filterByCategory() {
    const category = document.getElementById('categoryFilter').value.toLowerCase();
    const query = document.querySelector('.searchbar').value;
    searchItems(query, category);
}

function searchItems(query, category = 'all') {
    const itemsElement = document.querySelector(".items");
    query = query.toLowerCase().trim();
    let visibleItems = [];

    for (let item of itemsElement.children) {
        if (!(item instanceof Element)) continue;

        const tags = item.dataset.tags.toLowerCase();
        const price = item.dataset.price.toLowerCase();
        const matchesTag = tags.includes(query);
        const matchesPrice = price.includes(query);
        const matchesCategory = category === 'all' || tags.includes(category);
        const isVisible = (matchesTag || matchesPrice) && matchesCategory;
        item.style.display = isVisible ? '' : 'none';

        if (isVisible) {
            visibleItems.push(item);

            // Ensure overlay visibility for interactive items
            const overlay = item.querySelector('.overlay');
            overlay.style.opacity = 1;
            overlay.style.pointerEvents = 'auto';
        }
    }

    const sortBy = document.getElementById('sortOptions').value;
    switch (sortBy) {
        case 'price-high-low':
            visibleItems.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
            break;
        case 'price-low-high':
            visibleItems.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
            break;
    }

    visibleItems.forEach(item => itemsElement.appendChild(item));
    document.querySelector(".noitems").style.display = visibleItems.length === 0 ? 'initial' : 'none';
}

// Event listeners for search and category filter
document.querySelector('.searchbar').addEventListener('keyup', (e) => searchItems(e.target.value));
document.getElementById('categoryFilter').addEventListener('change', filterByCategory);
document.getElementById('sortOptions').addEventListener('change', () => searchItems(document.querySelector('.searchbar').value));

// Cart and Store button event listeners
document.getElementById('store-btn').addEventListener('click', () => {
    window.location.href = 'index.html'; // Change this to your store's main page URL
});

document.getElementById('cart-btn').addEventListener('click', () => {
    window.location.href = 'cart.html'; // Redirect to cart.html on cart button click
});

document.getElementById('request-btn').addEventListener('click', () => {
    window.location.href = 'request.html'; // Redirect to cart.html on cart button click
});

// Apply event listeners to each item
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', handleItemClick);
});
