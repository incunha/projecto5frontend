import React, { useState, useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { FaHome, FaUsers, FaUser, FaPlus, FaTrash, FaBars } from 'react-icons/fa';
import './sideBar.css';
import { useLocation , useNavigate } from 'react-router-dom';
import useUserStore from '../../../userStore';


function Sidebar() {
  const {username} = useUserStore(state => state.user);
  const location = useLocation();
  const showButtons = location.pathname === '/home';
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Navbar expand="md" className="flex-column sidebar" expanded={expanded}>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ml-auto" onClick={() => setExpanded(!expanded)}>
          <FaBars color="white" />
        </Navbar.Toggle>
        <Nav.Link className="sidebar-mainlink" href="/home">
          <FaHome /> {expanded && 'Home'}
        </Nav.Link>
        {showButtons && expanded && (
          <>
            <Nav.Link className="sidebar-sublink" href="/new-task"><FaPlus /> New Task</Nav.Link>
            <Nav.Link className="sidebar-sublink" href="/deleted-tasks"><FaTrash /> Deleted Tasks</Nav.Link>
          </>
        )}
        <Nav.Link className="sidebar-mainlink" href="/users">
          <FaUsers /> {expanded && 'Users'}
        </Nav.Link>
        <Nav.Link className="sidebar-mainlink" onClick={() => navigate(`/profile/${username}`)}>
  <FaUser /> {expanded && 'Profile'}
</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Sidebar;