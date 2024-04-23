import { create } from 'zustand';
import { fetchActiveTasks, fetchAllActiveTasks, fetchInactiveTasks, createTask, fetchTaskDetails, updateTask, deleteTask, restoreTask, changeTaskStatus, fetchTaskStatistics } from './taskActions';

const useTaskStore = create((set) => ({
  tasks: [],
  deletedTasks: [],
  fetchAllActiveTasks: (token) => fetchAllActiveTasks(set, token),
  fetchActiveTasks: (token, user, category) => fetchActiveTasks(set, token, user, category),
  fetchInactiveTasks: (token) => fetchInactiveTasks((data) => set({ deletedTasks: data }), token),
  createTask: (token, payload) => createTask(token, payload),
  fetchTaskDetails: (id, token) => fetchTaskDetails(id, token),
  updateTask: (task, token) => updateTask(task, token),
  deleteTask: (id, token) => deleteTask(id, token),
  restoreTask: (id, token) => restoreTask(id, token),
  changeTaskStatus: (id, status, token) => changeTaskStatus(id, status, token),
  fetchTaskStatistics: (token) => fetchTaskStatistics(set, token),
  removeTask: (taskId) => set((state) => {
    const newTasks = state.tasks.filter(task => task.id !== taskId);
    return { tasks: newTasks };
  }),
  addTask: (newTask) => set((state) => {
    const taskExists = state.tasks.some(task => task.id === newTask.id);
    if (!taskExists) {
      return { tasks: [...state.tasks, newTask] };
    }
    return state;
  }),
  updateStoreTask: (task) => set((state) => {
    const newTasks = state.tasks.map(t => t.id === task.id ? task : t);
    return { tasks: newTasks };
  }),
}));

export default useTaskStore;