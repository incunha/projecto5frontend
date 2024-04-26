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

  const handleForgotPasswordClick = () => {
    setShowModal(true);
  };

  const handleRecoverPassword = async () => {
    try {
      const response = await fetch(`http://localhost:8080/projecto5backend/rest/users/forgotPassword/${email}`, {
        method: 'PATCH',
        headers: {
          'Accept': '*/*',
        },
      });
      setShowModal(false);
    } catch (error) {
      console.error('Failed to recover password');
    }
  };


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

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
  
      if (response.status === 403) {
        navigate('/account-not-confirmed');
      } else if (response.status === 200) {
        const token = await response.text();
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
        <p className="forgot-password" onClick={handleForgotPasswordClick}>Forgot Password?</p> {/* Adicione este link abaixo do botão de login */}

<Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
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