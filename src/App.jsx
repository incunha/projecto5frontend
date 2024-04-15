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

function App() {
  const location = useLocation();
  const username = useUserStore(state => state.user.username);
  const incrementNotifications = useUserStore(state => state.incrementNotifications);

  useEffect(() => {
    const websocket = new WebSocket(`ws://localhost:8080/projecto5backend/notifications/${username}`);

    websocket.onmessage = (event) => {
      const message = event.data;

      // Se a mensagem for de outro usuário e o usuário atual não estiver na página de perfil desse usuário, incrementar as notificações
      if (message.from !== username && location.pathname !== `/profile/${message.from}`) {
        incrementNotifications();
      }
    };

    // Fechar a conexão WebSocket quando o componente for desmontado
    return () => {
      websocket.close();
    };
  }, [location, incrementNotifications, username]); // Adicionar username como dependência

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