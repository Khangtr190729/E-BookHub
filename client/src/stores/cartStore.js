import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cartCount: 0,
  
  setCartCount: (count) => set({ cartCount: count }),
  
  incrementCartCount: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  
  decrementCartCount: () => set((state) => ({ cartCount: Math.max(0, state.cartCount - 1) })),
  
  clearCartCount: () => set({ cartCount: 0 }),
}));
