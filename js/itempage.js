function searchItems(query) {
    const itemsElement = document.querySelector(".items");
    query = query.toLowerCase().trim();

    for (let item of itemsElement.children) {
        if (!(item instanceof Element)) continue;

        // Access the data attributes
        const tags = item.dataset.tags.toLowerCase();
        const price = item.dataset.price.toLowerCase();
        const name = item.querySelector('.item-text')?.innerText.toLowerCase() || '';

        // Check if the query matches the tags, price, or name
        const matchesTag = tags.includes(query);
        const matchesPrice = price.includes(query);
        const matchesName = name.includes(query);

        if (matchesTag || matchesPrice || matchesName) {
            item.removeAttribute("hidden");
        } else {
            item.setAttribute("hidden", "");
        }
    }

    const noitemsVisible = document.querySelectorAll(".item:not([hidden])").length === 0;
    document.querySelector(".noitems").style.display = noitemsVisible ? "initial" : "none";
}

// No need for awaiting JSON, now search can be fully HTML based
document.querySelector('.searchbar').addEventListener('keyup', (e) => {
    searchItems(e.target.value);
});
