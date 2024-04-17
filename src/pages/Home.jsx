
import Sidebar from '../components/sideBar/sideBar';
import Header from '../components/header/header';
import Column from '../elements/column/column';
import { Row, Col } from 'react-bootstrap'; 
import TaskCard from '../elements/taskCard/taskCard';
import useUserStore from '../../userStore';
import useTaskStore from '../../taskStore';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllActiveTasks } from '../../taskActions';

function Home() {
  const token = useUserStore(state => state.token);
  const { tasks, fetchAllActiveTasks, selectedFilter } = useTaskStore();
  const [searchParams] = useSearchParams();
  const user = searchParams.get('username');
  const category = searchParams.get('category')

  useEffect(() => {
    fetchAllActiveTasks(token);
  }, [token]);
  

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
            <Column {...column} itemPropName="item" /> 
          </Col>
        ))}
      </Row>
    </div>
  </div>
);
}

export default Home;