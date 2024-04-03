import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaUsers, FaUser } from 'react-icons/fa';
import './sideBar.css';

function Sidebar() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column sidebar">
      <Nav.Link href="/home"><FaHome /> Home</Nav.Link>
      <Nav.Link href="/users"><FaUsers /> Users</Nav.Link>
      <Nav.Link href="/profile"><FaUser /> Profile</Nav.Link>
      {/* Adicione mais links conforme necessário */}
    </Nav>
  );
}

export default Sidebar;