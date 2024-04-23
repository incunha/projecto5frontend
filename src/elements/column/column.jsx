import React from 'react';
import './column.css';
import { Col } from 'react-bootstrap'; 
import { changeTaskStatus } from '../../../taskActions';
import useUserStore from '../../../userStore';
import { useTasksWebSocket } from '../../websocket/TasksWebSocket';

function Column({ title, items, CardComponent, className, itemPropName, isDeleted, status }) {

  const token = useUserStore(state => state.token);
  const sendMessage = useTasksWebSocket();

  const handleUpdate = async (id, status) => {
    try {
      const updatedTask = await changeTaskStatus(id, status, token); 
      sendMessage({ action: 'status', task: updatedTask });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className={`column ${className}`} 
      onDragOver={(e) => e.preventDefault()} 
      onDrop={(e) => {
        const itemId = e.dataTransfer.getData('text/plain'); 
        handleUpdate(itemId, status); 
      }}
    >
      <h2 className="column-title">{title}</h2>
      <div className="column-content">
        {items.map((item, index) => (
          <CardComponent key={index} {...{ [itemPropName]: item, isDeleted }} />
        ))}
      </div>
    </Col>
  );
}

export default Column;