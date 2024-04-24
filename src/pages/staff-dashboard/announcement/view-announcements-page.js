import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {deleteAnnouncementPost} from './delete-announcement-post';
import "./css/view-announcements-page.css"


const ViewAnnouncementsPage = () => {
  console.log('View announcements rendered');

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:8080/staff/get-all-announcements')
          .then(response => {
              setAnnouncements(response.data);
          })
          .catch(error => {
              console.error('Error fetching announcements:', error);
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

  return (
      <div>
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