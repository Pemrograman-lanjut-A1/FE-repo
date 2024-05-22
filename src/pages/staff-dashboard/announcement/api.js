import axios from 'axios';

const api = axios.create({
  baseURL: 'http://34.128.118.113/api/v1'
});

api.interceptors.request.use(request => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    // Handle 401 errors, potentially trigger token refresh or redirect to login
  }
  return Promise.reject(error);
});

export default api;
