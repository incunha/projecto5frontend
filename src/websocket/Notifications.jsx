import { useEffect, useState } from "react";
import useUserStore from "../../userStore";
import { useLocation } from "react-router-dom";
import { fetchUnreadNotificationsCount } from '../../userActions'; 
import { useNavigate } from "react-router-dom";

/*Quando um usuário faz login, o componente inicia a conexão WebSocket e verifica se há novas mensagens 
não lidas, atualizando o contador de notificações. Sempre que uma nova mensagem é recebida, o componente 
verifica se o user está na mesma página do remetente da mensagem. Se não estiver, a mensagem é armazenada 
no estado global de notificações para ser exibida mais tarde. Além disso, o componente lida com reconexões 
automáticas em caso de falhas na conexão, garantindo uma experiência contínua ao user.  */

export default function notification() {
  const location = useLocation();
  const username = useUserStore(state => state.user ? state.user.username : '');
  const token = useUserStore(state => state.token);
  const setUnreadNotificationsCount = useUserStore(state => state.setUnreadNotificationsCount);
  const notifications = useUserStore(state => state.notifications);
  const unreadNotificationsCount = useUserStore(state => state.unreadNotificationsCount);
  const receiveNotification = useUserStore(state => state.receiveNotification);
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      fetchUnreadNotificationsCount(token).then(unreadCount => {
        setUnreadNotificationsCount(unreadCount);
      });
  
      const websocket = new WebSocket(`ws://localhost:8080/projecto5backend/notifications/${username}`);
      websocket.onerror = (error) => {};
  
      websocket.onmessage = (event) => {
        const message = event.data;
      
        // Se a mensagem for "LOGOUT", redirecione o usuário para a página de login
        if (message === 'LOGOUT') {
          navigate('/');
        } else {
          const messageParts = message.split('New message from ');
          if (messageParts.length < 2) {
            return;
          }
          const from = messageParts[1];
          const messageContent = 'New message';
      
          // Verifique se a rota atual corresponde ao perfil do user que está enviando a mensagem
          if (location.pathname === `/profile/${from}`) {
            // Se for o caso, simplesmente ignora a mensagem
            return;
          }
      
          receiveNotification({ from, message: messageContent });
        }
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