import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BackgroundLoginVideo from '../assets/background-video/background-video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './AccountInactive.css';

function AccountInactive() {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleBackToLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="account-inactive-container">
      <BackgroundLoginVideo />
      <h1 className="app-name">Scrum</h1>
      <div className="message-container">
        <h2>{t('Account Inactive')}</h2>
        <p>{t('Your account is currently inactive. Please contact an Administrator')}</p>
        <button onClick={handleBackToLoginClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
    </div>
  );
}

export default AccountInactive;