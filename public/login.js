 // Attach event listener to the login form
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Retrieve form data
    const id = document.getElementById('id').value.trim();
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        // Send login request to the server
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, password, role }), // Send credentials in JSON format
        });

        // Handle the server response
        if (response.ok) {
            const data = await response.json(); // Parse the response as JSON
            console.log('Login successful. Redirecting to:', data.redirect);
            window.location.href = data.redirect; // Redirect to the specified page
        } else {
            const errorData = await response.json(); // Parse error details
            alert(`Login failed: ${errorData.error}`); // Display error message
            console.error('Login error:', errorData);
        }
    } catch (err) {
        console.error('Error during login process:', err); // Log any unexpected errors
        alert('An error occurred while processing your login. Please try again later.');
    }
});
                                                                                                                                                                                                          
                                                                                                                                                                                                               