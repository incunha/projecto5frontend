import React from 'react';
import { useNavigate } from 'react-router-dom';

// ViewTasksButton component
// Botão que redireciona o user para a página de visualização de tasks
function ViewTasksButton() {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/tasks');
    };
  
    return (
      <button className="aside-button" onClick={handleClick}>
        View Tasks
      </button>
    );
  }

export default ViewTasksButton;