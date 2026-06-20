import api from './api';

export const cartService = {
  get: async () => {
    const res = await api.get('/cart');
    return res.data;
  },
  addItem: async (productId) => {
    const res = await api.post('/cart/items', { productId });
    return res.data;
  },
  removeItem: async (productId) => {
    const res = await api.delete(`/cart/items/${productId}`);
    return res.data;
  },
};
