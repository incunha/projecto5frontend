import React from 'react';
import './column.css';
import { Col } from 'react-bootstrap'; 

function Column({ title, items, CardComponent, className, itemPropName }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} className={`column ${className}`}>
      <h2 className="column-title">{title}</h2>
      <div className="column-content">
        {items.map((item, index) => (
          <CardComponent key={index} {...{ [itemPropName]: item }} />
        ))}
      </div>
    </Col>
  );
}

export default Column;