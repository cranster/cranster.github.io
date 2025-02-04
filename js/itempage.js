function filterByCategory() {
    const category = document.getElementById('categoryFilter').value.toLowerCase();
    const query = document.querySelector('.searchbar').value;
    searchItems(query, category); // Pass category to the search function
}

function searchItems(query, category = 'all') {
    const itemsElement = document.querySelector(".items");
    query = query.toLowerCase().trim();
    let visibleItems = [];

    for (let item of itemsElement.children) {
        if (!(item instanceof Element)) continue;
        
        // Access the data attributes
        const tags = item.dataset.tags.toLowerCase();
        const price = item.dataset.price.toLowerCase();
        const name = item.querySelector('.item-text')?.innerText.toLowerCase() || '';

        const matchesTag = tags.includes(query);
        const matchesPrice = price.includes(query);
        const matchesName = name.includes(query);
        const matchesCategory = category === 'all' || tags.includes(category);

        const isVisible = (matchesTag || matchesPrice || matchesName) && matchesCategory;
        item.style.display = isVisible ? '' : 'none';
        
        if (isVisible) visibleItems.push(item);
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

// Event listeners
document.querySelector('.searchbar').addEventListener('keyup', (e) => searchItems(e.target.value));
document.getElementById('categoryFilter').addEventListener('change', filterByCategory);
document.getElementById('sortOptions').addEventListener('change', () => searchItems(document.querySelector('.searchbar').value));
