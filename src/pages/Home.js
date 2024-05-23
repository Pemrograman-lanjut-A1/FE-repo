import React from "react";
import AuthService from "./auth/service/AuthService";
 
const Home = () => {
    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        const staffToken = localStorage.getItem('staffToken');
        if (token) {
            try {
                await AuthService.logout(`Bearer ${token}`);
                localStorage.removeItem('token');
                localStorage.removeItem('staffToken');
                localStorage.removeItem('refreshToken');
              } catch (error) {
                console.error('Logout failed:', error.message);
              }
        }

        else if (staffToken){
            try {
                await AuthService.logout(`Bearer ${staffToken}`);
                localStorage.removeItem('token');
                localStorage.removeItem('staffToken');
                localStorage.removeItem('refreshToken');
                //window.location.href = '/signin';
              } catch (error) {
                console.error('Logout failed:', error.message);
              }

        }

        else{
            console.error("No token found");
            return;
        }
    
        localStorage.removeItem('token');
        localStorage.removeItem('staffToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/signin';
      };




    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
 
export default Home;