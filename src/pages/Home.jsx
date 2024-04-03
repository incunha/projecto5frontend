import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/sideBar/sideBar';

function Home() {
  const location = useLocation();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Atualiza o estado showButtons quando a rota muda
    setShowButtons(location.pathname === '/home');
  }, [location]);

  return (
    <div>
      <Sidebar />
      {showButtons && (
        <div>
          <button>New Task</button>
          <button>Deleted Tasks</button>
        </div>
      )}
    </div>
  );
}

export default Home;