import React from 'react';
import { Card } from 'react-bootstrap';

function TaskCard({ task }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.category}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TaskCard;