import { useEffect, useState } from "react";
import useUserStore from "../userStore";
import { useLocation } from "react-router-dom";
import { fetchUnreadNotificationsCount } from '../userActions'; 

export default function notification() {
  const location = useLocation();
  const username = useUserStore(state => state.user ? state.user.username : '');
  const token = useUserStore(state => state.token);
  const setUnreadNotificationsCount = useUserStore(state => state.setUnreadNotificationsCount);
  const notifications = useUserStore(state => state.notifications);
  const unreadNotificationsCount = useUserStore(state => state.unreadNotificationsCount);
  const receiveNotification = useUserStore(state => state.receiveNotification);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (username) {
      fetchUnreadNotificationsCount(token).then(unreadCount => {
        setUnreadNotificationsCount(unreadCount);
      });
  
      const websocket = new WebSocket(`ws://localhost:8080/projecto5backend/notifications/${username}`);
      websocket.onerror = (error) => {};
  
      websocket.onmessage = (event) => {
        const messageParts = event.data.split('New message from ');
        if (messageParts.length < 2) {
          return;
        }
        const from = messageParts[1];
        const message = 'New message';

        // Verifique se a rota atual corresponde ao perfil do usuário que está enviando a mensagem
        if (location.pathname === `/profile/${from}`) {
          // Se for o caso, simplesmente ignore a mensagem
          return;
        }

        receiveNotification({ from, message });
      };

      websocket.onclose = (e) => {
        if (e.code!==1000) {
          setTimeout(() => {
            setConnected(!connected);
          }, 1000);
        }
      };
  
      return () => {
        if (websocket.readyState === WebSocket.OPEN) {
          websocket.close();
        }
      };
    }
  }, [username, token, setUnreadNotificationsCount, notifications, unreadNotificationsCount, receiveNotification, location.pathname, connected]); 
}