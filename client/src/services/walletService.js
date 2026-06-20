import api from './api';

export const walletService = {
  get: async () => {
    const res = await api.get('/wallet');
    return res.data;
  },
  getTransactions: async () => {
    const res = await api.get('/wallet/transactions');
    return res.data;
  },
};
