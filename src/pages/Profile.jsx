import React, { useState, useEffect } from 'react';
import './Profile.css';
import useUserStore from '../../userStore';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/sideBar/sideBar';

function Profile() {
  const user = useUserStore(state => state.user);
  const fetchUser = useUserStore(state => state.fetchUser);
  const token = sessionStorage.getItem('token');

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  useEffect(() => {
    if (!user && token) {
      fetchUser(token);
    }
  }, [user, token, fetchUser]);

  useEffect(() => {
    if (user) {
      const [first, ...last] = user.name.split(' ');
      setFirstName(first);
      setLastName(last.join(' '));
      setUsername(user.username);
      setEmail(user.email);
      setUserPhoto(user.userPhoto);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile profile-background d-flex justify-content-start align-items-start"> {/* Altere para align-items-start */}
      <div className="d-flex"> {/* Adicione um div com display flex */}
        <Sidebar />
        <Container fluid>
          <Row >
            <Col xs={12} md={8} lg={6}>
            <div className="profile-content shadow p-3 mb-5 rounded">
              <Row>
                <Col xs={12} md={4}>
                  <img src={userPhoto} className="mx-auto mt-3 rounded-circle profile-img" alt="User" />
                </Col>
                <Col xs={12} md={8}>
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Label className="mr-2 form-label">First Name:</Form.Label>
                      {isEditing ? (
                        <Form.Control className="form-control-custom" value={firstName} onChange={e => setFirstName(e.target.value)} />
                      ) : (
                        <span className="profile-text">{firstName}</span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="mr-2 form-label">Last Name:</Form.Label>
                      {isEditing ? (
                        <Form.Control className="form-control-custom" value={lastName} onChange={e => setLastName(e.target.value)} />
                      ) : (
                        <span className="profile-text">{lastName}</span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="mr-2 form-label">Username:</Form.Label>
                      {isEditing ? (
                        <Form.Control className="form-control-custom" value={username} onChange={e => setUsername(e.target.value)} />
                      ) : (
                        <span className="profile-text">{username}</span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="mr-2 form-label">Email:</Form.Label>
                      {isEditing ? (
                        <Form.Control className="form-control-custom" value={email} onChange={e => setEmail(e.target.value)} />
                      ) : (
                        <span className="profile-text">{email}</span>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="mr-2 form-label">Photo URL:</Form.Label>
                      {isEditing ? (
                        <Form.Control className="form-control-custom" value={userPhoto} onChange={e => setUserPhoto(e.target.value)} />
                      ) : (
                        <span className="profile-text">{userPhoto}</span>
                      )}
                    </Form.Group>
                    <Button variant="primary" onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      </div>
    </div>
  );
}

export default Profile;