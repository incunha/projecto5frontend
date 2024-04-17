import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import { FaHome, FaUsers, FaUser, FaPlus, FaTrash, FaBars } from 'react-icons/fa';
import './sideBar.css';
import { useLocation , useNavigate, useSearchParams } from 'react-router-dom';
import useUserStore from '../../../userStore';
import useTaskStore from '../../../taskStore';

function Sidebar() {
  const {username} = useUserStore(state => state.user);
  const { fetchActiveTasks } = useTaskStore();
  const location = useLocation();
  const showButtons = location.pathname === '/home';
  const showUserButtons = location.pathname === '/users';
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Adicione o estado para o usuário e a categoria selecionados
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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

  // Chame fetchActiveTasks sempre que o usuário ou a categoria selecionados mudarem
  useEffect(() => {
    fetchActiveTasks(selectedUser, selectedCategory);
    setSearchParams({ category: selectedCategory, user: selectedUser });
  }, [selectedUser, selectedCategory]);

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
            {/* Adicione os dropdowns aqui */}
            <Dropdown onSelect={setSelectedUser}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Filter by User
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {/* Substitua isso pelos seus usuários */}
                <Dropdown.Item eventKey="User1">User1</Dropdown.Item>
                <Dropdown.Item eventKey="User2">User2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={setSelectedCategory}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Filter by Category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {/* Substitua isso pelas suas categorias */}
                <Dropdown.Item eventKey="Category1">Category1</Dropdown.Item>
                <Dropdown.Item eventKey="Category2">Category2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}
        <Nav.Link className="sidebar-mainlink" href="/users">
          <FaUsers /> {expanded && 'Users'}
        </Nav.Link>
        {showUserButtons && expanded && (
          <>
            <Nav.Link className="sidebar-sublink" href="/new-user"><FaPlus /> New User</Nav.Link>
            <Nav.Link className="sidebar-sublink" href="/deleted-users"><FaTrash /> Deleted Users</Nav.Link>
          </>
        )}
        <Nav.Link className="sidebar-mainlink" onClick={() => navigate(`/profile/${username}`)}>
          <FaUser /> {expanded && 'Profile'}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Sidebar;