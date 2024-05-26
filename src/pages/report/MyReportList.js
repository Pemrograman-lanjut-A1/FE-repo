import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MyReportList() {
    const { authorId } = useParams(); // Get the author ID from the URL params
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the list of reports based on the author ID from the API
        const fetchReports = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/report/authors/${authorId}`);
                const fetchedReports = response.data;
                setReports(fetchedReports);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, [authorId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Reports by Author ID: {authorId}</h2>
            <ul>
                {reports.map((report) => (
                    <li key={report.id}>
                        <p>Description: {report.description}</p>
                        <p>Report Date: {report.reportDate}</p>
                        {/* Add other report details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyReportList;
