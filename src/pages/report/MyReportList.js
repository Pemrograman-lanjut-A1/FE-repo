

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReportCard from "./component/ReportCard";
import AuthService from "../auth/service/AuthService";

function MyReportList() {
    const token = localStorage.getItem('token');
    const decodedToken = AuthService.parseJwt(token);
    const authorId = decodedToken.Id;
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get(`http://34.87.132.52/report/authors/${authorId}`);
                setReports(response.data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, [authorId]);

    const handleDelete = (id) => {
        setReports(reports.filter(report => report.id !== id));
    };

    return (
        <div>
            <h2>My Created Reports {authorId}</h2>
            {reports.map(report => (
                <ReportCard key={report.id} report={report} onDelete={handleDelete} />
            ))}
        </div>
    );
}

export default MyReportList;
