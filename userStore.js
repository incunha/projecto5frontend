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
  fetchOtherUser, 
  fetchNotifications,
  fetchUserStatistics
} from './userActions';

const useUserStore = create(persist(
  (set) => ({
    token: null,
    user: null,
    taskTotals: null,
    activeUsers: [],
    inactiveUsers: [],
    notifications: [],
    unreadNotificationsCount: 0,
    userStatistics: null,
    
    setToken: (token) => setToken(set, token),
    setUser: (user) => setUser(set, user),
    fetchUser: (token) => fetchUser(set, token),
    fetchActiveUsers: (token) => fetchActiveUsers(set, token),
    fetchInactiveUsers: (token) => fetchInactiveUsers(set, token),
    fetchTaskTotals: (token, username) => fetchTaskTotals(token, username),
    logout: (token) => logout(set, token),
    fetchOtherUser: (token, username) => fetchOtherUser(token, username),
    fetchUserStatistics: (token) => fetchUserStatistics(set, token),
    incrementNotifications: (message) => set(state => ({ 
      notifications: [...state.notifications, message],
      notificationCount: state.notificationCount + 1
    })),
    incrementUnreadNotificationsCount: () => set(state => ({ unreadNotificationsCount: state.unreadNotificationsCount + 1 })),
    resetNotifications: () => set({ notifications: [], notificationCount: 0 }),
    setUnreadNotificationsCount: (count) => set({ unreadNotificationsCount: count }),
    receiveNotification: (message) => set(state => {
      const isCurrentRouteUserProfile = window.location.pathname === `/profile/${message.from}`;
      return {
        notifications: [...state.notifications, message],
        notificationCount: state.notificationCount + 1,
        unreadNotificationsCount: isCurrentRouteUserProfile ? state.unreadNotificationsCount : state.unreadNotificationsCount + 1
      };
    }),
  }),
  {
    name:'userStore',
    getStorage: () => sessionStorage,
  }
));

export default useUserStore;