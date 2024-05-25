import React from "react";
import AuthService from "./auth/service/AuthService";
import { useNavigate } from 'react-router-dom';
import AuthMiddleware from "./auth/service/AuthMiddleware";
import BackImage from "./../assets/leone-venter-mTkXSSScrzw-unsplash.jpg"
 
const Home = () => {
    const navigate = useNavigate();
    const homeStyle = {
        backgroundImage: `url(${BackImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Menyesuaikan tinggi tampilan penuh
        width: '100vw', // Menyesuaikan lebar tampilan penuh
        display: 'flex', // Menggunakan flexbox untuk tata letak
        justifyContent: 'center', // Menempatkan konten di tengah secara horizontal
        alignItems: 'center', // Menempatkan konten di tengah secara vertikal
    };

    return (
        <div style={homeStyle}>
            <h1>Home</h1>
        </div>
    );
};
 
export default Home;