import Sidebar from '../components/sideBar/sideBar';
import Header from '../components/header/header';
import Column from '../elements/column/column';
import { Row, Col } from 'react-bootstrap'; 
import TaskCard from '../elements/taskCard/taskCard';
import useUserStore from '../../userStore';
import useTaskStore from '../../taskStore';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function DeletedTasks() {
  const [showButtons, setShowButtons] = useState(false);
  const token = useUserStore(state => state.token);
  const { deletedTasks, fetchInactiveTasks } = useTaskStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchInactiveTasks(token);
  }, []);

  const columnData = [
    { status: 10, title: t('To Do') },
    { status: 20, title: t('Doing') },
    { status: 30, title: t('Done') },
  ].map(({ status, title }) => ({
    title,
    items: deletedTasks.filter(task => task.status === status),
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
    <Column {...column} itemPropName="item" isDeleted={true} CardComponent={TaskCard} /> 
  </Col>
))}
      </Row>
    </div>
  </div>
);
}

export default DeletedTasks;