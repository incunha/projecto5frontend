import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteTask, restoreTask } from '../../../taskActions';
import useUserStore from '../../../userStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { useTasksWebSocket } from '../../websocket/TasksWebSocket';
import useTaskStore from '../../../taskStore';

function TaskCard({ item, isDeleted }) { 
  const navigate = useNavigate();
  const token = useUserStore(state => state.token);
  const sendMessage = useTasksWebSocket();
  const { addTask, removeTask, addDeletedTask, removeDeletedTask } = useTaskStore();

  const handleDoubleClick = () => {
    if (isDeleted) {
      return;
    }
    navigate(`/task-details/${item.id}`);
  };

  const handleRestore = async () => {
    try {
      await restoreTask(item.id, token);
      sendMessage({ action: 'restore', task: item }); 
      removeDeletedTask(item.id);
      addTask(item);
    } catch (error) {
      console.error('Failed to restore task:', error);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteTask(item.id, token); 
      sendMessage({ action: 'delete', task: item });
      console.log('Task deleted:', item.id);
      if (isDeleted) {
        removeDeletedTask(item.id);
      } else {
        removeTask(item.id);
        addDeletedTask(item);
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  let cardStyle = { opacity: isDeleted ? 0.5 : 1 };
  if (item.priority === 100) {
    cardStyle.backgroundColor = 'green';
  } else if (item.priority === 200) {
    cardStyle.backgroundColor = 'yellow';
  } else if (item.priority === 300) {
    cardStyle.backgroundColor = 'red';
  }

  return (
    <Card 
      style={{...cardStyle, width: '18rem', margin: '10px'}} 
      onDoubleClick={handleDoubleClick}
      draggable={!isDeleted}
      onDragStart={(e) => {e.dataTransfer.setData('text/plain', item.id);}}
    >
      <Card.Body style={{height: '7rem', overflow: 'auto'}}> 
        <Card.Title>{item.title}</Card.Title> 
        <Card.Text>{item.category}</Card.Text> 
        {isDeleted ? (
          <>
            <Button 
              variant="link" 
              onClick={handleRestore} 
              className="btn-sm" 
              style={{color: 'black', textDecoration: 'none', fontWeight: 'bold', position: 'absolute', bottom: '0', left: '0'}} 
            >
              <FontAwesomeIcon icon={faUndo} /> 
            </Button>
            <Button 
              variant="link" 
              onClick={handleDelete} 
              className="btn-sm" 
              style={{color: 'black', textDecoration: 'none', fontWeight: 'bold', position: 'absolute', bottom: '0', right: '0'}} 
            >
              X
            </Button> 
          </>
        ) : (
          <Button 
            variant="link" 
            onClick={handleDelete} 
            className="btn-sm" 
            style={{color: 'black', textDecoration: 'none', fontWeight: 'bold', position: 'absolute', bottom: '0', right: '0'}} 
          >
            X
          </Button> 
        )}
      </Card.Body>
    </Card>
  );
}

export default TaskCard;