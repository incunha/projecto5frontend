import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function TaskCard({ item }) { 
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    navigate(`/task-details/${item.id}`);
  };

  return (
    <Card onDoubleClick={handleDoubleClick}>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title> 
        <Card.Text>{item.category}</Card.Text> 
      </Card.Body>
    </Card>
  );
}

export default TaskCard;