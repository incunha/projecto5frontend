import React from 'react';
import { Card } from 'react-bootstrap';

function TaskCard({ item }) { // Use item instead of task
  return (
    <Card>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title> 
        <Card.Text>{item.category}</Card.Text> 
      </Card.Body>
    </Card>
  );
}

export default TaskCard;