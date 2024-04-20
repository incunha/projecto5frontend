import { useState, useEffect } from 'react';
import useUserStore from '../userStore';
import useTaskStore from '../taskStore';

export function useTasksWebSocket() {
  const [websocket, setWebsocket] = useState(null);
  const token = useUserStore(state => state.token);
  const { removeTask, addTask } = useTaskStore();

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/projecto5backend/task/${token}`); 
    setWebsocket(socket);

    socket.onopen = function(event) {
      console.log('WebSocket is open now.');
    };

    socket.onmessage = function(event) {
      console.log('Received message:', event.data); 
    
      const message = JSON.parse(event.data);
    
      if (message) {
        if (message.task) {
          const taskExists = tasks.some(task => task.id === message.task.id);
          if (taskExists) {
            updateTask(message.task);
          } else {
            addTask(message.task);
          }
        }
        else if (message.id) {
          removeTask(message.id);
        }
      }
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
  }, []);
  const sendMessage = (message) => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(message));
    }
  };

  return sendMessage;

  
}