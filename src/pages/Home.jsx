import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/sideBar/sideBar';
import Header from '../components/header/header';
import Column from '../elements/column/column';
import { Row, Col } from 'react-bootstrap'; 
import TaskCard from '../elements/taskCard/taskCard';
import useUserStore from '../../userStore';

function Home() {
  const location = useLocation();
  const [showButtons, setShowButtons] = useState(false);
  const [tasks, setTasks] = useState([]);
  const token = useUserStore(state => state.token);~

  useEffect(() => {
    fetch('http://localhost:8080/projecto5backend/rest/tasks?active=true', {
      headers:
      {
        Accept: "*/*",
        token: token,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setTasks(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);

  const columnData = [
  { status: 10, title: 'To Do' },
  { status: 20, title: 'Doing' },
  { status: 30, title: 'Done' },
].map(({ status, title }) => ({
  title,
  items: tasks.filter(task => task.status === status),
  CardComponent: TaskCard,
  onCardClick: () => {},
}));

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Row style={{ width: '100%' }}>
          {columnData.map((column, index) => (
            <Col xs={12} md={4} key={index}>
              <Column {...column}/>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;