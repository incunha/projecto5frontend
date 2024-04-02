import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './userModal.css'; // Importa estilos CSS locais
import { useUserStore } from '../../../userStore'; // Importa o hook do zustand

function UserModal({ isOpen, onRequestClose, updateUserInfo }) {
  // Define estados locais para controlar os dados do user e o modo de edição
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const { fetchUser } = useUserStore(); // Usa o hook do zustand para buscar dados do user
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Efeito para carregar os dados do user quando o modal é aberto
  useEffect(() => {
    const fetchUser = async () => {
      // Faz uma requisição para obter os dados do user atual
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/users/myUserDto', {
        method: 'GET',
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
      });

      if (response.ok) {
        // Se a resposta for bem-sucedida, atualiza os estados locais com os dados do user
        const data = await response.json();
        setUser(data);
        setFirstName(data.name ? data.name.split(' ')[0] : '');
        setLastName(data.name ? data.name.split(' ')[1] : '');
        setEmail(data.email);
        setUsername(data.username);
        setContactNumber(data.contactNumber);
        setUserPhoto(data.userPhoto);
      } else {
        console.error('Failed to fetch user data');
      }
    };

    // Chama a função de busca do user quando o modal é aberto
    if (isOpen) {
      fetchUser();
    }
  }, [isOpen]);

  // Função para lidar com o clique no botão de edição
  const handleEditClick = () => {
    setIsEditing(true); // Define o modo de edição como verdadeiro
  };

  // Função para fechar o modal
  const handleClose = () => {
    setIsEditing(false); // Define o modo de edição como falso
    onRequestClose(); // Chama a função para fechar o modal
  };

  // Função para atualizar os dados do user
  const handleSaveClick = async () => {
    const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/users', {
      method: 'PUT',
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: firstName + ' ' + lastName,
        email,
        username,
        contactNumber,
        userPhoto
      })
    });
    if (response.ok) {
      setIsEditing(false); // Define o modo de edição como falso
      onRequestClose(); // Fecha o modal
      updateUserInfo(firstName, userPhoto); // Atualiza os dados do user na interface
      fetchUser(); // Atualiza os dados do user no estado global
  
      // Se a senha antiga estiver definida, chame a função para atualizar a senha
      if (oldPassword) {
        handleUpdatePassword();
      }
    } else {
      console.error('Failed to update user data');
    }
  };


// Função para atualizar a senha
const handleUpdatePassword = async () => {
  if (oldPassword && newPassword === confirmNewPassword) {
    const passwordDto = {
      password: oldPassword,
      newPassword: newPassword,
    };
    const response = await fetch(
      "http://localhost:8080/Scrum_Project_4_war_exploded/rest/users/password",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
        body: JSON.stringify(passwordDto),
      }
    );
    const data = await response.text();
    console.log(data);
  } else {
    alert("Passwords do not match");
  }
};

  return (
    // Componente Modal do react para exibir o formulário de perfil do user
    <Modal isOpen={isOpen} onRequestClose={handleClose} className="modalAddUser">
      <div className="modalContent">
        <span id="closeButtonProfile" onClick={handleClose}>X</span> {/* Botão para fechar o modal */}
        <div className="inputFields">
          {/* Campos de entrada para os dados do perfil do user */}
          <label className="labelProfile">First Name</label>
          <input type="text" className="inputFieldProfile" placeholder={firstName} disabled={!isEditing} onChange={e => setFirstName(e.target.value)} />
          <label className="labelProfile">Last Name</label>
          <input type="text" className="inputFieldProfile" placeholder={lastName} disabled={!isEditing} onChange={e => setLastName(e.target.value)} />
          <label className="labelProfile">Email</label>
          <input type="email" className="inputFieldProfile" placeholder={email} disabled={!isEditing} onChange={e => setEmail(e.target.value)} />
          <label className="labelProfile">Username</label>
          <input type="text" className="inputFieldProfile" placeholder={username} disabled={!isEditing} onChange={e => setUsername(e.target.value)} />
          <label className="labelProfile">Contact Number</label>
          <input type="text" className="inputFieldProfile" placeholder={contactNumber} disabled={!isEditing} onChange={e => setContactNumber(e.target.value)} />
          <label className="labelProfile">User Photo URL</label>
          <input type="url" className="inputFieldProfile" placeholder={userPhoto} disabled={!isEditing} onChange={e => setUserPhoto(e.target.value)} />
          <label className="labelProfile">Old Password</label>
          <input type="password" className="inputFieldProfile" placeholder="Old Password" disabled={!isEditing} onChange={e => setOldPassword(e.target.value)} />
          <label className="labelProfile">New Password</label>
          <input type="password" className="inputFieldProfile" placeholder="New Password" disabled={!isEditing} onChange={e => setNewPassword(e.target.value)} />
          <label className="labelProfile">Confirm New Password</label>
          <input type="password" className="inputFieldProfile" placeholder="Confirm New Password" disabled={!isEditing} onChange={e => setConfirmNewPassword(e.target.value)} />
        </div>
        <div className="userImageContainer">
          {/* Exibe a imagem do user */}
          <img id="userImage" className="userImageProfile" src={userPhoto || user.userPhoto} alt="User" />
        </div>
      </div>
      <div className="buttonContainer">
        {/* Botões para editar e salvar o perfil do user */}
        <button id="editButton" className="myButton" onClick={handleEditClick}>Edit</button>
        {isEditing && <button id="saveButton" className="myButton" onClick={handleSaveClick}>Save</button>}
      </div>
    </Modal>
  );
}

export default UserModal;