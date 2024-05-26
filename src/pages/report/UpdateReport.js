import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateReport() {
    const { id } = useParams(); // Get the report ID from the URL params
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the report data from the API
        const fetchReport = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/report/${id}`);
                const report = response.data;
                setDescription(report.description);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching report:', error);
            }
        };

        fetchReport();
    }, [id]);

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedReport = {
            description: description,
        };

        try {
            // Send PUT request to update the report
            await axios.put(`http://localhost:8080/report/${id}`, updatedReport);
            console.log('Report updated successfully');
            // Redirect the user to the report details page or another appropriate page
        } catch (error) {
            console.error('Error updating report:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Update Report</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateReport;
