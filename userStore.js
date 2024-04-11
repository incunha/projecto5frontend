import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  setToken, 
  setUser, 
  fetchUser, 
  fetchActiveUsers, 
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

    setToken: (token) => setToken(set, token),
    setUser: (user) => setUser(set, user),
    fetchUser: (token) => fetchUser(set, token),
    fetchActiveUsers: (token) => fetchActiveUsers(set, token),
    fetchTaskTotals: (token) => fetchTaskTotals(set, token),
    logout: (token) => logout(set, token),
    fetchOtherUser: (token, username) => fetchOtherUser(set, token, username),
  }),
  {
    name:'userStore',
  }
));

export default useUserStore;