import React from 'react';
import './column.css';
import { Col } from 'react-bootstrap'; 

function Column({ title, className }) {
  return (
    <Col xs={12} sm={12} md={3} className={`column ${className}`}>
      <h2 className="column-title">{title}</h2>
      <div className="column-content">
        {/* Conteúdo da coluna */}
      </div>
    </Col>
  );
}

export default Column;