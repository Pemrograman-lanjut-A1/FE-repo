import React from 'react';
import './component/css/IntermezzoPage.css';
import AuthService from "../auth/service/AuthService";

function IntermezzoPage() {
    const navigateToMyReports = () => {
        // Redirect to My Reports page
        window.location.href = "/report/my-reports";
    };

    const token = localStorage.getItem('token');
    const decodedToken = AuthService.parseJwt(token);
    const userId = decodedToken.Id;
    const reportsReceivedPath = `/report/list/${userId}`;

    return (
        <div className="intermezzo-container">
            <h2>Reports Navigation</h2>
            <button onClick={navigateToMyReports} className="intermezzo-button">My Reports</button>
            <button onClick={() => window.location.href = reportsReceivedPath} className="intermezzo-button">Reports Received</button>
        </div>
    );
}

export default IntermezzoPage;
