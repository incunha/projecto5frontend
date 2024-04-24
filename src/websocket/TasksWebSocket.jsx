import { useState, useEffect } from 'react';
import useUserStore from '../../userStore';
import useTaskStore from '../../taskStore';

export function useTasksWebSocket() {
  const [websocket, setWebsocket] = useState(null);
  const token = useUserStore(state => state.token);
  const { removeTask, addTask, updateStoreTask, updateStatusTask, removeDeletedTask, addDeletedTask } = useTaskStore();

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/projecto5backend/task/${token}`); 
    setWebsocket(socket);

    socket.onopen = function(event) {
      console.log('WebSocket is open now.');
    };

    socket.onmessage = function(event) {
      const message = JSON.parse(event.data);
    
      // Handle the message
      if (message.action === 'delete') {
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
    };

    socket.onerror = function(event) {
      console.error('WebSocket error observed:', event);
    };
    

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [token, addTask, removeTask, removeDeletedTask, addDeletedTask]);

  const sendMessage = (message) => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(message));
    }
  };

  return sendMessage;
}