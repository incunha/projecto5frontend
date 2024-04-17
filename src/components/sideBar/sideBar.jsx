import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import { FaHome, FaUsers, FaUser, FaPlus, FaTrash, FaBars } from 'react-icons/fa';
import './sideBar.css';
import { useLocation , useNavigate, useSearchParams } from 'react-router-dom';
import useUserStore from '../../../userStore';
import useTaskStore from '../../../taskStore';
import useCategoryStore from '../../../categoryStore';

function Sidebar() {
  const {username} = useUserStore(state => state.user);
  const { fetchActiveTasks } = useTaskStore();
  const location = useLocation();
  const showButtons = location.pathname === '/home';
  const showUserButtons = location.pathname === '/users';
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSelectedFilter } = useTaskStore();
  const token = useUserStore(state => state.token);
  const categories = useCategoryStore(token);
  const activeUsers = useUserStore(state => state.activeUsers);

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

  useEffect(() => {
    useUserStore.getState().fetchActiveUsers(token);
  }, [token]);

  useEffect(() => {
    fetchActiveTasks(token, selectedUser, selectedCategory);
    const params = {};
    if (selectedUser) params.username = selectedUser;
    if (selectedCategory) params.category = selectedCategory;
    setSearchParams(params);
  }, [token, selectedUser, selectedCategory]);

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
            <Dropdown onSelect={(selectedValue) => setSelectedUser(selectedValue)}>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    {selectedUser || 'Filter by User'}
  </Dropdown.Toggle>
  <Dropdown.Menu>
    {/* Mapeie os usuários para renderizar os itens do dropdown */}
    {activeUsers.map((user) => (
      <Dropdown.Item key={user.username} eventKey={user.username}>
        {user.username}
      </Dropdown.Item>
    ))}
  </Dropdown.Menu>
</Dropdown>
<Dropdown onSelect={(selectedValue) => setSelectedCategory(selectedValue)}>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    {selectedCategory || 'Filter by Category'}
  </Dropdown.Toggle>
  <Dropdown.Menu>
    {/* Mapeie as categorias para renderizar os itens do dropdown */}
    {categories.map((category) => (
      <Dropdown.Item key={category.id} eventKey={category.name}>
        {category.name}
      </Dropdown.Item>
    ))}
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