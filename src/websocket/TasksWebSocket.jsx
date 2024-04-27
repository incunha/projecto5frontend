import { useState, useEffect } from 'react';
import useUserStore from '../../userStore';
import useTaskStore from '../../taskStore';
import { useLocation, useSearchParams } from 'react-router-dom';

export function useTasksWebSocket() {
  const [websocket, setWebsocket] = useState(null);
  const token = useUserStore(state => state.token);
  const { removeTask, addTask, updateStoreTask, updateStatusTask, removeDeletedTask, addDeletedTask } = useTaskStore();
  const location = useLocation();
  const tasks = useTaskStore(state => state.tasks);
  const deletedTasks = useTaskStore(state => state.deletedTasks);

  
 

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/projecto5backend/task/${token}`); 
    setWebsocket(socket);

    socket.onopen = function(event) {
      console.log('WebSocket is open now.');
      console.log ('Ready state:', socket.readyState);
    };

    socket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);
      const queryParams = new URLSearchParams(location.search);
      const username = queryParams.get('username');
      const category = queryParams.get('category');
      
      const shouldRemoveTask = 
      (username == null && category == null && (message.action === 'block' || message.action === 'status' && !message.task.active)) ||
      (username != null && category == null && message.action === 'block' && username === message.task.username) ||
      (username == null && category != null && message.action === 'block' && category === message.task.category) ||
      (username != null && category != null && message.action === 'block' && username === message.task.username && category === message.task.category);
    
    const shouldAddTask = 
      (username != null && username === message.task.username) ||
      (category != null && category === message.task.category) ||
      (username == null && category == null )||
      (username == null && category == null  && (message.task.active === true || message.action === 'status' && message.task.active));
      
      const shouldRemoveDeletedTask = 
        (username == null && category == null && location.pathname === '/deleted-tasks' && (message.action === 'restore' || message.action === 'delete')) ||
        (username != null && category == null && location.pathname === '/deleted-tasks' && (message.action === 'restore' || message.action === 'delete') && username === message.task.username) ||
        (username == null && category != null && location.pathname === '/deleted-tasks' && (message.action === 'restore' || message.action === 'delete') && category === message.task.category) ||
        (username != null && category != null && location.pathname === '/deleted-tasks' && (message.action === 'restore' || message.action === 'delete') && username === message.task.username && category === message.task.category);

      const shouldAddDeletedTask = 
        (username == null && category == null && location.pathname === '/deleted-tasks');
      
        if (shouldRemoveTask) {
          removeTask(message.task.id);
          if (message.action === 'block') {
            addDeletedTask(message.task);
          }
        } else if (shouldAddTask) {
          const taskExists = tasks.some(task => task.id === message.task.id);
          if (!taskExists) {
            addTask(message.task);
          } else {
            updateStoreTask(message.task);
          }
        }
        
        if (shouldRemoveDeletedTask) {
          removeDeletedTask(message.task.id);
          if (message.action === 'restore') {
            const taskExists = tasks.some(task => task.id === message.task.id);
            if (!taskExists) {
              addTask(message.task);
            } else {
              updateStoreTask(message.task);
            }
          }
        } else if (shouldAddDeletedTask) {
          const taskExists = deletedTasks.some(task => task.id === message.task.id);
          if (!taskExists) {
            addDeletedTask(message.task);
          } else {
            updateStatusTask(message.task);
          }
        }
      }
    

      
    
      // Handle the message
 /*     if (message.action === 'delete') {
        removeTask(message.task.id);
        addDeletedTask(message.task);
        console.log('Deleted tasks:', useTaskStore.getState().deletedTasks);
        
      } else if (message.action === 'restore') {
        removeDeletedTask(message.task.id);
        addTask(message.task);
      } else if (message.action === 'update') {
        if (message.task.active) {
          updateStoreTask(message.task);
        } else {
          removeTask(message.task.id);
          addDeletedTask(message.task); 
        }
      } else {
        updateStatusTask(message.task);
      }
      console.log('Tasks:', useTaskStore.getState().tasks);
    };*/

    socket.onerror = function(event) {
      console.error('WebSocket error observed:', event);
    };
    

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [token, addTask, removeTask, removeDeletedTask, addDeletedTask, updateStoreTask, updateStatusTask, location, tasks, deletedTasks]);

  const sendMessage = (message) => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(message));
    }
  };

  return sendMessage;
}