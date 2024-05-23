import axios from "axios";

const BASE_URL = "http://34.128.118.113/api/v1/auth";

const AuthService = {
  signUp: async (signUpRequest) => {
    try {
        const response = await axios.post(`${BASE_URL}/signup`, signUpRequest);
        return response;
    } catch (error) {
      throw new Error(error || "Sign up failed");
    }
  },
  signUpStaff: async (signUpRequest) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup/staff`, signUpRequest);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Sign up staff failed");
    }
  },
  signIn: async (signInRequest) => {
    try {
      const response = await axios.post(`${BASE_URL}/signin`, signInRequest)
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Sign in failed");
    }
  },
  refresh: async (refreshTokenRequest) => {
    try {
      const response = await axios.post(`${BASE_URL}/refresh`, refreshTokenRequest);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Refresh token failed");
    }
  },
  logout: async (token) => {
    try {
      const jwtToken = token;
      const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Logout failed");
    }
  },
  parseJwt : (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
    }
};

export default AuthService;
