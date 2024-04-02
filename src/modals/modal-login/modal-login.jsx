import './modal-login.css'; // Importação do ficheiro CSS para estilos específicos do modal de login
import React, { useState, useEffect } from 'react'; // Importação do React e de hooks como useState e useEffect
import useAuthStore from '../../../authStore'; // Importação do hook personalizado useAuthStore para gerir o estado de autenticação

function ModalLogin(props) { // Declaração do componente ModalLogin e passagem das props necessárias
    const setToken = useAuthStore(state => state.setToken); // Utilização do hook useAuthStore para obter a função setToken
    const [isRegistering, setIsRegistering] = useState(false); // Estado para controlar se o user está a registar-se
    const [firstName, setFirstName] = useState(''); // Estado para armazenar o primeiro nome do user
    const [lastName, setLastName] = useState(''); // Estado para armazenar o último nome do user
    const [email, setEmail] = useState(''); // Estado para armazenar o email do user
    const [username, setUsername] = useState(''); // Estado para armazenar o nome de user
    const [contactNumber, setContactNumber] = useState(''); // Estado para armazenar o número de contacto do user
    const [userPhoto, setUserPhoto] = useState('./multimedia/profile.png.png'); // Estado para armazenar a foto do user
    const [password, setPassword] = useState(''); // Estado para armazenar a palavra-passe do user
    const [loginUsername, setLoginUsername] = useState(''); // Estado para armazenar o nome de user no processo de login
    const [loginPassword, setLoginPassword] = useState(''); // Estado para armazenar a palavra-passe no processo de login
    const [imageUrlInput, setImageUrlInput] = useState(''); // Estado para armazenar o URL da imagem de perfil do user
    const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar a mensagem de erro

    useEffect(() => {
        const token = sessionStorage.getItem('token'); // Obtenção do token armazenado na sessionStorage
        if (token) {
            setToken(token); // Definição do token no estado global de autenticação
            props.onLogin(); // Chamada da função onLogin passada por props
        }
    }, [setToken, props]); // Dependências do useEffect

    const handleRegisterClick = () => {
        setIsRegistering(true); // Ativação do estado de registo
    };

    const handleCancelClick = () => {
        setIsRegistering(false); // Desativação do estado de registo
    };

    const handleImageUrlChange = (event) => {
        const imageUrl = event.target.value;
        setImageUrlInput(imageUrl); // Atualização do estado do URL da imagem de perfil
        setUserPhoto(imageUrl); // Definição da foto do user
    };

    const handleRegister = async (event) => {
        event.preventDefault(); // Prevenção do comportamento padrão do formulário

        const user = {
            name: firstName + " " + lastName, // Construção do nome completo do user
            email: email,
            username: username,
            contactNumber: contactNumber,
            userPhoto: userPhoto,
            password: password,
        };

        const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/users', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user), // Conversão do objeto user para formato JSON
        });

        if (response.ok) {
            setIsRegistering(false); // Desativação do estado de registo após o sucesso
        } else {
            console.error('Failed to register user'); // Mensagem de erro em caso de falha no registo
        }
    };
    
    const handleLoginClick = async () => {
        const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/users/login', {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'username': loginUsername,
                'password': loginPassword,
            },
        });
    
        if (response.ok) {
            const token = await response.text(); // Obtenção do token de resposta
            setToken(token); // Definição do token no estado global de autenticação
            sessionStorage.setItem('token', token); // Armazenamento do token na sessionStorage
            props.onLogin(); // Chamada da função onLogin passada por props
        } if (!loginUsername || !loginPassword) {
            setErrorMessage('Please fill all fields');
            return;
        }else {
            if (response.status === 403) {
                setErrorMessage('User is not active, please contact the administrator');
        } else {
            setErrorMessage('Error logging in'); // Mensagem de erro em caso de falha no login
        }
    }
    };
    
    return (
        <div className="center-container">
            <div className="loginpanel">
                {!isRegistering ? (
                    <>
                        <img src="multimedia/logo_scrum_01.png" alt="Logo" height="150" />
                        <div className="input-container">
                            <input type="text" id="login" placeholder="username" required value={loginUsername} onChange={e => setLoginUsername(e.target.value)} />
                            <input type="password" id="password" placeholder="password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                        </div>
                        <button id="loginButton" className="myButton" onClick={handleLoginClick}>Login</button>
                        <p id="errorMessage">{errorMessage}</p>
                        <p>Don't have an account? <button id="registerLink" className="registerLink" onClick={handleRegisterClick}>Register now!</button></p>
                    </>
                ) : (
                <form onSubmit={handleRegister}>
                    <h2>Register</h2>
                    <input className ="inputLogin" type="text" id="registerFirstName"  placeholder="First Name" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <input className ="inputLogin" type="text" id="registerLastName"  placeholder="Last Name" required value={lastName} onChange={e => setLastName(e.target.value)} />
                    <input className ="inputLogin" type="email" id="registerEmail"  placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
                    <input className ="inputLogin" type="text" id="registerUsername"  placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
                    <input className ="inputLogin" type="text" id="registerContact"  placeholder="Contact" required value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
                    <input className ="inputLogin" type="url" id="userPhotoUrl"  placeholder="Image URL" required value={imageUrlInput} onChange={e => handleImageUrlChange(e)} />
                    <input className ="inputLogin" type="password" id="registerPassword"  placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} />
                    <img className="userImageLogin" src={userPhoto} alt="User" />
                    <div className="buttonContainerLogin">
                    <button className="myButton" onClick={handleCancelClick}>Cancel</button>
                    <button className="myButton">Register</button>
                    </div>
                </form>
                )}
            </div>
        </div>
    );
}

export default ModalLogin;

