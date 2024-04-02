import './userCard.css';
import { useUserStore } from '../../../userStore';
import React from 'react';

// O componente recebe um user e um valor booleano 'active' como props
function UserCard({ user, active }) {
  // Se não houver user, o componente não renderiza nada
  if (!user) {
    return null;
  }

  // Usa o hook useUserStore para acessar funções do estado do user
  const selectedUserInList = useUserStore(state => state.selectedUserInList);
  const openUserDetailsModal = useUserStore(state => state.openUserDetailsModal);
  
  const setActiveUser = useUserStore(state => state.setActiveUser);
  // Função para lidar com o evento de duplo clique no cartão do user
  const handleDoubleClick = async () => {
    // Define o user selecionado na lista
    await selectedUserInList(user.username);
    // Define o user ativo
    setActiveUser(active);
    // Abre o modal de detalhes do user
    openUserDetailsModal();
  };

  // Define o estilo do cartão do user com base no valor de 'active'
  const cardStyle = {
    opacity: active ? 1 : 0.5, 
  };

  // Renderiza o cartão do user
  return (
    <div className="user-card" style={cardStyle} onDoubleClick={handleDoubleClick}>
      <img src={user.userPhoto} alt={user.name} className="user-photo" />
      <span className="user-name">{user.name}</span>
    </div>
  );
}

export default UserCard;