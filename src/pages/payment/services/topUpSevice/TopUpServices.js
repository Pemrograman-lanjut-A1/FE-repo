import axios from "axios";

const BASE_URL = "http://34.142.213.219";

const TopUpService = {
  getAllTopUps: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/topup/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  deleteAllTopUp: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/topup/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    }catch (error) {
      throw error.response.data.message;
    }
  },

  createTopUp: async (topUpData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/topup/create`, topUpData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  deleteTopUpById: async (topUpId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/topup/${topUpId}/delete`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  cancelTopUp: async (topUpId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URL}/topup/${topUpId}/cancel`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  confirmTopUp: async (topUpId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URL}/topup/${topUpId}/confirm`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  getTopUpById: async (topUpId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/topup/${topUpId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  getTopUpByUserId: async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/topup/all/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },
};

export default TopUpService;
