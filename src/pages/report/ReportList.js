import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ReportList() {
    const { targetId } = useParams(); // Get the target ID from the URL params
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the list of reports based on the target ID from the API
        const fetchReports = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/report/item/${targetId}`);
                const fetchedReports = response.data;
                setReports(fetchedReports);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, [targetId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Reports for Target ID: {targetId}</h2>
            <ul>
                {reports.map((report) => (
                    <li key={report.id}>
                        <p>Description: {report.description}</p>
                        <p>ReportDate: {report.reportDate}</p>
                        {/* Add other report details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReportList;
