import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../pages/auth/service/AuthService';
import AuthMiddleware from '../pages/auth/service/AuthMiddleware';

const Navbar = () => {
    var isStaff = false;
    var token;
    const navigate = useNavigate();
    if (AuthMiddleware.isAuthenticated()){
        token = localStorage.getItem('token');
      }
      if(AuthMiddleware.isStaffAuthenticated()){
        token = localStorage.getItem('staffToken');
        console.log(token)
        var isStaff = true;
      }
    const handleLogout = async () => {
        await AuthService.logout(token);
        AuthMiddleware.logout();
        navigate('/signin');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary h-10">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="/">Clothez</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        {token && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/payment">TopUp</a>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        {isStaff == true? (
                                <li className="nav-item">
                                <a className="hav-link" href="/staff/view-announcement">Staff Dashboard</a>
                            </li>
                            ):("")
                        }
                        {(token && isStaff == false) ? (
                                <li className="nav-item">
                                <a className="hav-link" href="/staff/view-announcement">Announcements</a>
                            </li>
                            ):("")
                        }
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {token ? (
                            <li className="nav-item">
                                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                            </li>

                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="btn btn-outline-primary me-2" href="/signin">Sign In</a>
                                </li>
                                <li className="nav-item">
                                    <a className="btn btn-outline-success" href="/signup/user">Sign Up</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
