import { create } from 'zustand';
import { fetchActiveTasks, fetchAllActiveTasks, fetchInactiveTasks } from './taskActions';

const useTaskStore = create((set) => ({
  tasks: [],
  deletedTasks: [],
  fetchAllActiveTasks: (token) => fetchAllActiveTasks(set, token),
  fetchActiveTasks: (token, user, category) => fetchActiveTasks(set, token, user, category),
  fetchInactiveTasks: (token) => fetchInactiveTasks((data) => set({ deletedTasks: data }), token),
  removeTask: (taskId) => set((state) => {
    const newTasks = state.tasks.filter(task => task.id !== taskId);
    console.log('New tasks:', newTasks);
    return { tasks: newTasks };
  }),
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, task]
  })),
}));

export default useTaskStore;