import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {deleteAnnouncementPost} from './delete-announcement-post';
import "./css/view-announcements-page.css"
import Navbar from '../../../navbar';
import AuthService from '../../auth/service/AuthService';



const ViewAnnouncementsPage = () => {
    var error_code;
    const [userId, setUserId] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = AuthService.parseJwt(token);
            const userId = decodedToken.Id; 
            setUserId(userId)
        }
        else{
            error_code = "error token";
        }
    } catch (error) {
        console.error("Something happened?", error);
        error_code = "error something";
    }
  console.log('View announcements rendered');


  useEffect(() => {
      axios.get('http://34.128.118.113/staff/get-all-announcements')
          .then(response => {
              setAnnouncements(response.data);
          })
          .catch(error => {
              console.error('Error fetching announcements:', error);
              error_code = "Error backend"
              return(<h1>{error_code}</h1>)
              
          });
  }, []);

  const handleDelete = (id) => {
      // Call the function to delete announcement
      deleteAnnouncementPost(id)
          .then(() => {
              // Filter out the deleted announcement from the state
              setAnnouncements(prevAnnouncements => prevAnnouncements.filter(announcement => announcement.id !== id));
          })
          .catch(error => {
              console.error('Error deleting announcement:', error);
              // Handle error if needed
          });
  };

  if (error_code){
    return(<h1>{error_code}</h1>)
  }

  return (
      <div>
        <Navbar/>
          <h1>View All Announcements from Spring Boot:</h1>
          {announcements.map(announcement => (
              <div key={announcement.id} className="announcement-card">
                  <p>{announcement.content}</p>
                  <button onClick={() => handleDelete(announcement.id)}>Delete</button>
              </div>
          ))}
      </div>
  );
};

export default ViewAnnouncementsPage;