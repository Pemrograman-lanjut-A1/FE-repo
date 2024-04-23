import React, { useEffect } from 'react';

function CreateAnnouncementPost() {
    useEffect(() => {
        // Function to make the POST request
        const postData = async () => {
            try {
                const response = await fetch('http://localhost:8080/staff/create-announcement', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: 'Hello',
                        content: 'World'
                    }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // const data = await response.json();
                // console.log('Response:', data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        // Call the function to make the POST request
        postData();
    }, []); // Empty dependency array to run the effect only once

    console.log('MyComponent rendered');

    return (
        <div>
            <h1>My Component</h1>
            {/* Your component's UI */}
        </div>
    );
}

export default CreateAnnouncementPost;
