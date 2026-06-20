import api from './api';

export const productService = {
  getAll: async (params) => {
    const res = await api.get('/products', { params });
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },
  getChapters: async (productId) => {
    const res = await api.get(`/products/${productId}/chapters`);
    return res.data;
  },
  getChapter: async (id) => {
    const res = await api.get(`/products/chapters/${id}`);
    return res.data;
  },
};
