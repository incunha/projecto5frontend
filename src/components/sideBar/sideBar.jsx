import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaUsers, FaUser, FaPlus, FaTrash } from 'react-icons/fa';
import './sideBar.css';
import { useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    const showButtons = location.pathname === '/home';
  
    return (
        <Nav defaultActiveKey="/home" className="flex-column sidebar">
          <Nav.Link className="sidebar-mainlink" href="/home"><FaHome /> Home</Nav.Link>
          {showButtons && (
            <>
              <Nav.Link className="sidebar-sublink" href="/new-task"><FaPlus /> New Task</Nav.Link>
              <Nav.Link className="sidebar-sublink" href="/deleted-tasks"><FaTrash /> Deleted Tasks</Nav.Link>
            </>
          )}
          <Nav.Link className="sidebar-mainlink" href="/users"><FaUsers /> Users</Nav.Link>
          <Nav.Link className="sidebar-mainlink" href="/profile"><FaUser /> Profile</Nav.Link>
        </Nav>
      );
    }
    
    export default Sidebar;