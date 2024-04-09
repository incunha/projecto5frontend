import React from 'react';
import { Card } from 'react-bootstrap';
import './userCard.css'; 

function UserCard({ item }) {

  return (
    <Card className="user-card">
      <Card.Img variant="top" src={item.userPhoto} className="user-image" />
      <Card.Body>
        <Card.Title className="user-name">{item.name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default UserCard;