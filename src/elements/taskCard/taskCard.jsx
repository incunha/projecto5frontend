import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteTask, restoreTask } from '../../../taskActions';
import useUserStore from '../../../userStore';



function TaskCard({ item, isDeleted }) { 
  const navigate = useNavigate();
  const token = useUserStore(state => state.token);

  const handleDoubleClick = () => {
    navigate(`/task-details/${item.id}`);
  };

  const handleRestore = async () => {
    try {
      await restoreTask(item.id, token);
      // Handle successful restoration (e.g., remove the task from the deletedTasks state or refetch the tasks)
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Failed to restore task:', error);
    }
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
        {isDeleted ? (
          <>
            <Button variant="success" onClick={handleRestore}>Restore</Button>
            <Button variant="danger" onClick={handleDelete}>X</Button>
          </>
        ) : (
          <Button variant="danger" onClick={handleDelete}>X</Button> // Add the delete button for active tasks
        )}
      </Card.Body>
    </Card>
  );
}

export default TaskCard;