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
        <Route path="/confirm-account" element={<ConfirmAccount />} />
      </Routes>
    </div>
  );
}

export default App;