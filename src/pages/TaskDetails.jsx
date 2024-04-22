import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTaskDetails, updateTask } from '../../taskActions';
import useUserStore from '../../userStore';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const token = useUserStore(state => state.token);
  const { t } = useTranslation();

  useEffect(() => {
    fetchTaskDetails(id, token)
      .then(data => setTask(data))
      .catch(error => console.error('Error:', error));
  }, [id, token]);

  const handleSaveClick = () => {
    updateTask(task, token)
      .then(() => setIsEditing(false))
      .catch(error => console.error('Error:', error));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Container className="mt-5">
      <h1>{t('Task Details')}</h1>
      {task && (
        <Card>
          <Card.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formTitle">
                  <Form.Label>{t('Title')}:</Form.Label>
                  {isEditing 
                    ? <Form.Control type="text" value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} /> 
                    : <Form.Label>{task.title}</Form.Label>}
                </Form.Group>
                <Form.Group as={Col} controlId="formDescription">
                  <Form.Label>{t('Description')}:</Form.Label>
                  {isEditing 
                    ? <Form.Control as="textarea" value={task.description} onChange={e => setTask({ ...task, description: e.target.value })} /> 
                    : <Form.Label>{task.description}</Form.Label>}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formCategory">
                  <Form.Label>{t('Category')}:</Form.Label>
                  {isEditing 
                    ? <Form.Control type="text" value={task.category} onChange={e => setTask({ ...task, category: e.target.value })} /> 
                    : <Form.Label>{task.category}</Form.Label>}
                </Form.Group>
                <Form.Group as={Col} controlId="formPriority">
                  <Form.Label>Priority:</Form.Label>
                  {isEditing 
                    ? <Form.Control type="number" value={task.priority} onChange={e => setTask({ ...task, priority: e.target.value })} /> 
                    : <Form.Label>{task.priority}</Form.Label>}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formStatus">
                  <Form.Label>Status:</Form.Label>
                  {isEditing 
                    ? <Form.Control type="number" value={task.status} onChange={e => setTask({ ...task, status: e.target.value })} /> 
                    : <Form.Label>{task.status}</Form.Label>}
                </Form.Group>
                <Form.Group as={Col} controlId="formInitialDate">
  <Form.Label>{t('Initial Date')}:</Form.Label>
  {isEditing 
    ? <Form.Control type="date" value={task.initialDate} onChange={e => setTask({ ...task, initialDate: e.target.value })} /> 
    : <Form.Label>{task.startDate}</Form.Label>}
</Form.Group>
<Form.Group as={Col} controlId="formFinalDate">
  <Form.Label>{t('Final Date')}:</Form.Label>
  {isEditing 
    ? <Form.Control type="date" value={task.finalDate} onChange={e => setTask({ ...task, finalDate: e.target.value })} /> 
    : <Form.Label>{task.endDate}</Form.Label>}
</Form.Group>
              </Row>
              <Button variant="primary" onClick={isEditing ? handleSaveClick : handleEditClick}>
                {isEditing ? t('Save') : t('Edit')}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default TaskDetails;