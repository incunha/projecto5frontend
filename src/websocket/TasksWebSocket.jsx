import { useState, useEffect } from 'react';
import useUserStore from '../../userStore';
import useTaskStore from '../../taskStore';

export function useTasksWebSocket() {
  const [websocket, setWebsocket] = useState(null);
  const token = useUserStore(state => state.token);
  const { removeTask, addTask, updateTask, tasks } = useTaskStore();

  

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
      
      if (message && message.task) {
        console.log('Adding task:', message.task);
        addTask(message.task);
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
  }, [token, addTask, removeTask]);

  const sendMessage = (message) => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(message));
    }
  };

  return sendMessage;
  
}