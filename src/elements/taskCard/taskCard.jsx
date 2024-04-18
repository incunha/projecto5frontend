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

    } catch (error) {
      
      console.error('Failed to restore task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(item.id, token); 
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <Card onDoubleClick={handleDoubleClick}
    draggable="true"
    onDragStart={(e) => {e.dataTransfer.setData('text/plain', item.id);}}
    >
      <Card.Body>
        <Card.Title>{item.title}</Card.Title> 
        <Card.Text>{item.category}</Card.Text> 
        {isDeleted ? (
          <>
            <Button variant="success" onClick={handleRestore}>Restore</Button>
            <Button variant="danger" onClick={handleDelete}>X</Button>
          </>
        ) : (
          <Button variant="danger" onClick={handleDelete}>X</Button> 
        )}
      </Card.Body>
    </Card>
  );
}

export default TaskCard;