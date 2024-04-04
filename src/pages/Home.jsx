import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/sideBar/sideBar';
import Header from '../components/header/header';
import Column from '../elements/column/column';
import { Row } from 'react-bootstrap'; 

function Home() {
    const location = useLocation();
    const [showButtons, setShowButtons] = useState(false);
  

    const columnData = [
      { title: 'To Do', items: ['Item 1', 'Item 2', 'Item 3'], CardComponent: () => <div>Card</div>, onCardClick: () => {} },
      { title: 'Doing', items: ['Item 1', 'Item 2', 'Item 3'], CardComponent: () => <div>Card</div>, onCardClick: () => {} },
      { title: 'Done', items: ['Item 1', 'Item 2', 'Item 3'], CardComponent: () => <div>Card</div>, onCardClick: () => {} },
    ];
  
    return (
      <div>
        <Header />
        <div style={{ display: 'flex' }}> {/* Adiciona um contêiner flexível */}
          <Sidebar />
          <Row style={{ width: '100%', flexWrap: 'wrap-reverse' }}> {/* Adiciona flex-wrap: wrap-reverse */}
            {columnData.map((column, index) => (
              <Column key={index} {...column} />
            ))}
          </Row>
        </div>
      </div>
    );
  }
  
  export default Home;