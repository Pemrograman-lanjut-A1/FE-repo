async function createAnnouncementPost(announcementText) {
    console.log(announcementText)
    try {
        const response = await fetch('http://34.128.118.113/staff/create-announcement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: announcementText
            }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Announcement created successfully');
        // const data = await response.json();
        // console.log('Response:', data);
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error to handle it in handleSubmit if needed
    }
}

export { createAnnouncementPost }; // Export the function