import React from "react";
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
import Dashboard from "./pages/Dashboard";
import RecoverPassword from "./pages/RecoverPassword";
import Categories from "./pages/Categories";

function App() {
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/categories" element={<Categories/>} />
      </Routes>
    </div>
  );
}

export default App;