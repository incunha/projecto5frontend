import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './CreateUser.css';
import Sidebar from '../components/sideBar/sideBar';
import useUserStore from '../../userStore';

function CreateUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const token = useUserStore(state => state.token);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/projecto5backend/rest/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "*/*",
        'token': token,
      },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`,
        email,
        contactNumber: contact,
        role,
        userPhoto: photoUrl,
        username, // Include username in the request body
      })
    });

    if (response.ok) {
      alert('A confirmation email has been sent to the email address');
    } else {
      alert('An error occurred while creating the account');
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col md={2}>
          <Sidebar /> {/* Sidebar goes here */}
        </Col>
        <Col md={10}>
          <Row className="justify-content-md-center">
            <Col xs={12} md={8}>
              <Row>
                <Col md={8}>
                  <h1 className="mt-5">Create New User</h1>
              <Form onSubmit={handleSubmit} className="mt-5">
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="contact">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select...</option>
                <option value="developer">Developer</option>
                <option value="ScrumMaster">Scrum Master</option>
                <option value="Owner">Product Owner</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="username"> 
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="photoUrl">
                  <Form.Label>User Photo URL</Form.Label>
                  <Form.Control type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Create
                </Button>
                </Form>
              </Col>
              <Col md={4}>
                {photoUrl && <img src={photoUrl} alt="User" className="user-photo" />}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);
}

export default CreateUser;