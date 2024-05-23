import axios from "axios";

const BASE_URL = "http://localhost:8081";

const WalletService = {
  createWallet: async (walletRequest) => {
    try {
      const response = await axios.post(`${BASE_URL}/wallet/create`, walletRequest);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  getWalletById: async (walletId) => {
    try {
      const response = await axios.get(`${BASE_URL}/wallet/${walletId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  getWalletByUserId: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/wallet/${userId}/user`);
      return response;
    } catch (error) {
      throw error.response.data.message;
    }
  }
};

export default WalletService;
