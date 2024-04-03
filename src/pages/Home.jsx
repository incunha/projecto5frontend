import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/sideBar/sideBar';

function Home() {
    const location = useLocation();
    const [showButtons, setShowButtons] = useState(false);
  
    return (
      <div>
        <Sidebar />
      </div>
    );
  }

export default Home;