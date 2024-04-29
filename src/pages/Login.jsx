import React from 'react';
import ModalLogin from '../modals/modal-login/modal-login';
import BackgroundLoginVideo from '../assets/background-video/background-video';
import Footer from '../components/footer/footer';'../components/footer/footer';

function Login() {
  return (
    <div>
      <BackgroundLoginVideo /> 
      <ModalLogin />
      <Footer />
    </div>
  );
}

export default Login;