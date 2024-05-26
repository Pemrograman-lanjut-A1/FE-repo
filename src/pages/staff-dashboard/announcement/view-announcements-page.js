import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { deleteAnnouncementPost } from './delete-announcement-post';
import "./css/view-announcements-page.css";
import Navbar from '../../../navbar';
import AuthService from '../../auth/service/AuthService';
import AuthMiddleware from '../../auth/service/AuthMiddleware';

const ViewAnnouncementsPage = () => {
    var isStaff = false;
    const [userId, setUserId] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        try {
            if (AuthMiddleware.isStaffAuthenticated()) {
                isStaff = true;
                const staffToken = localStorage.getItem('staffToken');
                console.log("Token before decoding:", staffToken);
                const decodedToken = AuthService.parseJwt(staffToken);
                console.log("Decoded token:", decodedToken);
                setUserId(decodedToken.Id); // Set userId based on the decoded token
            } 
            else if (AuthMiddleware.isAuthenticated()){
                const token = localStorage.getItem('token');
                const decodedToken = AuthService.parseJwt(token);
                setUserId(decodedToken.Id);
            }
            else{

            }
        } catch (error) {
            console.error("Error decoding token:", error);
            setError("Error occurred while decoding token");
        }
    }, []); // This effect runs only once when the component mounts

    useEffect(() => {
        if (userId) { // Ensure userId is set before making the API call
            if (isStaff){
                axios.get('http://34.142.244.77/staff/get-all-announcements', {
                //axios.get('http://localhost:8080/staff/get-all-announcements', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('staffToken')}`
                    }
                })
                .then(response => {
                    console.log(response);
                    setAnnouncements(response.data);
                })
                .catch(error => {
                    console.error('Error fetching announcements:', error);
                    setError("This feature is for staff only, please login as staff");
                });
            }
            else{
                axios.get('http://34.142.244.77/staff/get-all-announcements', {
                //axios.get('http://localhost:8080/staff/get-all-announcements', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(response => {
                    console.log(response);
                    setAnnouncements(response.data);
                })
                .catch(error => {
                    console.error('Error fetching announcements:', error);
                    setError("This feature is for staff only, please login as staff");
                });
            };
        }
    }, [userId]); // This effect depends on `userId`

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
    console.log(announcements);
    return (
        <div>
            {isStaff=true ? (<Navbar/>) : ("")}
            <h1>View All Announcements from Spring Boot:</h1>
            {announcements.map(announcement => (
                <div key={announcement.id} className="announcement-card">
                    {announcement.title !== "null" && announcement.title !== "" && (
                        <p><b>{announcement.title}</b></p>
                    )}
                    <p>{announcement.content}</p>
                    {announcement.tag !== "null" && announcement.tag !== "" && (
                        <p>Tag: {announcement.tag}</p>
                    )}
                    <p>{formatDate(announcement.creationTimestamp)}</p>
                    {isStaff=true ? (<button onClick={() => handleDelete(announcement.id)}>Delete</button>) : ("")}
                </div>
            ))}
        </div>
    );
};

export default ViewAnnouncementsPage;
