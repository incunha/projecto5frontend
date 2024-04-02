import React, { useState, useEffect } from 'react';
import './username.css';
import UserModal from '../../modals/modal-user/userModal';
import { useUserStore } from '../../../userStore';

function UserName({ updateUserInfo }) {
  const { fetchUser, loggedUser } = useUserStore();
  const [firstName, setFirstName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (loggedUser) {
      const names = loggedUser.name.split(' ');
      setFirstName(names[0]);
      setUserImage(loggedUser.userPhoto);

      if (typeof updateUserInfo === 'function') {
        updateUserInfo(loggedUser.name, loggedUser.userPhoto);
      }
    }
  }, [loggedUser, updateUserInfo]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="userName">
      Welcome, <button onClick={handleOpenModal}>{firstName}</button>
      <img src={userImage} alt="User" className="userImage" />
      <UserModal isOpen={isModalOpen} onRequestClose={handleCloseModal} updateUserInfo={updateUserInfo} />
    </div>
  );
}

export default UserName;