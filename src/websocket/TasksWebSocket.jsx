import { useState, useEffect } from 'react';
import useUserStore from '../../userStore';
import useTaskStore from '../../taskStore';

export function useTasksWebSocket() {
  const [websocket, setWebsocket] = useState(null);
  const token = useUserStore(state => state.token);
  const { removeTask, addTask, updateStoreTask, updateStatusTask } = useTaskStore();

  
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/projecto5backend/task/${token}`); 
    setWebsocket(socket);

    socket.onopen = function(event) {
      console.log('WebSocket is open now.');
    };

    socket.onmessage = function(event) {
      console.log('Received message:', event.data); 
      const message = JSON.parse(event.data);
      console.log('Parsed message:', message);
    
      // Handle the message
      if (message.action === 'add') {
        console.log('Adding task:', message.task);
        addTask(message.task);
      } else if (message.action === 'update') {
        console.log('Updating task:', message.task);
        if (message.task.active) {
          console.log('Updating active task:', message.task);
          updateStoreTask(message.task);
        } else {
          console.log('Removing task:', message.task);
          removeTask(message.task.id);
        }

      } else {
        console.log('Updating task status:', message.task);
        updateStatusTask(message.task);
      }
      console.log('Tasks:', useTaskStore.getState().tasks);
    };

    socket.onclose = function(event) {
      console.log('WebSocket is closed now.');
    };

    socket.onerror = function(event) {
      console.error('WebSocket error observed:', event);
    };
    

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [token, addTask, removeTask]);

  const sendMessage = (message) => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(message));
    }
  };

  return sendMessage;
  
}