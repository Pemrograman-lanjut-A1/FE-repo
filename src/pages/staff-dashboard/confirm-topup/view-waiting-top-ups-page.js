import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmTopUpPut } from './confirm-top-up-put';
import "./css/view-waiting-topups-page.css";
import Navbar from '../../../navbar';

const ViewWaitingTopUpsPage = () => {
  console.log('View Waiting Top Ups rendered');

  const [topups, setTopUps] = useState([]);

  useEffect(() => {
      axios.get('http://34.142.244.77/staff/view-waiting-top-ups', {
      //axios.get('http://localhost:8080/staff/view-waiting-top-ups', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('staffToken')}`
        }
      })
          .then(response => {
              setTopUps(response.data);
          })
          .catch(error => {
              console.error('Error fetching Top Ups:', error);
          });
  }, []);

  const handleConfirm = (id) => {
    confirmTopUpPut(id)
        .then(() => {
            setTopUps(prevTopUps => prevTopUps.filter(topup => topup.id !== id));
        })
        .catch(error => {
            console.error('Error confirming topup:', error);
        });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
      <div>
        <Navbar/>
        <h1>View All Waiting Top Ups:</h1>
        {topups.map(topup => (
          <div key={topup.id} className="topup-card">
            <p><strong>User ID:</strong> {topup.userId}</p>
            <p><strong>Wallet Amount:</strong> {topup.wallet.amount}</p>
            <p><strong>Top Up Amount:</strong> {topup.amount}</p>
            <p><strong>Top Up Method:</strong> {topup.topUpMethod}</p>
            <p><strong>Date Added:</strong> {formatDate(topup.dateAdded)}</p>
            <button onClick={() => handleConfirm(topup.id)}>Confirm</button>
          </div>
        ))}
      </div>
  );
};

export default ViewWaitingTopUpsPage;