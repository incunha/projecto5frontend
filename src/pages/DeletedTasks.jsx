import Sidebar from '../components/sideBar/sideBar';
import Header from '../components/header/header';
import Column from '../elements/column/column';
import { Row, Col } from 'react-bootstrap'; 
import TaskCard from '../elements/taskCard/taskCard';
import useUserStore from '../../userStore';
import useTaskStore from '../../taskStore';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function DeletedTasks() {
  const token = useUserStore(state => state.token);
  const { deletedTasks, fetchInactiveTasks } = useTaskStore();
  const { t } = useTranslation();

  //chama a função fetchInactiveTasks para apresentar as tarefas deletadas
  useEffect(() => {
    fetchInactiveTasks(token);
  }, [token]);

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Row style={{ width: '100%' }}>
        {[
          { status: 10, title: t('To Do') },
          { status: 20, title: t('Doing') },
          { status: 30, title: t('Done') },
        ].map(({ status, title }, index) => {
          const items = deletedTasks.filter(task => task.status === status);
          return (
            <Col xs={12} md={4} key={index}>
              <Column title={title} items={items} itemPropName="item" isDeleted={true} CardComponent={TaskCard} onCardClick={() => {}} /> 
            </Col>
          );
        })}
        </Row>
      </div>
    </div>
  );
}

export default DeletedTasks;