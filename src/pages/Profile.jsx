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
  const [viewedUser, setViewedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [websocket, setWebsocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('DISCONNECTED');

  useEffect(() => {
    fetch(`http://localhost:8080/projecto5backend/rest/users/chat/${user.username}/${paramUsername}`, {
    headers: {
      'Accept': '*/*',
      'token': token,
    }
  })
      .then(response => response.json())
      .then(data => {
        setMessages(data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, [user, paramUsername]);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/projecto5backend/chat/${user.username}`); 
    setWebsocket(socket);

    socket.onopen = function(event) {
      setConnectionStatus('CONNECTED');
    };

    socket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };

    socket.onclose = function(event) {
      setConnectionStatus('DISCONNECTED');
    };

    socket.onerror = function(event) {
      console.error('WebSocket error observed:', event);
    };

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  const handleChatSubmit = (event) => {
    event.preventDefault();
    if (connectionStatus === 'CONNECTED') {
      const messageToSend = {
        sender: user.username,
        receiver: paramUsername,
        message: newMessage,
        timestamp: new Date().toISOString()
      };
      websocket.send(JSON.stringify(messageToSend));
      setNewMessage('');
    } else {
      console.error('WebSocket connection is not ready.');
    }
  };

  useEffect(() => {
    if (paramUsername !== user?.username) {
      fetchOtherUser(token, paramUsername).then(data => setViewedUser(data));
    } else {
      setViewedUser(user);
    }
  }, [paramUsername, user, token, fetchOtherUser]);

  useEffect(() => {
    const currentUser = viewedUser;
    if (currentUser && currentUser.name) {
      const [first, ...last] = currentUser.name.split(' ');
      setFirstName(first);
      setLastName(last.join(' '));
      setUsername(currentUser.username);
      setEmail(currentUser.email);
      setUserPhoto(currentUser.userPhoto);
    }
  }, [viewedUser]);

  useEffect(() => {
    const fetchTotals = async () => {
      await fetchTaskTotals(token, paramUsername);
    };
    fetchTotals();
      console.log(paramUsername);
  }, [paramUsername]);

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
              <Card.Header className="d-flex flex-column align-items-center">
                <Image src={userPhoto} roundedCircle style={{ width: '100px', height: '100px' }} />
                <Card.Title tag="h5" className="mt-3">{isEditing ? 'Edit Profile' : `${firstName} ${lastName}`}</Card.Title>
              </Card.Header>
              <Card.Body>
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
              </Card.Body>
            </Card>
  
            <Card className="card-user shadow p-3 mb-5 rounded">
              <Card.Header>
                <Card.Title tag="h5">Tasks:</Card.Title>
              </Card.Header>
              <Card.Body>
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
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-user shadow p-3 mb-5 rounded">
              <Card.Header>
                <Card.Title tag="h5">Messages</Card.Title>
              </Card.Header>
              <Card.Body>
  {messages.map((message, index) => (
    <div key={index} style={{ textAlign: message.sender === user.username ? 'right' : 'left' }}>
      <p>{message.sender}</p>
      <p>{message.message}</p>
      <hr />
    </div>
  ))}
  <Form onSubmit={handleChatSubmit}>
    <FormGroup>
      <FormControl
        type="text"
        placeholder="Type your message..."
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
      />
    </FormGroup>
    <Button type="submit">Send</Button>
  </Form>
</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;