import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../../../taskActions';
import useUserStore from '../../../userStore';


function TaskCard({ item }) { 
  const navigate = useNavigate();
  const token = useUserStore(state => state.token);

  const handleDoubleClick = () => {
    navigate(`/task-details/${item.id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(item.id, token); // Replace 'your-token-here' with the actual token
      // Handle successful deletion (e.g., remove the task from the state or refetch the tasks)
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <Card onDoubleClick={handleDoubleClick}>
      <Card.Body>
        <Card.Title>{item.title}</Card.Title> 
        <Card.Text>{item.category}</Card.Text> 
        <Button variant="danger" onClick={handleDelete}>X</Button> {/* Add the delete button */}
      </Card.Body>
    </Card>
  );
}

export default TaskCard;