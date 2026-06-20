import api from './api';

export const orderService = {
  checkout: async () => {
    const res = await api.post('/orders/checkout');
    return res.data;
  },
  getOrders: async () => {
    const res = await api.get('/orders');
    return res.data;
  },
  getOrderById: async (id) => {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  },
};
