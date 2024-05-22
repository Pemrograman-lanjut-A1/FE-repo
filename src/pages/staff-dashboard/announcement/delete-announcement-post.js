import React, { useEffect } from 'react';

async function deleteAnnouncementPost(id){
    try {
        const response = await fetch('http://34.128.118.113/staff/delete-announcement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id
            }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // const data = await response.json();
        console.log("Delete request called, id: ", id);
    } catch (error) {
        console.error('Error:', error);
    }
}

export { deleteAnnouncementPost }; // Export the function