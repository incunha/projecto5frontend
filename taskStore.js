import { create } from 'zustand';
import { fetchActiveTasks, fetchAllActiveTasks, fetchInactiveTasks } from './taskActions';

const useTaskStore = create((set) => ({
  tasks: [],
  deletedTasks: [],
  fetchAllActiveTasks: (token) => fetchAllActiveTasks(set, token),
  fetchActiveTasks: (token, user, category) => fetchActiveTasks(set, token, user, category),
  fetchInactiveTasks: (token) => fetchInactiveTasks((data) => set({ deletedTasks: data }), token),
}));

export default useTaskStore;