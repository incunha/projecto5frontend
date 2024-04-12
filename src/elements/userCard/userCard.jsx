import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './userCard.css'; 

function UserCard({ item }) {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/profile/${item.username}`);
  };

  return (
    <Card className="user-card" onClick={handleUserClick}>
      <Card.Img variant="top" src={item.userPhoto} className="user-image" />
      <Card.Body>
        <Card.Title className="user-name">{item.name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default UserCard;