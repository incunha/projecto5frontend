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
    <Card className="user-card border-0" onClick={handleUserClick}>
  <div className="image-container">
    <img src={item.userPhoto} alt="User" className="user-image" />
    <p className="user-name">{item.name}</p> {/* Altere esta linha */}
  </div>
</Card>
  );
}

export default UserCard;