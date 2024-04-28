import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Dropdown, Form, Button, Col, InputGroup } from 'react-bootstrap';
import { FaHome, FaUsers, FaUser, FaPlus, FaTrash, FaBars, FaChartLine, FaList, FaTasks } from 'react-icons/fa';
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
          <FaHome />  {expanded && t('Home')}
        </Nav.Link>
        {showButtons && (
          <>
            <Nav.Link className="sidebar-mainlink" onClick={() => { setSelectedUser(username); fetchActiveTasks(token, username, selectedCategory); }}>
              <FaTasks /> {expanded && t('My Tasks')}
            </Nav.Link>
            <Nav.Link className="sidebar-sublink" href="/new-task">
              <FaPlus /> {expanded && t('New Task')}
            </Nav.Link>
            {(role === 'ScrumMaster' || role === 'Owner') && expanded && (
              <>
                <Nav.Link className="sidebar-sublink" href="/deleted-tasks"><FaTrash /> {t('Deleted Tasks')}</Nav.Link>
                <Dropdown onSelect={(selectedValue) => setSelectedUser(selectedValue)} className="dropdown-margin">
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown-toggle">
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
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
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
          </>
        )}
        {role === 'Owner' && (
          <Nav.Link className="sidebar-mainlink" href="/categories">
            <FaList /> {expanded && t('Categories')}
          </Nav.Link>
        )}
        <Nav.Link className="sidebar-mainlink" href="/users">
          <FaUsers /> {expanded && t('Users')}
        </Nav.Link>
        {role === 'Owner' && showUserButtons && (
  <>
    <Nav.Link className="sidebar-sublink" href="/new-user"><FaPlus /> { expanded && t('New User')}</Nav.Link>
    <Nav.Link className="sidebar-sublink" href="/deleted-users"><FaTrash /> { expanded && t('Deleted Users')}</Nav.Link>
    {expanded && (
      <Form className="search-form" onSubmit={e => {
        e.preventDefault();
        setSearchParams({ name: searchName });
      }}>
        <InputGroup>
          <Form.Control type="text" placeholder="Enter name" value={searchName} onChange={e => setSearchName(e.target.value)} />
          <InputGroup.Append>
            <Button variant="primary" type="submit">
              {t('Search')}
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    )}
  </>
)}
        {role === 'Owner' && (
          <Nav.Link className="sidebar-mainlink" href="/dashboard">
            <FaChartLine /> {expanded && t('Dashboard')}
          </Nav.Link>
        )}
        <Nav.Link className="sidebar-mainlink" onClick={() => navigate(`/profile/${username}`)}>
          <FaUser /> {expanded && t('Profile')}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Sidebar;