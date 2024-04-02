import './modal-addUser.css';
import React, { useState } from 'react';
import Modal from 'react-modal'; 
import { useUserStore } from '../../../userStore';

function ModalAddUser({ isOpen, onRequestClose }) { 
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [userPhoto, setUserPhoto] = useState('./multimedia/profile.png.png');
    const [password, setPassword] = useState('');
    const [imageUrlInput, setImageUrlInput] = useState('');
    const registerUser = useUserStore(state => state.registerUser);

    const handleImageUrlChange = (event) => {
        const imageUrl = event.target.value;
        setImageUrlInput(imageUrl);
        document.getElementById('userImage').src = imageUrl;
        setUserPhoto(imageUrl);
    };

    const handleCancelClick = () => {
        onRequestClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = `${firstName} ${lastName}`;
        await registerUser(name, username, email, contactNumber, userPhoto, password);
        useUserStore.getState().fetchActiveUsers();
        onRequestClose();
      };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="user-modal"
            overlayClassName="user-modal-overlay"
        >
             <div className="modalAddUser-overlay" />
             <div className="modalAddUser">
                <h2>Add User</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="registerFirstName" className="inputFieldAddUser" placeholder="First Name" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <input type="text" id="registerLastName" className="inputFieldAddUser" placeholder="Last Name" required value={lastName} onChange={e => setLastName(e.target.value)} />
                    <input type="email" id="registerEmail" className="inputFieldAddUser" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="text" id="registerUsername" className="inputFieldAddUser" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="text" id="registerContact" className="inputFieldAddUser" placeholder="Contact" required value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
                    <input type="url" id="userPhotoUrl" className="inputFieldAddUser" placeholder="Image URL" required value={imageUrlInput} onChange={e => handleImageUrlChange(e)} />
                    <input type="password" id="registerPassword" className="inputFieldAddUser" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                    <img id="userImage" className="userImageAddUser" src={userPhoto} />
                    <button id="registerButton" className="myButton" type="submit">Register</button>
                </form>
                <button id="cancelButton" className="myButton" onClick={handleCancelClick}>Cancel</button>
            </div>
        </Modal>
    );
}

export default ModalAddUser;
