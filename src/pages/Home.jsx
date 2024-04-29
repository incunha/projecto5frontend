
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
import { useTasksWebSocket } from '../websocket/TasksWebSocket';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useMediaQuery } from 'react-responsive';
import './Home.css';



function Home() {
  const token = useUserStore(state => state.token);
  const { tasks, set, fetchAllActiveTasks, selectedFilter } = useTaskStore();
  const [searchParams] = useSearchParams();
  const user = searchParams.get('username');
  const category = searchParams.get('category')
  const { t } = useTranslation();
  const isMobile = useMediaQuery({ query: '(max-width: 900px)' });

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

  useTasksWebSocket();

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        {isMobile ? (
          <Carousel showThumbs={false} emulateTouch>
          {columnData.map((column, index) => (
            <div key={index} className="column-carousel" style={{ width: '100%', padding: '0 10px' }}>
              <Column {...column} itemPropName="item" status={column.status} /> 
            </div>
          ))}
        </Carousel>
        ) : (
          <div className="row-carousel" style={{ marginLeft: '9%' }}>
            {columnData.map((column, index) => (
             <div key={index} style={{ flex: '1 0 auto', minWidth: isMobile ? '100%' : '300px', margin: '0 10px' }}>
             <Column {...column} itemPropName="item" status={column.status} /> 
           </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;