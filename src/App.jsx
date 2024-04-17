import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useUserStore from "../userStore";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import CreateUser from "./pages/CreateUser";
import ConfirmAccount from "./pages/ConfirmAccount";
import CreateTask from "./pages/CreateTask";
import DeletedTasks from "./pages/DeletedTasks";
import DeletedUsers from "./pages/DeletedUsers";
import TaskDetaisl from "./pages/TaskDetails";
import {fetchUnreadNotificationsCount} from '../userActions'; 

function App() {
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

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/new-user" element={<CreateUser />} />
        <Route path="/new-task" element={<CreateTask />} />
        <Route path="/deleted-users" element={<DeletedUsers />} />
        <Route path="/deleted-tasks" element={<DeletedTasks />} />
        <Route path="/confirm-account" element={<ConfirmAccount />} />
        <Route path="/task-details/:id" element={<TaskDetaisl />} />
      </Routes>
    </div>
  );
}

export default App;