import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/sideBar/sideBar';
import Header from '../components/header/header';

function Home() {
    const location = useLocation();
    const [showButtons, setShowButtons] = useState(false);
  
    return (
      <div>
        <Header />
        <Sidebar />
      </div>
    );
  }

export default Home;