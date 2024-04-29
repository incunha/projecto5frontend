import React, { useState } from 'react';
import { Form, Button, Jumbotron, Container, Row, Col, Image } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import logo_scrum01  from '../assets/background-video/logo_scrum_01.png';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  // Função para resetar a password
    const response = await fetch(`http://localhost:8080/projecto5backend/rest/users/setPassword/${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    });

    if (response.ok) {
      navigate('/'); 
    } else {
      alert('An error occurred while resetting your password');
    }
  };

  return (
    <div>
      <Jumbotron fluid className="text-center text-white" style={{ backgroundColor: '#006666' }}>
        <Container>
          <h1>Recover Password</h1>
          <p>Please enter your new password.</p>
        </Container>
      </Jumbotron>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Image src={logo_scrum01} fluid style={{ maxWidth: '50%' }} className="d-block mx-auto" />
            <Form onSubmit={handleSubmit} className="mt-4">
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </Form.Group>

              <Button variant="primary" type="submit" block className="mt-4">
                Reset Password
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResetPassword;