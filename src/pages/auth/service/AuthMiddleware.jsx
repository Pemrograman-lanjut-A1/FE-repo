import AuthService from "./AuthService";

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
    },
    isExpired: async () => {
        const token = localStorage.getItem('token');
        if (!token) return true; 
    
        const refreshTokenRequest = {
            token: token
        };
        try {
            const response = await AuthService.refresh(refreshTokenRequest);
            if (response.token) {
                localStorage.setItem('token', token); 
                return false;
            }
        } catch (error) {
            return true; 
        }
        return true;
    }
    
};

export default AuthMiddleware;
