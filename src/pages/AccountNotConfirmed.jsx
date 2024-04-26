import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './AccountNotConfirmed.css';
import BackgroundLoginVideo from '../assets/background-video/background-video';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function AccountNotConfirmed() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBackToLoginClick = () => {
    navigate('/');
  };

  return (
    <div className="account-not-confirmed-container">
      <BackgroundLoginVideo />
      <h1 className="app-name">Scrum</h1>
      <div className="message-container">
        <h2>{t('Account Not Confirmed')}</h2>
        <p>{t('Please check your email to confirm your account')}</p>
        <button onClick={handleBackToLoginClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
    </div>
  );
}

export default AccountNotConfirmed;