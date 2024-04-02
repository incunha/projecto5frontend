import React from 'react';
import { useNavigate } from 'react-router-dom';

// ViewUsersButton component
// Botão que redireciona o user para a página de visualização de users
function ViewUsersButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/users');
  };

  return (
    <button className="aside-button" onClick={handleClick}>
      View Users
    </button>
  );
}

export default ViewUsersButton;