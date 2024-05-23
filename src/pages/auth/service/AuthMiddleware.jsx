const AuthMiddleware = {
    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return token !== null;
    },

    isStaffAuthenticated: () => {
        const staffToken = localStorage.getItem('staffToken');
        return staffToken !== null;
    },
    logout: () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('staffToken');
    }
};

export default AuthMiddleware;
