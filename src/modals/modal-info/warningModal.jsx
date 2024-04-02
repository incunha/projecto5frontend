import React from 'react';
import './warningModal.css';

// Componente funcional que renderiza um modal de aviso.
// Recebe duas props:
// - message: a mensagem a ser exibida no modal de aviso.
// - onClose: função a ser chamada quando o botão "Close" é clicado para fechar o modal.
function WarningModal({ message, onClose }) { 
  return (
    // Overlay do modal de aviso
    <div className="warning-modal-overlay">
      {/* Conteúdo do modal de aviso */}
      <div className="warning-modal">
        {/* Título do modal */}
        <h2>Warning</h2>
        {/* Mensagem do aviso */}
        <p>{message}</p>
        {/* Botão para fechar o modal */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// Exporta o componente WarningModal para uso em outros componentes.
export default WarningModal;