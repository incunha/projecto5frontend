import React from 'react';
import { Card } from 'react-bootstrap';
import './userCard.css'; // Importe o arquivo CSS para estilizar o cartão

function UserCard({ user }) {
  return (
    <Card className="user-card">
      <Card.Img variant="top" src={user.image} className="user-image" />
      <Card.Body>
        <Card.Title className="user-name">{user.name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default UserCard;