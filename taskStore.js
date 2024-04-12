import { create } from 'zustand';
import { fetchActiveTasks, fetchInactiveTasks } from './taskActions';

const useTaskStore = create((set) => ({
  tasks: [],
  deletedTasks: [],
  fetchActiveTasks: (token) => fetchActiveTasks((data) => set({ tasks: data }), token),
  fetchInactiveTasks: (token) => fetchInactiveTasks((data) => set({ deletedTasks: data }), token),
}));

export default useTaskStore;