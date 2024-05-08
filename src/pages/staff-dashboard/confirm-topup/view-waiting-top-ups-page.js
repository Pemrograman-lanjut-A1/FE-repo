import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmTopUpPut } from './confirm-top-up-put';
import "./css/view-waiting-topups-page.css"
import Navbar from '../../../navbar';


const ViewWaitingTopUpsPage = () => {
  console.log('View Waiting Top Ups rendered');

  const [topups, setTopUps] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:8080/staff/view-waiting-top-ups')
          .then(response => {
              setTopUps(response.data);
          })
          .catch(error => {
              console.error('Error fetching Top Ups:', error);
          });
  }, []);

  const handleConfirm = (id) => {
    // Call the function to delete announcement
    confirmTopUpPut(id)
        .then(() => {
            // Filter out the deleted announcement from the state
            setTopUps(prevtopups => prevtopups.filter(topup => topup.id !== id));
        })
        .catch(error => {
            console.error('Error confirming topup:', error);
            // Handle error if needed
        });
};

  return (
      <div>
        <Navbar/>
          <h1>View All Waiting Top Ups from Spring Boot:</h1>
          {topups.map(topup => (
              <div key={topup.id} className="topup-card">
                  <p>{topup.userId}</p>
                  <p>{topup.amount}</p>
                  <button onClick={() => handleConfirm(topup.id)}>Confirm</button>
              </div>
          ))}
      </div>
  );
};

export default ViewWaitingTopUpsPage;