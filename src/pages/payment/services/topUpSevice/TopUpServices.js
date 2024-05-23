import axios from "axios";

const BASE_URL = "http://localhost:8081";

const TopUpService = {
  getAllTopUps: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/topup/`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteAllTopUp: async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/topup/`);
      return response.data;
    }catch (error) {
      throw error.response.data;
    }
  },

  createTopUp: async (topUpData) => {
    try {
      const response = await axios.post(`${BASE_URL}/topup/create`, topUpData, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      return response;
    } catch (error) {
      throw error.response;
    }
  },

  deleteTopUpById: async (topUpId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/topup/${topUpId}/delete`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  cancelTopUp: async (topUpId) => {
    try {
      const response = await axios.put(`${BASE_URL}/topup/${topUpId}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  confirmTopUp: async (topUpId) => {
    try {
      const response = await axios.put(`${BASE_URL}/topup/${topUpId}/confirm`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getTopUpById: async (topUpId) => {
    try {
      const response = await axios.get(`${BASE_URL}/topup/${topUpId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getTopUpByUserId: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/topup/all/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },
};

export default TopUpService;
