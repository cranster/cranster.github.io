document.addEventListener('DOMContentLoaded', () => {
    // Navigation function
    const navigateTo = (path) => {
        window.location.href = `/${path}`;
    };

    // Assign the navigation function to the window to make it accessible globally
    window.navigateTo = navigateTo;

    // Other JavaScript for request page
    const textarea = document.querySelector('.centered-textbox');
    const button = document.querySelector('.submit-button');
    
    // Add an event listener for the submit-button
    button.addEventListener('click', () => {
        const ipAddress = '35.141.157.142';  // Use the corrected IP address format
        
        // Use HTTPS for the ping operation
        fetch(`https://${ipAddress}:443`, {  // Assuming the service is accessible over HTTPS
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
    });
});
