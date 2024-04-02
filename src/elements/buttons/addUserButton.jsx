import React from 'react';


// Componente funcional AddUserButton responsável por renderizar o botão "Add User"
// Recebe uma função de clique como propriedade para manipular o evento de clique no botão

const AddUserButton = ({ onClick }) => {
    return (
        <button className="aside-button" onClick={onClick}>
            Add User
        </button>
    );
};

export default AddUserButton;