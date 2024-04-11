import { create } from 'zustand';
import { fetchActiveTasks } from './taskActions';

const useTaskStore = create((set) => ({
  tasks: [],
  fetchActiveTasks: (token) => fetchActiveTasks((data) => set({ tasks: data }), token),
}));

export default useTaskStore;