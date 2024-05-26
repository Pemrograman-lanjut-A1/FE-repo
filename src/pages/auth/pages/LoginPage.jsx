import React, {useState, useEffect} from 'react'
import backImage from '../assets/sarah-dorweiler-fr0J5-GIVyg-unsplash.jpg'
import { Link } from 'react-router-dom';
import AuthService from '../service/AuthService';
import { useNavigate } from 'react-router-dom';
import AuthMiddleware from '../service/AuthMiddleware';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    var token;
    var staffToken;

    useEffect(() => {
        token = AuthMiddleware.isAuthenticated();
        staffToken = AuthMiddleware.isStaffAuthenticated();
        if (token) {
            console.log(token);
            // navigate('/');
        }
        if (staffToken){
            console.log(staffToken);
            // navigate('/');
        }
    }, []);

    const navigate = useNavigate();
    const handleSignIn = async () => {
        try {
            const signUpData = {
                email : email,
                password : password,
            };
            const response = await AuthService.signIn(signUpData);
            const staffToken = response.data.StaffToken;
            const token = response.data.userToken;
            localStorage.setItem('staffToken', staffToken);
            localStorage.setItem('token', token);
            navigate('/'); 
        } catch (error) {
            console.error('Error signing up:', error.message);
            if (error.message.includes('email')) {
                setError(error.message);
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
                    <h1 className='my-3 fw-semibold'>Sign In</h1>
                    <form action="">
                        <div className='my-3'>
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="budiono@siregar.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div class="my-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        <button className='btn btn-dark w-100' type="button" onClick={handleSignIn}>
                            Sign In
                        </button>
                        <p className='mt-2'>Don't have an account?
                            <span>
                                <Link to="/signup/user">Sign up</Link>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
            <div className="col">
            <img src={backImage} alt="back-img" className='100-w vh-100' />
            </div>
        </div>
    </div>
  )
}

export default LoginPage