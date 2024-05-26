import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { deleteAnnouncementPost } from './delete-announcement-post';
import "./css/view-announcements-page.css";
import Navbar from '../../../navbar';
import AuthService from '../../auth/service/AuthService';
import AuthMiddleware from '../../auth/service/AuthMiddleware';

const ViewAnnouncementsPage = () => {
    const [isStaff, setIsStaff] = useState(false);
    const [userId, setUserId] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const staffToken = localStorage.getItem('staffToken');
            const token = localStorage.getItem('token');

            if (AuthMiddleware.isStaffAuthenticated()) {
                setIsStaff(true);
                const decodedToken = AuthService.parseJwt(staffToken);
                setUserId(decodedToken.Id);
            } else if (AuthMiddleware.isAuthenticated()) {
                setIsStaff(false);
                const decodedToken = AuthService.parseJwt(token);
                setUserId(decodedToken.Id);
            } else {
                setError("No valid token found");
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            setError("Error occurred while decoding token");
        }
    }, []); // This effect runs only once when the component mounts
    console.log("is staff: " + isStaff);
    useEffect(() => {
        if (userId) { // Ensure userId is set before making the API call
            const url = 'http://34.142.244.77/staff/get-all-announcements';
            const token = isStaff ? localStorage.getItem('staffToken') : localStorage.getItem('token');
            
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response);
                setAnnouncements(response.data);
            })
            .catch(error => {
                console.error('Error fetching announcements:', error);
                setError("Error fetching announcements");
            });
        }
    }, [userId, isStaff]); // This effect depends on `userId` and `isStaff`

    const handleDelete = (id) => {
        deleteAnnouncementPost(id)
        .then(() => {
            setAnnouncements(prevAnnouncements => prevAnnouncements.filter(announcement => announcement.id !== id));
        })
        .catch(error => {
            console.error('Error deleting announcement:', error);
            setError("Error deleting announcement");
        });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div>
            {isStaff ? (<Navbar/>) : null}
            <h1>Announcements</h1>
            {announcements.map(announcement => (
                <div key={announcement.id} className="announcement-card">
                    {announcement.title && (
                        <p><b>{announcement.title}</b></p>
                    )}
                    <p>{announcement.content}</p>
                    {announcement.tag && (
                        <p>Tag: {announcement.tag}</p>
                    )}
                    <p>{formatDate(announcement.creationTimestamp)}</p>
                    {isStaff && (
                        <button onClick={() => handleDelete(announcement.id)}>Delete</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ViewAnnouncementsPage;
