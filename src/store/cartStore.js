import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      total: 0,

      addItem: (product, quantity = 1) => 
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          const items = existingItem
            ? state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            : [...state.items, { ...product, quantity }];
          
          const total = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return { items, total };
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return state.removeItem(productId);
          }

          const items = state.items.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          );

          const total = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return { items, total };
        }),

      removeItem: (productId) =>
        set((state) => {
          const items = state.items.filter(item => item.id !== productId);
          const total = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          return { items, total };
        }),

      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
      getStorage: () => localStorage,
    }
  )
);