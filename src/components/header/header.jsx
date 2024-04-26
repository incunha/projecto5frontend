import React, {useState, useEffect} from 'react';
import  useUserStore from '../../../userStore';
import { Navbar, Nav, Container, Image, Button, Row, Col } from 'react-bootstrap';
import './header.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { markAllNotificationsAsRead, fetchNotifications, fetchUnreadNotificationsCount } from '../../../userActions';
import notification from '../../websocket/Notifications';
import { useTranslation } from 'react-i18next';
import { use } from 'i18next';
import useTaskStore from '../../../taskStore';
import useCategoryStore from '../../../categoryStore';
import { fetchOtherUser } from '../../../userActions';

function Header() {
  notification();
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
  const unreadNotificationsCount = useUserStore(state => state.unreadNotificationsCount);
  const [senderData, setSenderData] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    if (!user && token) {
      fetchUser(token);
    }
  }, [user, token, fetchUser]);

  useEffect(() => {
    if (user && user.name) {
      const names = user.name.split(' ');
      setFirstName(names[0]);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    useUserStore.getState().clearStore();
    useTaskStore.getState().clearStore();
    useCategoryStore.getState().clearStore();
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

  const handleNotificationsClick = async (event) => {
    event.preventDefault();
    await markAllNotificationsAsRead(token);
    const notifications = await fetchNotifications(token);
    useUserStore.setState({ notifications: notifications });
    const unreadCount = await fetchUnreadNotificationsCount(token);
    useUserStore.setState({ unreadNotificationsCount: unreadCount });
    setNotificationsOpen(prevState => !prevState);
  };

  const handleNotificationClick = (event, username) => {
    event.stopPropagation();
    navigate(`/profile/${username}`);
  };
  useEffect(() => {
    if (!isNotificationsOpen) {
      resetNotifications();
    }
  }, [isNotificationsOpen, resetNotifications]);

  useEffect(() => {
    const fetchSenderData = async () => {
      const data = await Promise.all(
        notifications.map(notification => fetchOtherUser(token, notification.sender))
      );
      const senderData = data.reduce((acc, user, index) => {
        acc[notifications[index].sender] = user;
        return acc;
      }, {});
      setSenderData(senderData);
    };
  
    if (notifications.length > 0) {
      fetchSenderData();
    }
  }, [notifications, token]);
  

  return (
    <Navbar className="header" expand="lg">
      <Container fluid>
        <Row className="align-items-center">
          <Col md="auto">
            {user && (
              <>
                <span className="welcome-text">{t('Welcome')}, {firstName}</span>
                <Image className="user-image" src={user.userPhoto} roundedCircle />
              </>
            )}
            <span onClick={handleNotificationsClick} style={{ position: 'relative', cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faBell}  className="notification-icon" />
              {unreadNotificationsCount > 0 && <span className="notification-count" style={{ color: 'white' }}>{unreadNotificationsCount}</span>}
              {isNotificationsOpen && (
                <div className="notification-dropdown">
                {notifications.map((notification, index) => (
  <div key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }} onClick={(event) => handleNotificationClick(event, notification.sender)}>
    <Image src={senderData[notification.sender]?.userPhoto} roundedCircle style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '50%' }} />
    <strong>{notification.sender}</strong>: {notification.notification}
    <div style={{ fontSize: '0.6em' }}>{new Date(notification.timestamp).toLocaleString()}</div>
  </div>
))}
              </div>
              )}
            </span>
          </Col>
        </Row>
        <div className="d-flex align-items-center ml-auto">
          <div className="dateHeader mr-2">
            {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}
          </div>
          <Button variant="outline-danger" className="logoutButton" onClick={handleLogout}>
            {t('Logout')} <FaSignOutAlt className="logoutIcon" />
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;