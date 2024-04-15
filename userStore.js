import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  setToken, 
  setUser, 
  fetchUser, 
  fetchActiveUsers, 
  fetchInactiveUsers,
  fetchTaskTotals, 
  logout, 
  fetchOtherUser 
} from './userActions';

const useUserStore = create(persist(
  (set) => ({
    token: null,
    user: null,
    taskTotals: null,
    activeUsers: [],
    inactiveUsers: [],
    notifications: [],
    notificationsCount: 0,

    setToken: (token) => setToken(set, token),
    setUser: (user) => setUser(set, user),
    fetchUser: (token) => fetchUser(set, token),
    fetchActiveUsers: (token) => fetchActiveUsers(set, token),
    fetchInactiveUsers: (token) => fetchInactiveUsers(set, token),
    fetchTaskTotals: (token, username) => fetchTaskTotals(token, username),
    logout: (token) => logout(set, token),
    fetchOtherUser: (token, username) => fetchOtherUser(token, username),

    incrementNotifications: (notification) => set(state => ({ 
      notifications: [...state.notifications, notification],
      notificationCount: state.notificationCount + 1 // Incrementa o contador de notificações
    })),
    resetNotifications: () => set({ notifications: [], notificationCount: 0 }), // Reseta o contador de notificações e a lista de notificações
  }),
  {
    name:'userStore',
    getStorage: () => sessionStorage,
  }
));

export default useUserStore;