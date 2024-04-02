import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './header.css'; 
import LogoutButton from '../../elements/buttons/button-logout/logoutButton';
import UserName from '../../elements/username/username';

function Header({ userName, userPhoto, updateUserInfo }) {
    // State para armazenar a data e hora atual
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    // Efeito para atualizar a data e hora a cada segundo
    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentDateTime(new Date());
        }, 1000);
    
        // Limpa o intervalo quando o componente é desmontado
        return () => {
          clearInterval(timer);
        };
      }, []);

    return (
        <header className="header">
          {/* Componente UserName para exibir o nome do user e a sua foto */}
          <UserName userName={userName} userPhoto={userPhoto} updateUserInfo={updateUserInfo} />
          {/* Exibe a data e hora atual */}
          <div className="dateHeader">{currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</div>
          {/* Botão de logout */}
          <LogoutButton />
        </header>
    );
}

// Definição das propriedades esperadas pelo componente Header
Header.propTypes = {
    userName: PropTypes.string.isRequired, // Nome do user (string)
    userPhoto: PropTypes.string.isRequired, // URL da foto do user (string)
    updateUserInfo: PropTypes.func.isRequired // Função para atualizar informações do user (função)
};

export default Header;