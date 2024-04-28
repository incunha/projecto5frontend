import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import useCategoryStore from '../../categoryStore'; 
import useUserStore from '../../userStore';
import { createTask } from '../../taskActions';
import { useNavigate } from 'react-router-dom';
import { useTasksWebSocket } from '../websocket/TasksWebSocket';
import Sidebar from '../components/sideBar/sideBar';
import Header from '../components/header/header';


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

  useEffect(() => {
    fetchCategories(token);
  }, [token]);


  const priorityOptions = {
    Low: 100,
    Medium: 200,
    High: 300,
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
      <Row>
        <Col xs={12} md={4} lg={3}>
          <Sidebar /> 
        </Col>
        <Col xs={12} md={8} lg={9}>
          <div className="create-task-page">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={2}>
          </Col>
          <Col xs={12} md={8}>
          <h2 className="text-center mb-4">Create Task</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="priority">
              <Form.Label>Priority</Form.Label>
              <Form.Control as="select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                {Object.keys(priorityOptions).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Create Task
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
        </Col>
      </Row>
    </div>
  );
}

export default CreateTask;