// src/components/ReportCard.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './css/ReportCard.css';
function ReportCard({ report, onDelete }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleEdit = () => {
        navigate(`/report/update/${report.id}`);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://34.87.132.52/report/${report.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            onDelete(report.id);
        } catch (error) {
            console.error('Error deleting report:', error);
        }
    };

    return (
        <div className="report-card">
            <p><strong>Description: </strong>{report.description}</p>
            <p><strong>Report Date:</strong> {new Date(report.reportDate).toLocaleString()}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default ReportCard;
