const cart = new Map();
const cooldowns = new Map();

function getAbsolutePath(relativePath) {
  const currentPath = window.location.pathname;
  if (currentPath.includes('/store')) {
    return `/store${relativePath}`;
  } else {
    return relativePath;
  }
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
  const loadedCart = JSON.parse(localStorage.getItem('cart') || '{}');
  Object.entries(loadedCart).forEach(([itemId, quantity]) => {
    cart.set(itemId, quantity);
  });
}

function saveCartToLocalStorage() {
  const cartObject = Object.fromEntries(cart);
  localStorage.setItem('cart', JSON.stringify(cartObject));
}

function updateCounters(item) {
  if (!item) return;
  const itemId = item.getAttribute('data-id');
  const cartCounter = item.querySelector('.cart-counter');
  const stockCounter = item.querySelector('.stock-counter');

  if (!itemId || !cartCounter || !stockCounter) return;

  const quantity = cart.get(itemId);
  const stock = parseInt(stockCounter.getAttribute('data-stock'), 10);

  if (quantity && quantity > 0) {
    cartCounter.textContent = `${quantity}`;
    cartCounter.style.display = 'block';
  } else {
    cartCounter.style.display = 'none';
  }

  stockCounter.textContent = `Stock: ${stock}`;
  stockCounter.style.display = 'block';
}

function addItemToCart(item) {
  const itemId = item.getAttribute('data-id');

  if (cooldowns.has(itemId)) {
    const cooldownEnd = cooldowns.get(itemId);
    const now = Date.now();
    if (now < cooldownEnd) {
      console.log(`Item ${itemId} is cooling down.`);
      return;
    }
  }

  if (cart.has(itemId)) {
    cart.set(itemId, cart.get(itemId) + 1);
  } else {
    cart.set(itemId, 1);
  }

  // Save cart to localStorage
  saveCartToLocalStorage();
  updateCounters(item);

  const message = item.querySelector('.add-to-cart-message');
  const overlay = item.querySelector('.overlay');
  overlay.style.opacity = 0;
  overlay.style.pointerEvents = 'none';
  message.style.display = 'block';

  const image = item.querySelector('img');
  image.classList.add('ripple-animation');
  setTimeout(() => {
    message.style.display = 'none';
    image.classList.remove('ripple-animation');
    overlay.style.opacity = 1;
    overlay.style.pointerEvents = 'auto';
    const cooldownDuration = 500;
    cooldowns.set(itemId, Date.now() + cooldownDuration);
  }, 1000);
}

function handleItemClick(event) {
  event.preventDefault();
  const item = event.currentTarget;
  addItemToCart(item);
}

function handleCartClick() {
  window.location.href = getAbsolutePath('/cart');
}

function filterByCategory() {
  const category = document.getElementById('categoryFilter').value.toLowerCase();
  const query = document.querySelector('.searchbar').value;
  searchItems(query, category);
}

function searchItems(query, category = 'all') {
  const itemsElement = document.querySelector('.items');
  query = query.toLowerCase().trim();
  let visibleItems = [];
  itemsElement.querySelectorAll('.item').forEach(item => {
    if (!(item instanceof Element)) return;
    const tags = item.dataset.tags.toLowerCase();
    const price = item.dataset.price.toLowerCase();
    const matchesTag = tags.includes(query);
    const matchesPrice = price.includes(query);
    const matchesCategory = category === 'all' || tags.includes(category);
    const isVisible = (matchesTag || matchesPrice) && matchesCategory;
    item.style.display = isVisible ? '' : 'none';
    if (isVisible) {
      visibleItems.push(item);
      const overlay = item.querySelector('.overlay');
      overlay.style.opacity = 1;
      overlay.style.pointerEvents = 'auto';
    }
  });

  const sortBy = document.getElementById('sortOptions').value;
  switch (sortBy) {
    case 'price-high-low':
      visibleItems.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
      break;
    case 'price-low-high':
      visibleItems.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
      break;
  }
  
  visibleItems.forEach(item => {
    itemsElement.appendChild(item);
    updateCounters(item); 
  });
  
  document.querySelector('.noitems').style.display = visibleItems.length === 0 ? 'initial' : 'none';
}

function initializePage() {
  loadCartFromLocalStorage();
  document.querySelectorAll('.item').forEach(item => {
    console.log(item);
    updateCounters(item);
    item.addEventListener('click', handleItemClick);
  });
}

// Initialize cart page operations
initializePage();

// Event listeners for search and category filter 
document.querySelector('.searchbar').addEventListener('keyup', (e) => searchItems(e.target.value));

document.getElementById('categoryFilter').addEventListener('change', filterByCategory);

document.getElementById('sortOptions').addEventListener('change', () => searchItems(document.querySelector('.searchbar').value));

function navigateTo(page) {
  window.location.href = `/${page}`;
}

// Adjust the event listeners accordingly:
document.getElementById('store-btn').addEventListener('click', () => navigateTo('store'));

document.getElementById('cart-btn').addEventListener('click', () => navigateTo('cart'));

document.getElementById('request-btn').addEventListener('click', () => navigateTo('request'));