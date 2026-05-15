import { create } from 'zustand';

const useAuthStore = create((set) => ({

  user: null,

  setUser: (user) => {
    set({ user });
  },

  updateUser: (updatedData) =>
    set((state) => ({
      user: {
        ...state.user,
        ...updatedData
      }
    })),

  logout: () => {
    set({ user: null });
  }

}));

export default useAuthStore;