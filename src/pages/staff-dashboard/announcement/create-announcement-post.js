async function createAnnouncementPost(announcementData) {
    console.log(announcementData);
    try {
        const response = await fetch('http://34.142.244.77/staff/create-announcement', {
        //const response = await fetch('http://localhost:8080/staff/create-announcement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('staffToken')}`,
            },
            body: JSON.stringify({
                title: announcementData.title,
                content: announcementData.content,
                tag: announcementData.tag
            }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Announcement created successfully');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { createAnnouncementPost }; // Export the function
