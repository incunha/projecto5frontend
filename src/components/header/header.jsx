import React, {useState, useEffect} from 'react';
import  useUserStore from '../../../userStore';
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';
import './header.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const user = useUserStore(state => state.user);
  const fetchUser = useUserStore(state => state.fetchUser);
  const logout = useUserStore(state => state.logout);
  const token = useUserStore(state => state.token);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();
  const notifications = useUserStore(state => state.notifications);
  const notificationCount = useUserStore(state => state.notificationCount);
  const resetNotifications = useUserStore(state => state.resetNotifications);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    if (!user && token) {
      fetchUser(token);
    }
  }, [user, token, fetchUser]);

  useEffect(() => {
    if (user) {
      const [first, ...last] = user.name.split(' ');
      setFirstName(first);
    }
  }, [user]);

  const handleLogout = () => {
    logout(token);
    navigate('/');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Atualiza a cada segundo

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleNotificationsClick = (event) => {
    event.preventDefault();
    setNotificationsOpen(prevState => !prevState);
    resetNotifications();
  };

  const handleNotificationClick = (event, username) => {
    event.stopPropagation();
    navigate(`/profile/${username}`);
  };

  return (
    <Navbar className="header" expand="lg">
      <Container>
        <div className="dateHeader">
          {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}
        </div>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="ml-auto welcome-section">
            {user && (
              <>
                <span className="welcome-text">Welcome, {firstName}</span>
                <Image className="user-image" src={user.userPhoto} roundedCircle />
              </>
            )}
          </Nav>
          <span onClick={handleNotificationsClick} style={{ position: 'relative', cursor: 'pointer' }}>
  <FontAwesomeIcon icon={faBell}  className="notification-icon" />
  {notificationCount > 0 && <span className="notification-count" style={{ color: 'white' }}>{notificationCount}</span>}
  {isNotificationsOpen && (
    <div style={{ position: 'absolute', right: 0, backgroundColor: 'white', width: '200px' }}>
      {notifications.map((notification, index) => (
        <div key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }} onClick={(event) => handleNotificationClick(event, notification.from)}>
          <strong>{notification.from}</strong>: {notification.message}
        </div>
      ))}
    </div>
  )}
</span>
          <Button variant="outline-danger" className="logoutButton" onClick={handleLogout}>
            Logout <FaSignOutAlt className="logoutIcon" />
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;