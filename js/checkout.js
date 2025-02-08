document.addEventListener("DOMContentLoaded", function() {
    console.log("Script is loaded and running!");

    // Get references to payment buttons and pay button
    const paymentButtons = document.querySelectorAll('.payment-button');
    const payButton = document.getElementById('pay-button');
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
            console.log(`Proceeding to payment method: ${selectedPayment}`);
            window.location.href = `/${selectedPayment}`;
        } else {
            console.log("No payment method selected.");
            alert("Please select a payment method.");
        }
    });
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