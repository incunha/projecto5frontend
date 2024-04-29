import { create } from 'zustand';
import { fetchActiveTasks, fetchAllActiveTasks, fetchInactiveTasks, createTask, fetchTaskDetails, updateTask, deleteTask, restoreTask, changeTaskStatus, fetchTaskStatistics } from './taskActions';

/*mantém duas listas de tarefas: uma para tarefas ativas e outra para tarefas excluídas. 
métodos para adicionar, remover e atualizar tarefas nessas listas, 
das duas listas (tarefas activas e inactivas). */

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

  updateStoreTask: (updatedTask) => set((state) => {
    const newTasks = state.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    return { tasks: [...newTasks] };
  }),

  updateStatusTask: (updatedTask) => set((state) => {
    console.log('Updating task status:', updatedTask);
    const newTasks = state.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    return { tasks: [...newTasks] };
  }),

  removeDeletedTask: (taskId) => set((state) => {
    const newDeletedTasks = state.deletedTasks.filter(task => task.id !== taskId);
    return { deletedTasks: newDeletedTasks };
  }),

  addDeletedTask: (newTask) => set((state) => {
    const taskExists = state.deletedTasks.some(task => task.id === newTask.id);
    if (!taskExists) {
      return { deletedTasks: [...state.deletedTasks, newTask] };
    }
    return state;
  }),

  clearStore: () => set({ tasks: [], deletedTasks: [] }),
  
}));

export default useTaskStore;