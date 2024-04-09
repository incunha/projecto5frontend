import React, { useState } from 'react';
import { Form, Button, Jumbotron } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function ConfirmAccount() {
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

    const response = await fetch(`http://localhost:8080/projecto5backend/rest/users/confirm/${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    });

    if (response.ok) {
      alert('Your account has been confirmed');
      navigate('/'); 
    } else {
      alert('An error occurred while confirming your account');
    }
  };

  return (
    <div>
      <Jumbotron>
        <h1>Welcome to Our Platform!</h1>
        <p>Please confirm your account by setting up your password.</p>
      </Jumbotron>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Confirm Account
        </Button>
      </Form>
    </div>
  );
}

export default ConfirmAccount;