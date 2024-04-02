import './App.css'
import './assets/background-video/background-video.jsx';
import BackgroundLoginVideo from './assets/background-video/background-video.jsx';
import ModalLogin from './modals/modal-login/modal-login.jsx';
import React, { useState, useEffect } from 'react';
import Footer from './components/footer/footer.jsx';
import MenuAside from './components/menuAside/menuAside.jsx';
import Header from './components/header/header.jsx';
import Modal from 'react-modal';
import UserDetailsModal from './modals/modal-userDetails/modalUserDetails';
import { useUserStore } from '../userStore.js';
import { Routes, Route } from 'react-router-dom';
import Tasks from './elements/tasks';
import Users from './elements/users';
import DeletedTasks from './elements/deletedTasks';
import DeletedUsers from './elements/deletedUsers';
import useTasksStore from '../taskStore.js';
import { useNavigate } from 'react-router-dom';
import UserTasks from './elements/userTasks.jsx';

// Define o elemento do aplicativo para o modal
Modal.setAppElement('#root');

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar se o user está logado
  const [userName, setUserName] = useState(''); // Estado para armazenar o nome do user
  const [userPhoto, setUserPhoto] = useState(''); // Estado para armazenar a foto do user
  const { fetchActiveUsers, fetchInactiveUsers, users } = useUserStore(); // Funções e estado relacionados aos users
 // const [setIsModalOpen] = useState(false); // Estado para controlar se o modal está aberto
 // const [setSelectedUser] = useState(null); // Estado para armazenar o user selecionado
 const { isUserDetailsModalOpen, selectedUserForDetails, closeUserDetailsModal } = useUserStore(); // Funções e estado relacionados aos detalhes do user
  const [setIsUsersRouteVisible] = useState(false); // Estado para controlar a visibilidade da rota de users
  const { fetchActiveTasks, activeTasks } = useTasksStore(); // Funções e estado relacionados às tarefas
  const navigate = useNavigate(); // Função de navegação entre rotas
  

  useEffect(() => {
    // Carrega os users ativos e inativos e as tarefas ativas quando o componente é montado
    fetchActiveUsers();
    fetchInactiveUsers();
    fetchActiveTasks()
  }, []);
  

  // Verifica se o user está logado; se não estiver, redireciona para a página de login
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

 // Função para lidar com o login do user
 const handleLogin = () => {
  setIsLoggedIn(true); // Define o estado de login como verdadeiro
  navigate('/tasks'); // Navega para a página de tarefas
};

// Função para atualizar as o nome e foto do user logado que aparece na página 
  const updateUserInfo = (name, photo) => {
    setUserName(name);
    setUserPhoto(photo);
  };

  // Renderização condicional: se o user não estiver logado, renderiza o vídeo de fundo e o modal de login; caso contrário, renderiza o header, aside menu, rotas e footer
  return (
    <div className='App'>
      {!isLoggedIn ? (
        <div>
          <BackgroundLoginVideo />
          <ModalLogin onLogin= {handleLogin} />
        </div>
      ) : (
        <>
          <header>
            <Header userName={userName} userPhoto={userPhoto} updateUserInfo={updateUserInfo} />
          </header>
          <aside>
          <MenuAside onToggleUsersRoute={() => setIsUsersRouteVisible(prev => !prev)} />
          </aside>
          <Routes>
          <Route path="/login" element={<ModalLogin onLogin={handleLogin} />} />
          <Route path="/tasks" element={<Tasks tasks={activeTasks} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/deletedUsers" element={<DeletedUsers />} />
          <Route path="/deletedTasks" element={ <DeletedTasks />} />
          <Route path="/userTasks" element={<UserTasks />} />
          <Route path="/" element={<Tasks tasks={activeTasks} />} />
          </Routes>
          <Footer />
        </>
      )}
      {/* Renderiza o modal de detalhes do user se o estado isUserDetailsModalOpen for verdadeiro */}
      <UserDetailsModal isOpen={isUserDetailsModalOpen} user={selectedUserForDetails} onClose={closeUserDetailsModal} />
    </div>
  );
}

export default App;