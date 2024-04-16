import React, { useEffect } from "react";
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
import {fetchNotifications, fetchUnreadNotificationsCount} from '../userActions'; 
import { markAllNotificationsAsRead } from "../userActions";

function App() {
  const location = useLocation();
  const username = useUserStore(state => state.user ? state.user.username : '');
  const token = useUserStore(state => state.token); // Obtenha o token do estado
  const setUnreadNotificationsCount = useUserStore(state => state.setUnreadNotificationsCount); // Obtenha a ação setUnreadNotifications do estado
  const notifications = useUserStore(state => state.notifications);
  const unreadNotificationsCount = useUserStore(state => state.unreadNotificationsCount);
  const receiveNotification = useUserStore(state => state.receiveNotification); // Obtenha a ação receiveNotification do estado

  useEffect(() => {
    if (username) {
      fetchUnreadNotificationsCount(token).then(unreadCount => {
        setUnreadNotificationsCount(unreadCount);
      });
  
      const websocket = new WebSocket(`ws://localhost:8080/projecto5backend/notifications/${username}`);
      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      websocket.onmessage = (event) => {
        console.log('Received message:', event.data);
        const messageParts = event.data.split('New message from ');
        if (messageParts.length < 2) {
          console.error('Unexpected message format:', event.data);
          return;
        }
        const from = messageParts[1];
        const message = 'New message';
        console.log('Current notifications:', notifications);
        console.log('Current unread notification count:', unreadNotificationsCount);
        receiveNotification({ from, message }); // Use a nova ação aqui
      };
  
      // Fechar a conexão WebSocket quando o componente for desmontado
      return () => {
        console.log('Unmounting App component');
        if (websocket.readyState === WebSocket.OPEN) {
          websocket.close();
        }
      };
    }
  }, [username, token, setUnreadNotificationsCount, notifications, unreadNotificationsCount, receiveNotification]); 

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