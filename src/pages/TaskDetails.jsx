import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchTaskDetails,
  updateTask,
  fetchTaskCreator,
} from "../../taskActions";
import useUserStore from "../../userStore";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Header from "../components/header/header";
import Sidebar from "../components/sideBar/sideBar";
import useCategoryStore from "../../categoryStore";

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const token = useUserStore((state) => state.token);
  const { t } = useTranslation();
  const categories = useCategoryStore((state) => state.categories);
  const [creator, setCreator] = useState(null);
  const { role, username } = useUserStore((state) => state.user);

  // Garante que a tarefa e o criador são carregados mesmo que o id da tarefa mude

  useEffect(() => {
    fetchTaskDetails(id, token)
      .then((data) => {
        setTask(data);
        return fetchTaskCreator(id, token);
      })
      .then((creatorData) => setCreator(creatorData))
      .catch((error) => console.error("Error:", error));
  }, [id, token]);

  // Chama a função updateTask para salvar as alterações feitas na tarefa

  const handleSaveClick = () => {
    updateTask(task, token)
      .then(() => setIsEditing(false))
      .catch((error) => console.error("Error:", error));
  };

  // Alterna entre a visualização e edição da tarefa

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const priorityChoices = {
    100: "Low",
    200: "Medium",
    300: "High",
  };

  const statusChoices = {
    10: "To Do",
    20: "Doing",
    30: "Done",
  };

  let cardStyle = {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
  };
  if (task) {
    if (task.priority === 100) {
      cardStyle.backgroundColor = "#4CAF50"; // verde
    } else if (task.priority === 200) {
      cardStyle.backgroundColor = "#FFEB3B"; // amarelo
    } else if (task.priority === 300) {
      cardStyle.backgroundColor = "#F44336"; // vermelho
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Container className="mt-5">
          <h1 style={{ marginBottom: "2rem", color: "#333" }}>
            {t("Task Details")}
          </h1>
          {task && (
            <Card
              style={{
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                backgroundColor:
                  task.priority === 100
                    ? "#4CAF50"
                    : task.priority === 200
                    ? "#FFEB3B"
                    : "#F44336",
              }}
            >
              <Card.Body>
                <Form>
                  <Form.Group controlId="formCreator">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                        marginTop: "20px",
                      }}
                    >
                      <div style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                        <strong>Creator</strong>:
                      </div>
                      <div>{creator && creator.name}</div>
                    </div>
                  </Form.Group>
                  <Form.Group controlId="formTitle">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                        <strong>{t("Title")}</strong>:
                      </div>
                      {isEditing ? (
                        <Form.Control
                          type="text"
                          value={task.title}
                          onChange={(e) =>
                            setTask({ ...task, title: e.target.value })
                          }
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        />
                      ) : (
                        <div>{task.title}</div>
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group controlId="formDescription">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                        <strong>{t("Description")}</strong>:
                      </div>
                      {isEditing ? (
                        <Form.Control
                          as="textarea"
                          value={task.description}
                          onChange={(e) =>
                            setTask({ ...task, description: e.target.value })
                          }
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        />
                      ) : (
                        <div>{task.description}</div>
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group controlId="formCategory">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                        <strong>{t("Category")}</strong>:
                      </div>
                      {isEditing ? (
                        <Form.Control
                          as="select"
                          value={task.category}
                          onChange={(e) =>
                            setTask({ ...task, category: e.target.value })
                          }
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          {categories.map((category, index) => (
                            <option key={index} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </Form.Control>
                      ) : (
                        <div>{task.category}</div>
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group controlId="formPriority">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                        <strong>Priority</strong>:
                      </div>
                      {isEditing ? (
                        <Form.Control
                          as="select"
                          value={task.priority}
                          onChange={(e) =>
                            setTask({
                              ...task,
                              priority: Number(e.target.value),
                            })
                          }
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          <option value={100}>Low</option>
                          <option value={200}>Medium</option>
                          <option value={300}>High</option>
                        </Form.Control>
                      ) : (
                        <div>{priorityChoices[task.priority]}</div>
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group controlId="formStatus">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                        <strong>Status</strong>:
                      </div>
                      {isEditing ? (
                        <Form.Control
                          as="select"
                          value={task.status}
                          onChange={(e) =>
                            setTask({ ...task, status: e.target.value })
                          }
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          <option value={10}>To Do</option>
                          <option value={20}>Doing</option>
                          <option value={30}>Done</option>
                        </Form.Control>
                      ) : (
                        <div>{statusChoices[task.status]}</div>
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group controlId="formInitialDate">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                        <strong>{t("Initial Date")}</strong>:
                      </div>
                      {isEditing ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Form.Control
                            type="date"
                            defaultValue={task.startDate}
                            onChange={(e) =>
                              setTask({ ...task, initialDate: e.target.value })
                            }
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          />
                        </div>
                      ) : (
                        <div>{task.startDate}</div>
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group controlId="formFinalDate">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ marginRight: "10px", fontSize: "1.2rem" }}>
                        <strong>{t("Final Date")}</strong>:
                      </div>
                      {isEditing ? (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Form.Control
                            type="date"
                            defaultValue={task.endDate}
                            onChange={(e) =>
                              setTask({ ...task, finalDate: e.target.value })
                            }
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          />
                        </div>
                      ) : (
                        <div>{task.endDate}</div>
                      )}
                    </div>
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={isEditing ? handleSaveClick : handleEditClick}
                    style={{ backgroundColor: "#333", border: "none" }}
                    // Only show the edit button if the user is a 'Developer' and they are the task creator
                    hidden={
                      role === "developer" &&
                      creator &&
                      creator.username === username
                        ? "hidden"
                        : ""
                    }
                  >
                    {isEditing ? t("Save") : t("Edit")}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}
        </Container>
      </div>
    </div>
  );
}

export default TaskDetails;
