import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AuthService from "../auth/service/AuthService";

function CreateReport() {
    const [description, setDescription] = useState('');
    const location = useLocation();
    const [targetId, setTargetId] = useState('');
    const [targetType, setTargetType] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Extract targetId and targetType from query parameters
        const searchParams = new URLSearchParams(location.search);
        const targetId = searchParams.get('targetId');
        const targetType = searchParams.get('targetType');

        setTargetId(targetId);
        setTargetType(targetType);
        setLoading(false);
    }, [location.search]);

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const decodedToken = AuthService.parseJwt(token);
        const userId = decodedToken.Id;
        // Create report object with form data
        const report = {
            authorId: userId,
            description: description,
            targetId: targetId,
            targetType: targetType
        };

        try {
            // Send POST request to API to create report
            const response = await axios.post('http://localhost:8080/report/create', report, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Report created:', response.data);

            setDescription('');
            window.location.href = '/report/my-reports';
        } catch (error) {
            console.error('Error creating report:', error);
        }
    };

    return (
        <div>
            <h2>Create Report</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateReport;
