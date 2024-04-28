import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import useCategoryStore from '../../categoryStore'; 
import useUserStore from '../../userStore';
import { createTask } from '../../taskActions';
import { useNavigate } from 'react-router-dom';
import { useTasksWebSocket } from '../websocket/TasksWebSocket';
import Sidebar from '../components/sideBar/sideBar';
import Header from '../components/header/header';
import { useTranslation } from 'react-i18next';


function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [category, setCategory] = useState('');
  const token = useUserStore((state) => state.token);
  const { categories, fetchCategories } = useCategoryStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    fetchCategories(token);
  }, [token]);


  const priorityOptions = {
    [t('Low')]: 100,
    [t('Medium')]: 200,
    [t('High')]: 300,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const payload = {
      title,
      description,
      priority: priorityOptions[priority],
      startDate,
      endDate,
      category,
    };

  await createTask(token, payload);
  
  navigate('/home');
};


return (
  <div>
    <Header />
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '0 0 200px' }}>
        <Sidebar />
      </div>
      <div style={{ flex: '1 0 auto' }}>
        <div className="create-task-page">
          <Container>
            <h2 className="text-center mb-4"style={{ marginTop:'40px' }}>{t('Create Task')}</h2>
            <Form onSubmit={handleSubmit}>
  <Row>
    <Col md={6}>
      <Form.Group controlId="title">
        <Form.Label style={{ fontWeight: 'bold', marginTop: '20px' }}>{t('Title')}</Form.Label>
        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="description" style={{ marginTop: '20px' }}>
        <Form.Label style={{ fontWeight: 'bold' }}>{t('Description')}</Form.Label>
        <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={{ fontSize: '140px' }} />
      </Form.Group>
    </Col>
    <Col md={6}>
                      <Form.Group controlId="priority">
                        <Form.Label style={{ fontWeight: 'bold', marginTop: '20px' }}>{t('Priority')}</Form.Label>
                        <Form.Control as="select" value={priority} onChange={(e) => setPriority(e.target.value)} style={{ marginBottom: '20px' }}>
                          {Object.keys(priorityOptions).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="category">
                        <Form.Label style={{ fontWeight: 'bold' }}>{t('Category')}</Form.Label>
                        <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginBottom: '20px' }}>
                          {categories.map((category) => (
                            <option key={category.name} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="startDate">
                        <Form.Label style={{ fontWeight: 'bold' }}>{t('Start Date')}</Form.Label>
                        <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ marginBottom: '20px' }}/>
                      </Form.Group>

                      <Form.Group controlId="endDate">
                        <Form.Label style={{ fontWeight: 'bold' }}>{t('End Date')}</Form.Label>
                        <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}style={{ marginBottom: '20px' }} />
                      </Form.Group>
                      </Col>
              </Row>
              <Button variant="primary" type="submit" className="mt-3">
                {t('Create')}
              </Button>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  </div>
);
}

export default CreateTask;