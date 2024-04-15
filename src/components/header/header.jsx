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
  const resetNotifications = useUserStore(state => state.resetNotifications);

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

  return (
    <Navbar className="header" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <div className="dateHeader">
          {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}
          </div>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="ml-auto welcome-section">
            {user && (
              <>
                <span className="welcome-text">Welcome, {firstName}</span>
                <Image className="user-image" src={user.userPhoto} roundedCircle />
              </>
            )}
          </Nav>
          <Navbar.Brand href="#home" onClick={resetNotifications}>
  <FontAwesomeIcon icon={faBell}  className="notification-icon" />
  {notifications > 0 && <span className="notification-count">{notifications}</span>}
</Navbar.Brand>
          <Button variant="outline-danger" className="logoutButton" onClick={handleLogout}>
            Logout <FaSignOutAlt className="logoutIcon" />
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;