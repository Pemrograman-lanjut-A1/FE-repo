import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './component/css/ReportCard.css'; // Assuming CSS is in the same folder

function ReportList() {
    const { targetId } = useParams(); // Get the target ID from the URL params
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the list of reports based on the target ID from the API
        const fetchReports = async () => {
            try {
                const response = await axios.get(`http://34.87.132.52/report/items/${targetId}`);
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
            <h2>Report List</h2>
            <div className="report-list">
                {reports.map((report) => (
                    <div key={report.id} className="report-card">
                        <p><strong>Description:</strong> {report.description}</p>
                        <p><strong>Report Date:</strong> {new Date(report.reportDate).toLocaleString()}</p>
                        {/* Add other report details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReportList;
