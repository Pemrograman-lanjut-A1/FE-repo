import React from "react";
import AuthService from "./auth/service/AuthService";
import { useNavigate } from 'react-router-dom';
import AuthMiddleware from "./auth/service/AuthMiddleware";
 
const Home = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        await AuthService.logout(token)
        AuthMiddleware.logout();
        navigate('/signin');
    }
    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
 
export default Home;