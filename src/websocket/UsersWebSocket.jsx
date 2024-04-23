import { useState, useEffect } from 'react';
import useUserStore from '../../userStore';
import useTaskStore from '../../taskStore';

export function useUsersWebSocket() {
  const [websocket, setWebsocket] = useState(null);
  const token = useUserStore(state => state.token);
  

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/projecto5backend/user/${token}`); 
    setWebsocket(socket);

    socket.onopen = function(event) {
      console.log('WebSocket is open now.');
    };

    socket.onmessage = function(event) {
      console.log('Received message:', event.data); 
    
      const message = JSON.parse(event.data);
    
      if (message) {
        if (message.user) {
          addUser(message.user);
        }
        else if (message.user === null) {
          removeUser(message.user);
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