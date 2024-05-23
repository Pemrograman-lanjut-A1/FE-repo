import axios from "axios";

const BASE_URL = "http://34.142.213.219";

const WalletService = {
  createWallet: async (walletRequest) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/wallet/create`, walletRequest, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  getWalletById: async (walletId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/wallet/${walletId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  },

  getWalletByUserId: async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/wallet/${userId}/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
};

export default WalletService;
