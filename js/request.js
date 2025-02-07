document.addEventListener('DOMContentLoaded', () => {
    // Navigation function
    const navigateTo = (path) => {
        window.location.href = `/${path}`;
    };

    // Assign the navigation function to window to make it accessible globally
    window.navigateTo = navigateTo;

    // Other JavaScript for request page
    const textarea = document.querySelector('.centered-textbox');
    const button = document.querySelector('.submit-button');
    button.addEventListener('click', () => {
        const message = textarea.value.trim();
        const webhookURL = 'https://discord.com/api/webhooks/1336340473043877970/uOrv0JIFSKtetjre17vFdygTs7UaJIaj9h2DcjgbMPkIlir04cOtRqgDTMx4zsoQEge6';

        if (message !== '') {
            fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: message })
            })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully!');
                    textarea.value = ''; // Clear textarea after sending
                } else {
                    alert('Failed to send message.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending your message.');
            });
        } else {
            alert('Please enter a message before submitting.');
        }
    });
});
