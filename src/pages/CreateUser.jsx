import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './CreateUser.css';
import Sidebar from '../components/sideBar/sideBar';
import useUserStore from '../../userStore';
import { useTranslation } from 'react-i18next';
import Header from '../components/header/header';


function CreateUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [username, setUsername] = useState(''); 
  const token = useUserStore(state => state.token);
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };
    handleResize();
  
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/projecto5backend/rest/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "*/*",
        'token': token,
      },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`,
        email,
        contactNumber: contact,
        role,
        userPhoto: photoUrl,
        username,
      })
    });

    if (response.ok) {
      alert('A confirmation email has been sent to the email address');
    } else {
      alert('An error occurred while creating the account');
    }
  };

  return (
    <Container fluid className="p-0">
    <Header />
    <Row className="g-0">
      <Col>
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
      </Col>
      <Col>
          <Row className="justify-content-md-center">
            <Col xs={12} md={8}>
              <Row>
                <Col md={12} style={{ textAlign: 'center' }}>
                  <h1 className="mt-5">{t('Create New User')}</h1>
                </Col>
                <Col md={6}>
                  <Form onSubmit={handleSubmit} className="mt-5">
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="firstName">
                        <Form.Label style={{ fontWeight: 'bold' }}>{t('First Name')}</Form.Label> {/* Add font-weight: bold here */}
                        <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </Form.Group>

                      <Form.Group controlId="lastName">
                        <Form.Label style={{ fontWeight: 'bold' }}>{t('Last Name')}</Form.Label>
                        <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </Form.Group>

                      <Form.Group controlId="email">
                        <Form.Label style={{ fontWeight: 'bold' }}>{t('Email')}</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="contact">
                        <Form.Label style={{ fontWeight: 'bold' }}>{t('Contact')}</Form.Label>
                        <Form.Control type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
                      </Form.Group>

                      <Form.Group controlId="role">
                        <Form.Label style={{ fontWeight: 'bold' }}>{t('Role')}</Form.Label>
                        <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                          <option value="">{t('Select...')}</option>
                          <option value="developer">{t('Developer')}</option>
                          <option value="ScrumMaster">{t('Scrum Master')}</option>
                          <option value="Owner">{t('Product Owner')}</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="username"> 
                        <Form.Label>{t('Username')}</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                      </Form.Group>

                      <Form.Group controlId="photoUrl">
                        <Form.Label>{t('User Photo URL')}</Form.Label>
                        <Form.Control type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                      </Form.Group>
                      </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="mt-3">
                    {t('Create')}
                  </Button>
                  </Form>
                </Col>
                <Col md={6}>
                  {photoUrl && <img src={photoUrl} alt={t('User')} className="user-photo" />}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateUser;