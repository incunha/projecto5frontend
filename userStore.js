import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(persist(
  (set) => ({
    token: null,
    user: null,
    taskTotals: null,
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
    fetchTaskTotals: async (token) => {
      try {
        const response = await fetch ('http://localhost:8080/projecto5backend/rest/users/totalTasks', {
          method: 'GET',
          headers: {
            Accept: "*/*",
            token: token,
          },
        });
        if (response.ok) {
          const taskTotals = await response.json();
          set({ taskTotals });
        } else {
          console.error('Failed to fetch task totals');
        }
      } catch (error) {
        console.error('Failed to fetch task totals', error);
      }
    },
    fetchOtherUser: async (token, username) => {
      try {
        const response = await fetch(`http://localhost:8080/projecto5backend/rest/users/${username}`, {
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
          console.error('Failed to fetch other user data');
        }
      } catch (error) {
        console.error('Failed to fetch other user data', error);
      }
    },
  }),
  {
    name:'userStore',
  }
));

export default useUserStore;