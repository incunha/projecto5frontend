import './modal-login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../userStore';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';


function ModalLogin() {
  const setToken = useUserStore(state => state.setToken);
  const navigate = useNavigate();
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { fetchUser } = useUserStore();
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');


  // Função para abrir o modal de recuperação de senha
  const handleForgotPasswordClick = () => {
    setShowModal(true);
  };

  // Função para recuperar a senha
  const handleRecoverPassword = async () => {
    try {
      const response = await fetch(`http://localhost:8080/projecto5backend/rest/users/forgotPassword/${email}`, {
        method: 'PUT',
        headers: {
          'Accept': '*/*',
        },
      });
      setShowModal(false);
    } catch (error) {
      console.error('Failed to recover password');
    }
  };

 // Função para mudar o idioma
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  // Função para fazer login
  const handleLoginClick = async () => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/users/login', {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'username': loginUsername,
            'password': loginPassword,
        },
      });
  
      const responseMessage = await response.text();
  
      if (response.status === 403) {
        if (responseMessage === 'User is not confirmed') {
          navigate('/account-not-confirmed');
        } else if (responseMessage === 'User is not active') {
          navigate('/account-inactive');
        }
      } else if (response.status === 200) {
        const token = responseMessage;
        console.log(token);
        setToken(token); 
        await fetchUser(token);
        navigate('/home');
      }
    } catch (error) {
      setErrorMessage('Failed to login');
      console.error(error);
    }
  };


  return (
    <div className="center-container">
      <div className="loginpanel">
        <img src="multimedia/logo_scrum_01.png" alt="Logo" height="150" />
        <div className="language-buttons">
          <button onClick={() => changeLanguage('en')}>EN</button>
          <button onClick={() => changeLanguage('pt')}>PT</button>
        </div>
        <div className="input-container">
          <input type="text" id="login" placeholder={t('username')} required value={loginUsername} onChange={e => setLoginUsername(e.target.value)} />
          <input type="password" id="password" placeholder={t('password')} required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
        </div>
        <button id="loginButton" className="myButton" onClick={handleLoginClick}>{t('login')}</button>
        <p id="errorMessage">{t(errorMessage)}</p>
        <p className="forgot-password" onClick={handleForgotPasswordClick}>{t('Forgot Password?')}</p> 

        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
        <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type="email" placeholder="Insira seu e-mail" value={email} onChange={e => setEmail(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
        Close
        </Button>
        <Button variant="primary" onClick={handleRecoverPassword}>
        Recover Password
        </Button>
        </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default ModalLogin;