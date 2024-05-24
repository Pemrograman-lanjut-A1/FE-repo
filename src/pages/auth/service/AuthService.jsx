const BASE_URL = "http://34.142.244.77/api/v1/auth";

const AuthService = {
  signUp: async (signUpRequest) => {
      try {
          const response = await fetch(`${BASE_URL}/signup`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Credentials': 'true'
              },
              body: JSON.stringify(signUpRequest)
          });
          if (!response.ok) {
              throw new Error("Sign up failed");
          }
          return await response.json();
      } catch (error) {
          throw new Error(error.message || "Sign up failed");
      }
  },

  signUpStaff: async (signUpRequest) => {
      try {
          const response = await fetch(`${BASE_URL}/signup/staff`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(signUpRequest)
          });
          if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message || "Sign up staff failed");
          }
          return await response.json();
      } catch (error) {
          throw new Error(error.message || "Sign up staff failed");
      }
  },

  signIn: async (signInRequest) => {
      try {
          const response = await fetch(`${BASE_URL}/signin`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(signInRequest)
          });
          if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message || "Sign in failed");
          }
          return await response.json();
      } catch (error) {
          throw new Error(error.message || "Sign in failed");
      }
  },

  refresh: async (refreshTokenRequest) => {
      try {
          const response = await fetch(`${BASE_URL}/refresh`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(refreshTokenRequest)
          });
          if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message || "Refresh token failed");
          }
          return await response.json();
      } catch (error) {
          throw new Error(error.message || "Refresh token failed");
      }
  },

  logout: async (token) => {
      try {
          const response = await fetch(`${BASE_URL}/logout`, {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
              }
          });
          if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message || "Logout failed");
          }
          return await response.json();
      } catch (error) {
          throw new Error(error.message || "Logout failed");
      }
  },

  parseJwt: (token) => {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
  }
};

export default AuthService;
