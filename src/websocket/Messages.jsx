import { useState, useEffect } from 'react';
import useUserStore from '../../userStore';

export function useMessages( setMessages, newMessage, setNewMessage, paramUsername) {
  const [websocket, setWebsocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('DISCONNECTED');
  const [connected, setConnected] = useState(false);
  const token = useUserStore(state => state.token);


  /*gerencia a conexão WebSocket para enviar e receber mensagens de chat,
   garantindo que as mensagens sejam processadas corretamente e exibidas na interface do user.
   Lida com a marcação de mensagens como lidas e fornece uma função de envio de mensagem
  para ser usada pelo componente de chat. */

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/projecto5backend/chat/${token}/${paramUsername}`); 
    setWebsocket(socket);

    socket.onopen = function(event) {
      setConnectionStatus('CONNECTED');
    };

    socket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      if (message.message === "All messages have been read") {
        // Atualizar todas as mensagens não lidas como lidas
        setMessages(prevMessages => prevMessages.map(msg => {
          if (msg.sender === message.sender && !msg.read) {
            msg.read = true;
          }
          return msg;
        }));
      } else {
        if (isNaN(new Date(message.sendDate).getTime())) {
          message.sendDate = new Date().toISOString();
        }
        setMessages(prevMessages => [...prevMessages, message]);
      }
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
        sender: useUserStore.getState().user.username,
        receiver: paramUsername, 
        message: newMessage,
        sendDate: new Date().toISOString()
      };
      websocket.send(JSON.stringify(messageToSend));
      setNewMessage('');
    } else {
      console.error('WebSocket connection is not ready.');
    }
  };

  return handleChatSubmit;
}