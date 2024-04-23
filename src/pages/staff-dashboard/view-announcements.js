import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const ViewAnnouncements = () => {
    console.log('View announcements rendered');

    const [jsonData, setJsonData] = useState('');  
  useEffect(() => {
    axios.get('http://localhost:8080/staff/get-all-announcements')
      .then(response => {
        setJsonData(JSON.stringify(response.data));
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
      });
  }, []);

  return (
    <div>
      <h1> View All ANnouncements Message from Spring Boot:</h1>
      <pre>{jsonData}</pre> {/* Use <pre> tag to preserve formatting */}
    </div>
  );
}

    
 
export default ViewAnnouncements;