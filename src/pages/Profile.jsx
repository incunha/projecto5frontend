import React, { useState, useEffect } from 'react';
import './Profile.css';
import useUserStore from '../../userStore';
import { Link } from 'react-router-dom';

function Profile() {
  const user = useUserStore(state => state.user);
  const fetchUser = useUserStore(state => state.fetchUser);
  const token = sessionStorage.getItem('token');

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!user && token) {
      fetchUser(token);
    }
  }, [user, token, fetchUser]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile">
        <Link to="/home" className="home-button">Home</Link>
      <img src={user.userPhoto} alt="User" />
      {isEditing ? (
        <input value={name} onChange={e => setName(e.target.value)} />
      ) : (
        <p>{name}</p>
      )}
      {isEditing ? (
        <input value={username} onChange={e => setUsername(e.target.value)} />
      ) : (
        <p>{username}</p>
      )}
      {isEditing ? (
        <input value={email} onChange={e => setEmail(e.target.value)} />
      ) : (
        <p>{email}</p>
      )}
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </div>
  );
}

export default Profile;