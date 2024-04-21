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
 // useTaskStore.js
addTask: (newTask) => set((state) => {
  console.log('Adding task:', newTask);
  const taskExists = state.tasks.some(task => task.id === newTask.id);
  if (!taskExists) {
    return { tasks: [...state.tasks, newTask] };
  }
  return state;
}),
  updateTask: (task) => set((state) => {
    const newTasks = state.tasks.map(t => t.id === task.id ? task : t);
    return { tasks: newTasks };
  }),
}));

export default useTaskStore;