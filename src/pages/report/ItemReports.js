import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ItemReports() {
    const { itemId } = useParams();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!itemId) {
            setLoading(false);
            setError("No item ID provided");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/report/items/${itemId}`);
                setReports(response.data);
            } catch (error) {
                setError("Error fetching data: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [itemId]);

    if (loading) return <div>Loading reports...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div>
            <h2>Reports for Item ID: {itemId}</h2>
            <ul>
                {reports.map((report, index) => (
                    <li key={index}>
                        {report.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemReports;
