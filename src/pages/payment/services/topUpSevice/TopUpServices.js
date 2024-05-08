import axios from "axios";

const BASE_URL = "http://localhost:8080";

const PaymentService = {
  getAllTopUps: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/topup/`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  createTopUp: async (topUpData) => {
    try {
      const response = await axios.post(`${BASE_URL}/topup/create`, topUpData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  deleteTopUpById: async (topUpId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/topup/${topUpId}/delete`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  cancelTopUp: async (topUpId) => {
    try {
      const response = await axios.put(`${BASE_URL}/topup/${topUpId}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  confirmTopUp: async (topUpId) => {
    try {
      const response = await axios.put(`${BASE_URL}/topup/${topUpId}/confirm`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  getTopUpById: async (topUpId) => {
    try {
      const response = await axios.get(`${BASE_URL}/topup/${topUpId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
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

export default PaymentService;
