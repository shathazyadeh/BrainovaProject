import { create } from 'zustand';

const useAuthStore = create((set) => ({  // اليوز اوث ستور بوفر متغير عام بحتوي ع معلومات اليوزر 

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