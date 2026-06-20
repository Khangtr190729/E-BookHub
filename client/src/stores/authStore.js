import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: { id: 1, displayName: 'Độc Giả Số 1', role: 'USER' }, // Demo user
  accessToken: localStorage.getItem('accessToken') || null,
  isAuthenticated: true, // Set to true for demo
  
  login: (user, token) => {
    localStorage.setItem('accessToken', token);
    set({ user, accessToken: token, isAuthenticated: true });
  },
  
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
}));
