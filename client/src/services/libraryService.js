import api from './api';

export const libraryService = {
  get: async () => {
    const res = await api.get('/library');
    return res.data;
  },
  getChapters: async (productId) => {
    const res = await api.get(`/library/${productId}/chapters`);
    return res.data;
  },
};
