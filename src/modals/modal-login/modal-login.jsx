import './modal-login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../userStore';
import { useTranslation } from 'react-i18next';

function ModalLogin() {
  const setToken = useUserStore(state => state.setToken);
  const navigate = useNavigate();
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { fetchUser } = useUserStore();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
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
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      const token = await response.text();
      setToken(token); 
      await fetchUser(token);
      navigate('/home');
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
      </div>
    </div>
  );
}

export default ModalLogin;