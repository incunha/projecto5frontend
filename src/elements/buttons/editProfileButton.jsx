import React, { useState } from 'react';
import { useUserStore } from '../../../userStore';
import UserModal from '../../modals/modal-user/userModal';

// EditProfileButton component
// Botão que abre o modal de edição de perfil

function EditProfileButton({ updateUserInfo }) {
  // Usa o hook useUserStore para acessar a função fetchUser
  const { fetchUser } = useUserStore();
  // Define um estado para controlar a abertura e fechamento do modal de edição de perfil
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o modal de edição de perfil
  const handleOpenModal = () => {
    // Chama a função fetchUser para buscar as informações do user
    fetchUser();
    // Define o estado para abrir o modal
    setIsModalOpen(true);
  };

  // Função para fechar o modal de edição de perfil
  const handleCloseModal = () => {
    // Define o estado para fechar o modal
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Botão para abrir o modal de edição de perfil */}
      <button className="aside-button" onClick={handleOpenModal}>Edit Profile</button>
      {/* Componente UserModal que será exibido quando isModalOpen for true */}
      <UserModal isOpen={isModalOpen} onRequestClose={handleCloseModal} updateUserInfo={updateUserInfo} />
    </div>
  );
}

export default EditProfileButton;