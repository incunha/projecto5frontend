import React, { useState } from 'react';
import { FaPencilAlt, FaTrash, FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import useCategoryStore from '../../categoryStore';
import Header from '../components/header/header';
import Sidebar from '../components/sideBar/sideBar';
import './Categories.css'; // Importe o CSS
import useUserStore from '../../userStore';
import { useTranslation } from 'react-i18next';

Modal.setAppElement('#root'); 

function Categories() {
  const { categories, removeCategory, createCategory, updateCategory } = useCategoryStore();
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const token = useUserStore((state) => state.token);
  const { t } = useTranslation();

  // Funções para abrir e fechar os modais de edição, remoção e adição de categorias

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setEditModalIsOpen(true);
  };


  const handleDelete = (category) => {
    setCurrentCategory(category);
    setDeleteModalIsOpen(true);
  };

  const handleAdd = async () => {
    if (newCategoryName) {
      await createCategory({ name: newCategoryName }, token);
      setNewCategoryName('');
      setCreateModalIsOpen(false);
    }
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setCurrentCategory(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
    setCurrentCategory(null);
  };

  const confirmEdit = async (event) => {
    const newName = event.target.value;
    if (newName) {
      await updateCategory({ id: currentCategory.id, name: newName }, token);
    }
    closeEditModal();
  };

  const confirmDelete = async () => {
    await removeCategory(currentCategory.name, token);
    closeDeleteModal();
  };

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      maxWidth: '400px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f5f5f5',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <div className="app-container">
      <Header /> 
      <div className="content-container">
        <Sidebar /> 
        <div className="categories-container"> 
          <table>
            <thead>
              <tr>
              <th>{t('Categories')}</th> 
                <th>{t('Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>
                    <button className="action-button" onClick={() => handleEdit(category)}><FaPencilAlt /></button>
                    <button className="action-button" onClick={() => handleDelete(category)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-button" onClick={openCreateModal}><FaPlus /> {t('Add Category')}</button>
        </div>
      </div>
     <Modal isOpen={editModalIsOpen} onRequestClose={closeEditModal} style={customStyles}>
     {currentCategory && (
      <>
      <h2>{t('Edit Category')}</h2>
      <input className="modal-input" type="text" defaultValue={currentCategory.name} onBlur={confirmEdit} />
      <button className="modal-button" onClick={confirmEdit}>Confirm Edit</button>
      </>
      )}
     </Modal>
     <Modal isOpen={deleteModalIsOpen} onRequestClose={closeDeleteModal} style={customStyles}>
      {currentCategory && (
       <>
      <h2>{t('Delete Category')}</h2>
      <p>{t('Are you sure you want to delete')} {currentCategory.name}?</p>
      <button className="modal-button" onClick={confirmDelete}>Confirm Delete</button>
      </>
       )}
     </Modal>
     <Modal isOpen={createModalIsOpen} onRequestClose={() => setCreateModalIsOpen(false)} style={customStyles}>
     <h2>{t('Add Category')}</h2>
     <input className="modal-input" type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="New Category Name" />
     <button className="modal-button" onClick={handleAdd}>{t('Add Category')}</button>
     </Modal>
    </div>
  );
}

export default Categories;