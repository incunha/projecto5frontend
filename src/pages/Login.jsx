import React from 'react';
import ModalLogin from '../modals/modal-login/modal-login';
import BackgroundLoginVideo from '../assets/background-video/background-video';

function Login() {
  return (
    <div>
      <BackgroundLoginVideo /> 
      <ModalLogin />
    </div>
  );
}

export default Login;