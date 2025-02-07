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
    
    // Add an event listener for the submit-button
    button.addEventListener('click', () => {
        const ipAddress = '35.141/157.142';  // Replace with your actual IP address
        
        // Validate if the input is not empty
        if (textarea.value.trim() !== '') {
            // Ping operation
            fetch(`http://${ipAddress}:80`, {
                method: 'HEAD',
                mode: 'no-cors'
            })
            .then(() => {
                console.log('Ping successful');
                alert('Ping successful');
            })
            .catch((error) => {
                console.error('Ping failed', error);
                alert('Ping failed');
            });
        } else {
            alert('Please enter a message before pinging.');
        }
    });
});
