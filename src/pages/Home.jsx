
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
import { useTranslation } from 'react-i18next';



function Home() {
  const token = useUserStore(state => state.token);
  const { tasks, set, fetchAllActiveTasks, selectedFilter } = useTaskStore();
  const [searchParams] = useSearchParams();
  const user = searchParams.get('username');
  const category = searchParams.get('category')
  const { t } = useTranslation();

  useEffect(() => {
    fetchAllActiveTasks(token);
  }, [token]);
  
  const columnData = [
    { status: 10, title: t('To Do') },
    { status: 20, title: t('Doing') },
    { status: 30, title: t('Done') },
  ].map(({ status, title }) => ({
    status,
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
              <Column {...column} itemPropName="item" status={column.status} /> 
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;