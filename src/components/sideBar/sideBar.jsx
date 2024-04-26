import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Dropdown, Form, Button, Col, InputGroup } from 'react-bootstrap';
import { FaHome, FaUsers, FaUser, FaPlus, FaTrash, FaBars, FaChartLine, FaList } from 'react-icons/fa';
import './sideBar.css';
import { useLocation , useNavigate, useSearchParams } from 'react-router-dom';
import useUserStore from '../../../userStore';
import useTaskStore from '../../../taskStore';
import useCategoryStore from '../../../categoryStore';
import { useTranslation } from 'react-i18next';



function Sidebar() {
  const {username} = useUserStore(state => state.user);
  const { fetchActiveTasks } = useTaskStore();
  const location = useLocation();
  const showButtons = location.pathname === '/home';
  const showUserButtons = location.pathname === '/users';
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSelectedFilter } = useTaskStore();
  const token = useUserStore(state => state.token);
  const role = useUserStore(state => state.user.role);
  const { categories, fetchCategories } = useCategoryStore();
  const activeUsers = useUserStore(state => state.activeUsers);
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchName, setSearchName] = useState(''); 

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
    handleResize();
  
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    useUserStore.getState().fetchActiveUsers(token);
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchCategories(token);
    }
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
          <FaHome /> {expanded && t('Home')}
        </Nav.Link>
        {showButtons && expanded && (
          <>
            <Nav.Link className="sidebar-sublink" href="/new-task" style={{ fontSize: '0.8rem', fontWeight: 'normal' }}><FaPlus /> {t('New Task')}</Nav.Link>
            <Nav.Link className="sidebar-sublink" href="/deleted-tasks" style={{ fontSize: '0.8rem', fontWeight: 'normal' }}><FaTrash /> {t('Deleted Tasks')}</Nav.Link>
            <Dropdown onSelect={(selectedValue) => setSelectedUser(selectedValue)} className="dropdown-margin">
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown-toggle" style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>
                {selectedUser || t('Filter by User')}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {activeUsers.map((user) => (
                  <Dropdown.Item key={user.username} eventKey={user.username}>
                    {user.username}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={(selectedValue) => setSelectedCategory(selectedValue)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>
                {selectedCategory || t('Filter by Category')}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categories.map((category) => (
                  <Dropdown.Item key={category.id} eventKey={category.name}>
                    {category.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}
  
        <Nav.Link className="sidebar-mainlink" href="/categories">
          <FaList /> {expanded && t('Categories')}
        </Nav.Link>
        <Nav.Link className="sidebar-mainlink" href="/users">
          <FaUsers /> {expanded && t('Users')}
        </Nav.Link>
        {showUserButtons && expanded && (
          <>
            <Nav.Link className="sidebar-sublink" href="/new-user" style={{ fontSize: '0.8rem', fontWeight: 'normal' }}><FaPlus /> {t('New User')}</Nav.Link>
            <Nav.Link className="sidebar-sublink" href="/deleted-users" style={{ fontSize: '0.8rem', fontWeight: 'normal' }}><FaTrash /> {t('Deleted Users')}</Nav.Link>
            <Form className="search-form" style={{ fontSize: '0.8rem', fontWeight: 'normal' }} onSubmit={e => {
              e.preventDefault();
              setSearchParams({ name: searchName });
            }}>
              <InputGroup>
                <Form.Control type="text" placeholder="Enter name" style={{ height: '30px' }} value={searchName} onChange={e => setSearchName(e.target.value)} />
                <InputGroup.Append>
                  <Button variant="primary" type="submit" style={{ fontSize: '0.8rem', height: '30px' }}>
                    {t('Search')}
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </>
        )}
  
        <Nav.Link className="sidebar-mainlink" href="/dashboard">
          <FaChartLine /> {expanded && t('Dashboard')}
        </Nav.Link>
        <Nav.Link className="sidebar-mainlink" onClick={() => navigate(`/profile/${username}`)}>
          <FaUser /> {expanded && t('Profile')}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Sidebar;