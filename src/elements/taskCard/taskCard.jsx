import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteTask, restoreTask } from "../../../taskActions";
import useUserStore from "../../../userStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { useTasksWebSocket } from "../../websocket/TasksWebSocket";
import useTaskStore from "../../../taskStore";
import { useMediaQuery } from "react-responsive";

function TaskCard({ item, isDeleted }) {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const sendMessage = useTasksWebSocket();
  const { addTask, removeTask, addDeletedTask, removeDeletedTask } =
    useTaskStore();
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });


// fazendo duplo clique no card, o user é redirecionado para a página de detalhes da tarefa
  const handleDoubleClick = () => {
    if (isDeleted) {
      return;
    }
    navigate(`/task-details/${item.id}`);
  };

  //função para restaurar a tarefa

  const handleRestore = async () => {
    try {
      await restoreTask(item.id, token);
      sendMessage({ action: "restore", task: item });
      removeDeletedTask(item.id);
      addTask(item);
    } catch (error) {
      console.error("Failed to restore task:", error);
    }
  };

  //função para apagar a tarefa
  const handleDelete = async () => {
    try {
      await deleteTask(item.id, token);
      sendMessage({ action: "delete", task: item });
      console.log("Task deleted:", item.id);
      if (isDeleted) {
        removeDeletedTask(item.id);
      } else {
        removeTask(item.id);
        addDeletedTask(item);
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  //definir a cor do card consoante a prioridade da tarefa
  
  let cardStyle = { opacity: isDeleted ? 0.5 : 1 };
  if (item.priority === 100) {
    cardStyle.backgroundColor = "#4CAF50";
  } else if (item.priority === 200) {
    cardStyle.backgroundColor = "#FFEB3B";
  } else if (item.priority === 300) {
    cardStyle.backgroundColor = "#F44336";
  }

  return (
    <Card
      style={{ ...cardStyle, margin: "10px" }}
      onDoubleClick={handleDoubleClick}
      draggable={!isDeleted}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", item.id);
      }}
    >
      <Card.Body style={{ height: "5rem", width: "100%" }}>
        <Card.Title style={{ fontSize: "1rem" }}>{item.title}</Card.Title>
        <Card.Text style={{ fontSize: "0.7rem" }}>{item.category}</Card.Text>
        {isDeleted ? (
          <>
            <Button
              variant="link"
              onClick={handleRestore}
              className="btn-sm"
              style={{
                color: "black",
                textDecoration: "none",
                fontWeight: "bold",
                position: "absolute",
                bottom: "0",
                left: "0",
              }}
            >
              <FontAwesomeIcon icon={faUndo} />
            </Button>
            <Button
              variant="link"
              onClick={handleDelete}
              className="btn-sm"
              style={{
                color: "black",
                textDecoration: "none",
                fontWeight: "bold",
                position: "absolute",
                bottom: "0",
                right: "0",
              }}
            >
              X
            </Button>
          </>
        ) : (
          <Button
            variant="link"
            onClick={handleDelete}
            className="btn-sm"
            style={{
              color: "black",
              textDecoration: "none",
              fontWeight: "bold",
              position: "absolute",
              bottom: "0",
              right: "0",
            }}
          >
            X
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default TaskCard;
