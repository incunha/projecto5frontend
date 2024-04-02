import React from 'react';
import './confirmationModal.css';

function ConfirmationModal({ isOpen, onRequestClose, message, onConfirm }) {
  // Verifica se o modal está aberto
  if (!isOpen) {
    return null; // Se não estiver aberto, não renderiza nada
  }

  return (
    // Overlay do modal de confirmação
    <div className="warning-modal-overlay">
      {/* Conteúdo do modal de confirmação */}
      <div className="warning-modal">
        <h2>Warning</h2> {/* Título do modal */}
        <p>{message}</p> {/* Mensagem de confirmação */}
        {/* Botões de ação */}
        <div className="button-groupConfirmation">
          <button className='myButton' onClick={onRequestClose}>Close</button> {/* Botão para fechar o modal */}
          <button className= 'myButton' onClick={onConfirm}>Confirm</button> {/* Botão para confirmar a ação */}
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;