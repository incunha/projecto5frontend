import { create } from 'zustand';

const useUserStore = create((set) => ({
  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  
  fetchUser: async (token) => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/users/myUserDto', {
        method: 'GET',
        headers: {
          Accept: "*/*",
          token: token,
        },
      });
      if (response.ok) {
        const user = await response.json();
        set({ user });
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  },
}));

export default useUserStore;