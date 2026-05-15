import { create } from 'zustand';

const useAuthStore = create((set) => ({

  user: null,
  isAuthLoading: true,

  setUser: (user) => {
    set({ user, isAuthLoading: false })
  },

  updateUser: (updatedData) =>
    set((state) => ({
      user: {
        ...state.user,
        ...updatedData
      }
    })),

  logout: () => {
    set({ user: null, isAuthLoading: false })
  }

}));

export default useAuthStore;