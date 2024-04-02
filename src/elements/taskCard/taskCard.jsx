import React, { useEffect, useState } from 'react';
import './taskCard.css';
import TaskModal from '../../modals/modal-task/modalTask';
import useTasksStore from '../../../taskStore';
import { useUserStore } from '../../../userStore';
import ConfirmationModal from '../../modals/modal-confirmation/confirmationModal';

function TaskCard({ task, active }) {
  // Extrai os atributos da tarefa
  const { title, priority } = task;
  // Estado para controlar a abertura do modal de edição da tarefa
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Função para excluir uma tarefa
  const deleteTask = useTasksStore((state) => state.deleteTask);
  // Obtém informações do usuário logado
  const loggedUser = useUserStore((state) => state.loggedUser);
  // Estados para controlar a abertura dos modais de confirmação para exclusão e restauração
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
  const [isRestoreConfirmationModalOpen, setIsRestoreConfirmationModalOpen] = useState(false);

  // Função para lidar com a exclusão da tarefa
  const handleDelete = async () => {
    setIsDeleteConfirmationModalOpen(true);
  };

  // Função para confirmar a exclusão da tarefa
  const handleConfirmDelete = async () => {
    await deleteTask(task.id, active);
    setIsDeleteConfirmationModalOpen(false);
  };

// Função para cancelar a exclusão da tarefa
  const handleCancelDelete = () => {
    setIsDeleteConfirmationModalOpen(false);
  };

  // Função para lidar com o clique duplo no cartão de tarefa
  const handleDoubleClick = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal de edição da tarefa
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
// Funções para lidar com a restauração da tarefa
  const handleRestore = async () => {
    setIsRestoreConfirmationModalOpen(true);
  };

  // Função que restaura a tarefa
  const handleConfirmRestore = async () => {
    const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/tasks/active/${task.id}`, {
      method: 'PATCH',
      headers: {
        Accept: "*/*",
        token: sessionStorage.getItem("token"),
      },
    });
    if (response.ok) {  
      useTasksStore.getState().fetchActiveTasks();
      useTasksStore.getState().fetchInactiveTasks();
    } else {
      console.error('Failed to restore task');
    }
    setIsRestoreConfirmationModalOpen(false);
  };

  const handleCancelRestore = () => {
    setIsRestoreConfirmationModalOpen(false);
  };

  // Função para buscar informações do user que criou a tarefa
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/tasks/creator/${task.id}`, {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          token: sessionStorage.getItem('token'),
        }
      });
      if (!response.ok) {
        console.error('Error fetching user info:', response.statusText);
      }
    };
  
    fetchUserInfo();
  }, [task]);

  // Função para obter a cor da borda do cartão de tarefa
  const getBorderColor = () => {
    switch(priority) {
      case 100: return active ? 'rgba(144, 238, 144, 1)' : 'rgba(144, 238, 144, 0.5)';
      case 200: return active ? 'rgba(255, 255, 0, 1)' : 'rgba(255, 255, 0, 0.5)';
      case 300: return active ? 'rgba(255, 0, 0, 1)' : 'rgba(255, 0, 0, 0.5)';
      default: return active ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.5)';
    }
  };

  // Função para obter a cor de fundo do cartão de tarefa
  const getBackgroundColor = () => {
    switch(priority) {
      case 100: return 'rgba(144, 238, 144, 0.2)'; 
      case 200: return 'rgba(255, 255, 0, 0.2)'; 
      case 300: return 'rgba(255, 0, 0, 0.2)'; 
      default: return 'rgba(255, 255, 255, 0.2)'; 
    }
  };

  // Estilo do cartão de tarefa
  const cardStyle = {
    backgroundColor: getBackgroundColor(), 
    border: `7px solid ${getBorderColor()}`,
  };
  
  // Renderiza o cartão de tarefa
  return (
    <div 
      className= {`task-card ${active ? 'active' : 'inactive'}`} 
      style={cardStyle} draggable={active}  onDragStart={(event)=>{
        if (!active) {
          event.preventDefault();
        } else {
          event.dataTransfer.setData('text/plain',task.id);
        }
      }} onDoubleClick={handleDoubleClick}
    >
      <div className="task-title">{title}</div>
      {isModalOpen && <TaskModal task={task} isOpen={isModalOpen} onClose={handleCloseModal} />}
      {isDeleteConfirmationModalOpen && <ConfirmationModal isOpen={isDeleteConfirmationModalOpen} onRequestClose={handleCancelDelete} message="Are you sure you want to delete this task?" onConfirm={handleConfirmDelete} />}
      {isRestoreConfirmationModalOpen && <ConfirmationModal isOpen={isRestoreConfirmationModalOpen} onRequestClose={handleCancelRestore} message="Are you sure you want to restore this task?" onConfirm={handleConfirmRestore} />}
      {(loggedUser?.role && ((loggedUser.role === 'ScrumMaster' && active) || loggedUser.role === 'Owner')) && <button className="deleteTaskButton" onClick={handleDelete}>X</button>}
      {loggedUser?.role && loggedUser.role === 'Owner' && !active && <button className="restoreTaskButton" onClick={handleRestore}>
      <img src="multimedia/restore.png" alt="Restore Icon" /> </button>}
    </div>
  );
}
export default TaskCard;