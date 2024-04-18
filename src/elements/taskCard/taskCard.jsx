import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteTask, restoreTask } from '../../../taskActions';
import useUserStore from '../../../userStore';
import { Draggable } from 'react-beautiful-dnd';

function TaskCard({ item, isDeleted, index }) { // Adicionei o prop 'index' aqui
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
      await deleteTask(item.id, token); 
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                <Button variant="danger" onClick={handleDelete}>X</Button>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;