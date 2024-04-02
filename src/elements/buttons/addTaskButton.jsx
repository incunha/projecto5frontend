import React from 'react';

// Componente funcional AddTaskButton responsável por renderizar o botão "Add Task"
// Este componente recebe uma função de clique como propriedade para manipular o evento de clique no botão

const AddTaskButton = ({ onClick }) => {
    return (
        <button className="aside-button" onClick={onClick}>
            Add Task
        </button>
    );
};

export default AddTaskButton;