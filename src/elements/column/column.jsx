import React from 'react';
import './column.css';
import { Col } from 'react-bootstrap'; 
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function Column({ title, items, CardComponent, className, itemPropName, isDeleted }) {
  const handleDragEnd = (result) => {
    // Aqui você pode lidar com o resultado do arrasto.
    // Por exemplo, você pode atualizar o estado da sua aplicação
    // com base na nova ordem dos itens.
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className={`column ${className}`}>
      <h2 className="column-title">{title}</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={title}>
          {(provided) => (
            <div className="column-content" ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <CardComponent key={index} index={index} {...{ [itemPropName]: item, isDeleted }} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Col>
  );
}

export default Column;