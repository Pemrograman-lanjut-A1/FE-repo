const AuthMiddleware = {
    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return token !== null;
    },
    logout: () => {
        localStorage.removeItem('token'); 
    }
};

export default AuthMiddleware;
