import { useState, useEffect } from 'react';

export function useMessages(user, setMessages, newMessage, setNewMessage, paramUsername) {
  const [websocket, setWebsocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('DISCONNECTED');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/projecto5backend/chat/${user.username}`); 
    setWebsocket(socket);

    socket.onopen = function(event) {
      setConnectionStatus('CONNECTED');
    };

    socket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      if (isNaN(new Date(message.sendDate).getTime())) {
        message.sendDate = new Date().toISOString();
      }
      setMessages(prevMessages => [...prevMessages, message]);
    };

    socket.onclose = function(event) {
      setConnectionStatus('DISCONNECTED');
      if(event.code !== 1000) {
        setTimeout(() => {
          setConnected(!connected)
        }, 1000);
      }
    };

    socket.onerror = function(event) {
      console.error('WebSocket error observed:', event);
    };

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  const handleChatSubmit = (event) => {
    event.preventDefault();
    if (connectionStatus === 'CONNECTED') {
      const messageToSend = {
        sender: user.username,
        receiver: paramUsername, 
        message: newMessage,
        timestamp: new Date().toISOString()
      };
      websocket.send(JSON.stringify(messageToSend));
      setNewMessage('');
    } else {
      console.error('WebSocket connection is not ready.');
    }
  };

  return handleChatSubmit;
}