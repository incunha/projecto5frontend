import React, { useState, useEffect, useRef } from "react";
import "./Profile.css";
import useUserStore from "../../userStore";
import {Button,Form,FormGroup,Container,Row,Col,Card,FormControl,Image,} from "react-bootstrap";
import Sidebar from "../components/sideBar/sideBar";
import { useParams } from "react-router-dom";
import Header from "../components/header/header";
import { format } from "date-fns";
import { useMessages } from "../websocket/Messages";
import {deleteUser,restoreUser,updatePassword,updateUser,} from "../../userActions";
import { removeAllTasks } from "../../taskActions";
import { useTranslation } from "react-i18next";
import TaskPieChart from "../elements/TaskPieChart";
import { Modal } from "react-bootstrap";

function Profile() {
  const { username: paramUsername } = useParams();
  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const token = useUserStore((state) => state.token);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const fetchTaskTotals = useUserStore((state) => state.fetchTaskTotals);
  const taskTotals = useUserStore((state) => state.taskTotals);
  const fetchOtherUser = useUserStore((state) => state.fetchOtherUser);
  const [viewedUser, setViewedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const setUser = useUserStore((state) => state.setUser);
  const handleChatSubmit = useMessages(setMessages,newMessage,setNewMessage,paramUsername);
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handlePasswordModalClose = () => setShowModal(false);

  //função para apagar todas as tarefas
  const handleDeleteAllTasksSubmit = async () => {
    try {
      await removeAllTasks(token, paramUsername);
      console.log("All tasks deleted successfully");
    } catch (error) {
      console.error("Failed to delete all tasks", error);
    }
  };

  //função para mudar a password
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }
    await updatePassword(token, {
      password: oldPassword,
      newPassword: newPassword,
    });
    setShowModal(false);
  };

  //para quando o user entra, o scroll das mensagens vai para baixo para ver as ultimas mensagens
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };
  //sempre que recebe uma mensagem, faz scroll para baixo
  useEffect(scrollToBottom, [messages]);

  //função para ir buscar as mensagens

  const fetchMessages = async () => {
    if (user && user.username) {
      const response = await fetch(
        `http://localhost:8080/projecto5backend/rest/users/chat/${user.username}/${paramUsername}`,
        {
          headers: {
            Accept: "*/*",
            token: token,
          },
        }
      );
      const data = await response.json();
      setMessages(data);
    }
  };

  /*verifica se o nome de usuário atualmente visualizado na página (username) é diferente do nome de usuário do usuário logado (user.username). 
Se forem diferentes, isso significa que estamos visualizando o perfil de outro usuário e precisamos buscar as mensagens do chat com esse usuário. Portanto, a função fetchMessages() é chamada para buscar as mensagens. 
Caso contrário, se estivermos visualizando nosso próprio perfil, não precisamos buscar as mensagens e a operação é ignorada (null).*/

  useEffect(() => {
    {
      username !== user.username ? fetchMessages() : null;
    }
  }, [user, paramUsername, token]);

  const messageStyles = {
    sent: "sent-message",
    received: "received-message",
  };

  /* verifica se o username do url é o mesmo do username do user que esta logado.
Se sim, apresenta os dados do user, senão vai buscar os dados do perfil do user que ele estar
a ver */

  useEffect(() => {
    if (paramUsername !== user?.username) {
      fetchOtherUser(token, paramUsername).then((data) => {
        setViewedUser(data);
      });
    } else {
      setViewedUser(user);
    }
  }, [paramUsername, user, token, fetchOtherUser]);

  /*Sincroniza os estados locais com as informações do user
  visualizado sempre que essas informações mudam. Isso garante que os dados exibidos na interface do 
  user estejam sempre atualizados com as informações mais recentes do user visualizado.*/

  useEffect(() => {
    const currentUser = viewedUser;
    if (currentUser && currentUser.name) {
      const [first, ...last] = currentUser.name.split(" ");
      setFirstName(first);
      setLastName(last.join(" "));
      setUsername(currentUser.username);
      setcontactNumber(currentUser.contactNumber);
      setEmail(currentUser.email);
      setUserPhoto(currentUser.userPhoto);
    }
  }, [viewedUser]);

  /*garante que os totais das tarefas relacionadas ao user sejam chamados e atualizados sempre que o paramUsername muda, 
  garantindo que as informações exibidas na interface do usuário sejam sempre precisas e atualizadas.  */

  useEffect(() => {
    const fetchTotals = async () => {
      await fetchTaskTotals(token, paramUsername);
    };
    fetchTotals();
  }, [paramUsername]);

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    /* permite que o user edite suas informações de perfil e as 
    atualize no servidor quando o formulário é enviado. */

    if (isEditing) {
      const name = `${firstName} ${lastName}`;
      const updatedUser = {
        name: name,
        username: user.username,
        email: user.email,
        contactNumber: contactNumber,
        userPhoto: userPhoto,
      };
      try {
        await updateUser(token, updatedUser);
        setUser(updatedUser);
      } catch (error) {
        console.error("Failed to update user", error);
      }
    }

    setIsEditing(!isEditing);
  };

  
  /*lógica de chamada das funções de exclusão e restauração de users.*/

  const handleDeleteSubmit = async () => {
    try {
      await deleteUser(token, paramUsername);
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleRestoreSubmit = async () => {
    try {
      await restoreUser(token, paramUsername);
      console.log("User restored successfully");
    } catch (error) {
      console.error("Failed to restore user", error);
    }
  };

  return (
    <div className="profile-container">
      <Row className="flex-nowrap">
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="flex-nowrap">
        <Col xs="auto">
          <Sidebar />
        </Col>
        <Col className="page-content">
          <Container fluid>
            <Row>
              <Col xs={12} md={8}>
                <Card
                  className="card-user p-3 mb-5"
                  style={{ border: "none", boxShadow: "none" }}
                >
                  {" "}
                  {/* Remove shadow and rounded classes, set backgroundColor to transparent and boxShadow to none */}
                  <Card.Header
                    className="d-flex flex-column align-items-center justify-content-start"
                    style={{
                      marginTop: "-10px",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  >
                    <Row className="align-items-center">
                      <Col
                        xs={12}
                        md={6}
                        className="d-flex flex-column align-items-center justify-content-center"
                      >
                        <Card.Title tag="h5" className="mb-3">
                          {isEditing
                            ? t("Edit Profile")
                            : `${firstName} ${lastName}`}
                        </Card.Title>
                        <Image
                          src={userPhoto}
                          roundedCircle
                          className="profile-image"
                        />
                      </Col>
                      <Col
                        xs={12}
                        md={6}
                        className="d-flex justify-content-center justify-content-md-start"
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "100%",
                          }}
                        >
                          <TaskPieChart taskTotals={taskTotals} />
                        </div>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col className="px-1" md="6">
                          <FormGroup>
                            <Form.Label>{t("Username")}</Form.Label>
                            <FormControl
                              defaultValue={username}
                              placeholder="Username"
                              type="text"
                              disabled
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <Form.Label>{t("Email address")}</Form.Label>
                            <FormControl
                              placeholder="Email"
                              type="email"
                              defaultValue={email}
                              disabled
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <Form.Label>{t("First Name")}</Form.Label>
                            <FormControl
                              defaultValue={firstName}
                              placeholder="First Name"
                              type="text"
                              disabled={!isEditing}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <Form.Label>{t("Last Name")}</Form.Label>
                            <FormControl
                              defaultValue={lastName}
                              placeholder="Last Name"
                              type="text"
                              disabled={!isEditing}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <Form.Label>{t("Profile Picture")}</Form.Label>
                            <FormControl
                              defaultValue={userPhoto}
                              placeholder="Profile Picture"
                              type="text"
                              disabled={!isEditing}
                              onChange={(e) => setUserPhoto(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <Form.Label>{t("Phone Number")}</Form.Label>
                            <FormControl
                              defaultValue={contactNumber}
                              placeholder="Phone number"
                              type="text"
                              disabled={!isEditing}
                              onChange={(e) => setcontactNumber(e.target.value)}
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
                            onClick={handleEditSubmit}
                            hidden={paramUsername !== user?.username}
                            style={{ marginRight: "10px" }} 
                          >
                            {isEditing ? t("Save") : t("Edit")}
                          </Button>

                          <Button
                            className="btn-round mt-3"
                            color="info"
                            type="button"
                            onClick={() => setShowModal(true)}
                            hidden={paramUsername !== user?.username}
                          >
                            {t("Change Password")}
                          </Button>

                          <Button
                            className="btn-round mt-3"
                            color="warning"
                            type="button"
                            onClick={handleDeleteAllTasksSubmit}
                            hidden={
                              paramUsername === user?.username ||
                              user?.role !== "Owner"
                            }
                            style={{ marginRight: "10px" }} 
                          >
                            Delete All Tasks
                          </Button>

                          <Button
                            className="btn-round mt-3"
                            color="danger"
                            type="button"
                            onClick={handleDeleteSubmit}
                            hidden={
                              paramUsername === user?.username ||
                              user?.role !== "Owner"
                            }
                            style={{ marginRight: "10px" }} 
                          >
                            Delete
                          </Button>

                          <Button
                            className="btn-round mt-3"
                            color="success"
                            type="button"
                            onClick={handleRestoreSubmit}
                            hidden={
                              viewedUser?.active ||
                              paramUsername === user?.username ||
                              user?.role !== "Owner"
                            }
                            style={{ marginRight: "10px" }} // Adiciona espaço à direita
                          >
                            Restore
                          </Button>
                        </div>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4}>
                {paramUsername !== user?.username &&
                  viewedUser?.active && ( // Verifica se o usuário está ativo
                    <Card className="card-user shadow p-3 mb-5 rounded">
                      <Card.Header>
                        <Card.Title tag="h5">{t("Messages")}</Card.Title>
                      </Card.Header>
                      <Card.Body className="message-container">
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              justifyContent:
                                message.sender === user.username
                                  ? "flex-end"
                                  : "flex-start",
                            }}
                          >
                            <div
                              className={
                                message.sender === user.username
                                  ? messageStyles.sent
                                  : messageStyles.received
                              }
                            >
                              <div className="message-sender">
                                <Image
                                  src={
                                    message.sender === user.username
                                      ? user?.userPhoto
                                      : viewedUser?.userPhoto
                                  }
                                  roundedCircle
                                  className="message-image"
                                />
                                <p className="message-text">{message.sender}</p>
                              </div>
                              <p>{message.message}</p>
                              <p className="message-timestamp">
                                {message.sendDate
                                  ? isNaN(new Date(message.sendDate).getTime())
                                    ? "Invalid date"
                                    : format(
                                        new Date(message.sendDate),
                                        "dd/MM/yyyy HH:mm"
                                      )
                                  : "No timestamp"}
                                {message.read &&
                                  message.sender === user.username &&
                                  " ✓✓"}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </Card.Body>
                      <Card.Footer>
                        <Form onSubmit={handleChatSubmit}>
                          <FormGroup
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                          >
                            <FormControl
                              type="text"
                              placeholder={t("Type your message...")}
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                            />
                          </FormGroup>
                          <Button type="submit">{t("Send")}</Button>
                        </Form>
                      </Card.Footer>
                    </Card>
                  )}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handlePasswordModalClose}>
        <Modal.Header closeButton style={{ justifyContent: "space-between" }}>
          <Modal.Title>{t("Change Password")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordChange}>
            <FormGroup>
              <Form.Label>{t("Old Password")}</Form.Label>
              <FormControl
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>{t("New Password")}</Form.Label>
              <FormControl
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>{t("Confirm New Password")}</Form.Label>
              <FormControl
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>
            <Button type="submit">{t("Change Password")}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
