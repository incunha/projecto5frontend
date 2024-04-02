import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './menuAside.css';
import MyTasksButton from '../../elements/buttons/myTasksButton';
import EditProfileButton from '../../elements/buttons/editProfileButton';
import AddTaskButton from '../../elements/buttons/addTaskButton';
import AddUserButton from '../../elements/buttons/addUserButton';
import ModalAddUser from '../../modals/modal-addUser/modal-addUser';
import AddTaskModal from '../../modals/modal-addTask/modal-addTask';
import CategoriesButton from '../../elements/buttons/categoriesButton';
import CategoriesModal from '../../modals/modal-categories/categoriesModal';
import ViewUsersButton from '../../elements/buttons/viewUsersButton';
import Users from '../../elements/users';
import ViewTasksButton from '../../elements/buttons/viewTasksButton';
import ViewDeletedTasksButton from '../../elements/buttons/viewDeletedTasksButton';
import { useUserStore } from '../../../userStore';
import DeletedTasks from '../../elements/deletedTasks';
import ViewDeletedUsersButton from '../../elements/buttons/viewDeletedUsersButton';
import CategorySelect from '../../elements/categorySelect/categorySelect';
import UserSelect from '../../elements/userSelect/userSelect';
import {useNavigate } from 'react-router-dom';

function MenuAside() {
  // Estado para controlar a abertura e fechamento do menu
  const [isOpen, setIsOpen] = useState(false);
  // Estado para controlar a abertura e fechamento do modal de adição do user
  const [isAddUserModelOpen, setIsAddUserModelOpen] = useState(false);
  // Estado para controlar a abertura e fechamento do modal de adição de tarefa
  const [isAddTaskModelOpen, setIsAddTaskModelOpen] = useState(false);
  // Estado para controlar a abertura e fechamento do modal de categorias
  const [isCategoriesModelOpen, setIsCategoriesModelOpen] = useState(false);
  // Estado para controlar a visibilidade da lista de users
  const isUsersVisible = useUserStore(state => state.isUsersVisible);
  // Função para alterar a visibilidade da lista de users
  const setIsUsersVisible = useUserStore(state => state.setIsUsersVisible);
  // Estado para controlar a exibição das tarefas excluídas
  const [viewDeletedTasks, setViewDeletedTasks] = useState(false);
  // Estado para controlar a exibição dos users excluídos
  const [viewDeletedUsers, setViewDeletedUsers] = useState(false);
  // Hook para obter a localização atual da rota
  const location = useLocation();
  // Dados do user logado
  const loggedUser = useUserStore(state => state.loggedUser);
  // Estado para controlar o menu ativo
  const [activeMenu, setActiveMenu] = useState(null);
  // Hook de navegação para redirecionamento de rotas
  const navigate = useNavigate();

  // Função para alternar a visibilidade do menu
  const handleToggle = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
    setIsAddUserModelOpen(false);
  };

  // Função para abrir ou fechar o modal de adição de um user
  const handleAddUser = () => {
    setIsAddUserModelOpen(!isAddUserModelOpen);
  };

  // Função para abrir ou fechar o modal de adição de tarefa
  const handleAddTask = () => {
    setIsAddTaskModelOpen(!isAddTaskModelOpen);
  };

  // Função para fechar o modal de adição de um user
  const handleModalClose = () => {
    setIsAddUserModelOpen(false);
  };

  // Função para abrir ou fechar o modal de categorias
  const handleCategories = () => {
    setIsCategoriesModelOpen(!isCategoriesModelOpen);
  };

  // Função para alternar a visibilidade da lista de users
  const handleViewUsers = () => {
    setIsUsersVisible();
  };

  // Função para alternar a exibição das tarefas excluídas
  const handleViewDeletedTasks = () => {
    setViewDeletedTasks(!viewDeletedTasks);
  };

  // Função para alternar a exibição dos users excluídos
  const handleViewDeletedUsers = () => {
    setViewDeletedUsers(!viewDeletedUsers);
  };

  return (
    // Container principal do menu lateral, adiciona a classe 'open' quando o menu está aberto
    <div className={`aside-menu ${isOpen ? 'open' : ''}`}>
      
      {/* Botão para abrir e fechar o menu */}
      <button className="menu-button" onClick={handleToggle}>
        {/* Ícone do botão de menu */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="36px" height="36px">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 11h16v2H4zm0-4h16v2H4zm0 8h16v2H4z"/>
        </svg>
      </button>

      {/* Renderiza o conteúdo do menu apenas quando está aberto */}
      {isOpen && (
        <div>
          {/* Botão para editar o perfil do user */}
          <EditProfileButton />
      
          {/* Linha divisória */}
          <hr style={{borderTop: '1px solid white'}} />
          
          {/* Botão para visualizar tarefas */}
          <ViewTasksButton /> 

          {/* Renderiza o seletor de categoria apenas na página de tarefas do ScrumMaster ou Owner */}
          {location.pathname === '/tasks' && (loggedUser.role === 'ScrumMaster' || loggedUser.role === 'Owner') && <CategorySelect />}
          
          {/* Renderiza o seletor de user apenas na página de tarefas do ScrumMaster ou Owner */}
          {location.pathname === '/tasks' && (loggedUser.role === 'ScrumMaster' || loggedUser.role === 'Owner') && <UserSelect />}
          
          {/* Botão para visualizar tarefas excluídas */}
          {(loggedUser.role === 'ScrumMaster' || loggedUser.role === 'Owner') && <ViewDeletedTasksButton onClick={handleViewDeletedTasks}/>}

          {/* Botão para adicionar uma nova tarefa */}
          <AddTaskButton onClick={handleAddTask} />

          {/* Modal para adicionar uma nova tarefa */}
          <AddTaskModal isOpen={isAddTaskModelOpen} onRequestClose={handleAddTask} />

          {/* Botão para visualizar as próprias tarefas */}
          <MyTasksButton />

          {/* Botão para visualizar as categorias (somente para o Owner) */}
          {loggedUser.role === 'Owner' ? <CategoriesButton onClick={handleCategories} /> : null}

          {/* Modal para visualizar as categorias */}
          <CategoriesModal isOpen={isCategoriesModelOpen} onRequestClose={() => setIsCategoriesModelOpen(false)} />

          {/* Linha divisória */}
          <hr style={{borderTop: '1px solid white'}} />

          {/* Botão para visualizar os users (apenas para ScrumMaster e Owner) */}
          {(loggedUser.role === 'ScrumMaster' || loggedUser.role === 'Owner') ? <ViewUsersButton onClick={handleViewUsers} /> : null}

          {/* Botão para adicionar novo usuário (somente para o Owner) */}
          {loggedUser.role === 'Owner' ? <AddUserButton onClick={handleAddUser} /> : null}

          {/* Botão para visualizar os users excluídos (somente para o Owner) */}
          {loggedUser.role === 'Owner' ? <ViewDeletedUsersButton onClick={handleViewDeletedUsers} /> : null}

          {/* Modal para adicionar novo um novo user */}
          <ModalAddUser isOpen={isAddUserModelOpen} onRequestClose={handleModalClose} />

          {/* Renderiza a lista de users */}
          {isUsersVisible && <Users />}

          {/* Renderiza a lista de tarefas excluídas */}
          {viewDeletedTasks && <DeletedTasks />}
          
        </div>
      )}
    </div>
);
}

export default MenuAside;