import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './userCard.css'; 

function UserCard({ item }) {
  const navigate = useNavigate();

  //navega para o perfil do utilizador
  
  const handleUserClick = () => {
    navigate(`/profile/${item.username}`);
  };

  
  return (
    <Card className={`user-card border-0 ${item.active ? '' : 'inactive'}`} onClick={handleUserClick} style={{ width: '100%', margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="image-container">
        <img src={item.userPhoto} alt="User" className="user-image" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }} />
        <p className="user-name">{item.name}</p> 
      </div>
    </Card>
  );
}

export default UserCard;