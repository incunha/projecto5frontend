import React, { useState, useEffect } from 'react';
import './Profile.css';
import useUserStore from '../../userStore';
import { Button, Form, FormGroup, Container, Row, Col, Card, FormControl, Image } from 'react-bootstrap';
import Sidebar from '../components/sideBar/sideBar';
import { useParams } from 'react-router-dom';

function Profile() {
  const { username: paramUsername } = useParams();
  const user = useUserStore(state => state.user);
  const fetchUser = useUserStore(state => state.fetchUser);
  const token = useUserStore(state => state.token);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const fetchTaskTotals = useUserStore(state => state.fetchTaskTotals);
  const taskTotals = useUserStore(state => state.taskTotals);
  const fetchOtherUser = useUserStore(state => state.fetchOtherUser);
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    if (paramUsername && paramUsername !== user?.username) {
      fetchOtherUser(token, paramUsername).then((data) => {
        setOtherUser(data);
      });
    }
  }, [fetchUser, fetchOtherUser, paramUsername, user, token]);

  useEffect(() => {
    const currentUser = paramUsername === user?.username ? user : otherUser;
    if (currentUser && currentUser.name) {
      const [first, ...last] = currentUser.name.split(' ');
      setFirstName(first);
      setLastName(last.join(' '));
      setUsername(currentUser.username);
      setEmail(currentUser.email);
      setUserPhoto(currentUser.userPhoto);
    }
  }, [user, otherUser, paramUsername]);

  useEffect(() => {
    fetchTaskTotals(token);
  }, [fetchTaskTotals, token]);

  useEffect(() => {
    const currentUser = paramUsername === user?.username ? user : otherUser;
    if (currentUser && currentUser.name) {
      const [first, ...last] = currentUser.name.split(' ');
      setFirstName(first);
      setLastName(last.join(' '));
      setUsername(currentUser.username);
      setEmail(currentUser.email);
      setUserPhoto(currentUser.userPhoto);
    }
  }, [user, otherUser, paramUsername]);

  const handleEditClick = (event) => {
    event.preventDefault();
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile profile-background d-flex justify-content-start align-items-center">
      <Sidebar />
      <Container fluid>
        <Row>
          <Col xs={12} md={8}>
            <Card className="card-user shadow p-3 mb-5 rounded">
              <CardHeader className="d-flex flex-column align-items-center">
                <Image src={userPhoto} roundedCircle style={{ width: '100px', height: '100px' }} />
                <CardTitle tag="h5" className="mt-3">{isEditing ? 'Edit Profile' : `${firstName} ${lastName}`}</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="6">
                      <FormGroup>
                        <Form.Label>Username</Form.Label>
                        <FormControl
                          defaultValue={username}
                          placeholder="Username"
                          type="text"
                          disabled
                          onChange={e => setUsername(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <Form.Label htmlFor="exampleInputEmail1">
                          Email address
                        </Form.Label>
                        <FormControl 
                          placeholder="Email" 
                          type="email" 
                          defaultValue={email}
                          disabled
                          onChange={e => setEmail(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <Form.Label>First Name</Form.Label>
                        <FormControl
                          defaultValue={firstName}
                          placeholder="First Name"
                          type="text"
                          disabled={!isEditing}
                          onChange={e => setFirstName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <Form.Label>Last Name</Form.Label>
                        <FormControl
                          defaultValue={lastName}
                          placeholder="Last Name"
                          type="text"
                          disabled={!isEditing}
                          onChange={e => setLastName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col className="pr-1" md="6">
                      <FormGroup>
                        <Form.Label>Profile Picture</Form.Label>
                        <FormControl
                          defaultValue={userPhoto}
                          placeholder="Profile Picture"
                          type="text"
                          disabled={!isEditing}
                          onChange={e => setUserPhoto(e.target.value)}
                          />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <Form.Label>Phone Number</Form.Label>
                        <FormControl
                          defaultValue={lastName}
                          placeholder="Phone number"
                          type="text"
                          disabled={!isEditing}
                          onChange={e => setLastName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                    <Button
  className="btn-round mt-3"
  color="primary"
  type="submit"
  onClick={handleEditClick}
  hidden={paramUsername !== user?.username}
>
  {isEditing ? 'Save' : 'Edit'}
</Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>

            <Card className="card-user shadow p-3 mb-5 rounded">
      <CardHeader>
        <CardTitle tag="h5">Tasks:</CardTitle>
      </CardHeader>
      <CardBody>
  <Form>
  <Row>
  <Col md="12">
    <FormGroup>
      <Form.Label style={{ marginRight: '10px', fontWeight: 'bold' }}>Total Tasks:</Form.Label>
      <Form.Text>{taskTotals && taskTotals[0]}</Form.Text>
    </FormGroup>
  </Col>
</Row>
<Row>
  <Col md="12">
    <FormGroup>
      <Form.Label style={{ marginRight: '10px', fontWeight: 'bold' }}>To Do Tasks:</Form.Label>
      <Form.Text>{taskTotals && taskTotals[1]}</Form.Text>
    </FormGroup>
  </Col>
</Row>
<Row>
  <Col md="12">
    <FormGroup>
      <Form.Label style={{ marginRight: '10px', fontWeight: 'bold' }}>Doing Tasks:</Form.Label>
      <Form.Text>{taskTotals && taskTotals[2]}</Form.Text>
    </FormGroup>
  </Col>
</Row>
<Row>
  <Col md="12">
    <FormGroup>
      <Form.Label style={{ marginRight: '10px', fontWeight: 'bold' }}>Done Tasks:</Form.Label>
      <Form.Text>{taskTotals && taskTotals[3]}</Form.Text>
    </FormGroup>
  </Col>
</Row>
  </Form>
</CardBody>
    </Card>
          </Col>
          <Col xs={12} md={4}>
          <Card className="card-user shadow p-3 mb-5 rounded">
            <CardHeader>
              <CardTitle tag="h5">Messages</CardTitle>
            </CardHeader>
            <CardBody>
              {/* Aqui é onde as mensagens serão renderizadas no futuro */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);
}

export default Profile;