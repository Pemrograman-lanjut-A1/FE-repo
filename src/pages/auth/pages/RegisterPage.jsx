import React, {useState, useEffect} from 'react'
import backImage from '../assets/sarah-dorweiler-fr0J5-GIVyg-unsplash.jpg'
import AuthService from '../service/AuthService';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useNavigate, useParams, Link } from 'react-router-dom';
import AuthMiddleware from '../service/AuthMiddleware';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const { type } = useParams();
    const toggleShowToast = () => setShowToast(!showToast);

    const navigate = useNavigate();

    useEffect(() => {
        if (AuthMiddleware.isAuthenticated()) {
            navigate('/');
        }
    }, []);

    const handleSignUp = async () => {
        try {
            if (password.length < 8) {
                setError('Password must be at least 8 characters long.');
                return;
            }

            if (!/[A-Z]/.test(password)) {
                setError('Password must contain at least one uppercase letter.');
                return;
            }

            if (!/[@#$!*()%^&+=]/.test(password)) {
                setError('Password must contain at least one special character.');
                return;
            }

            const signUpData = {
                email: email,
                username: username,
                password: password,
            };

            if (type === 'staff') {
                await AuthService.signUpStaff(signUpData); 
            } else {
                await AuthService.signUp(signUpData); 
            }

            setShowToast(true);
            navigate('/signin');
        } catch (error) {
            console.error('Error signing up:', error.message);
            if (error.message.includes('Username') || error.message.includes('Email')) {
                setError('Username or email already exists.');
            } else {
                setError('Failed to sign up. Please try again later.');
            }
        }
    };
    
    return (
    <div className="100-w vh-100" style={{ backgroundColor: '#e8e8e8', minHeight: '100vh' }}>
        <div className="row">
            <div className="col d-flex flex-column justify-content-center w-auto h-auto align-items-center">
                <div className='bg-light p-5 rounded shadow-lg'>
                    <h1 className='my-3 fw-semibold'>Sign Up</h1>
                    <form action="">
                        <div className='my-3'>
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="budiono@siregar.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='my-3'>
                            <label for="username" class="form-label">Username</label>
                            <input type="username" class="form-control" id="email" placeholder="budionosiregar77" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div class="my-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        <button className='btn btn-dark w-100' type="button" onClick={handleSignUp}>
                            Sign Up
                        </button>
                        <p className='mt-2'>Already have an account?
                            <span>
                                <Link to="/signin">Sign In</Link>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
            <div className="col">
                <img src={backImage} alt="back-img" className='100-w vh-100' />
            </div>
            {showToast && (
                <ToastContainer position="bottom-end">
                    <Toast show={showToast} onClose={toggleShowToast} delay={3000} autohide>
                            <Toast.Header>
                                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                <strong className="me-auto">TopUp</strong>
                                </Toast.Header>
                            <Toast.Body>Berhasil Sign Up, Silahkan Sign In</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </div>
    </div>
  )
}

export default RegisterPage