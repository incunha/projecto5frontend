import { create } from 'zustand';

export const useUserStore = create(set => ({
  // Estado inicial
  users: [],
  userRole: null,
  isUsersView: true,
  loggedUser: null,
  selectedUser: null,
  isUserDetailsModalOpen: false,
  selectedUserForDetails: null,
  isUsersVisible: false,
  userUsername: null,
  activeUser: null,

  // Funções para modificar o estado
  setIsUsersVisible: () => set(state => ({ isUsersVisible: !state.isUsersVisible })),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setUserUsername: (username) => set({ userUsername: username }),
  setUserRole: (role) => set({ userRole: role }),
  setUsersView: (isUsersView) => set({ isUsersView }),
  setUsersVisible: (isUsersVisible) => set({ isUsersVisible }),
  setActiveUser: (active) => set({ activeUser: active }),
  openUserDetailsModal: () => set(state => ({ isUserDetailsModalOpen: true, selectedUser: state.selectedUser })),
  closeUserDetailsModal: () => set({ isUserDetailsModalOpen: false, selectedUser: null }),
  setUsers: (users) => set({ users }),
  toggleUsersView: () => set(state => ({ isUsersView: !state.isUsersView })),

  //Função para ir buscar os dados de um user
  selectedUserInList: async (username) => {
    try {
      const token = sessionStorage.getItem('token'); 
      const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/users/${username}`, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'token': token,
        },
      });
      if (!response.ok) {
        console.error(`Error fetching user: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      console.log('Selected user:', data);
      set({ selectedUser: data });
    } catch (error) {
      console.error(error);
    }
  },

  setSelectedUser: async (username) => {
    try {
      const user = await selectedUserInList(username);
      set({ selectedUser: user });
      openUserDetailsModal();
    } catch (error) {
      console.error(error);
    }
  },
 
  //Função que vai buscar todos os users 
  fetchUsers: async () => {
    try {
      const token = sessionStorage.getItem('token'); 
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/users', {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'token': token,
        },
      });
      if (!response.ok) {
        console.error(`Error fetching all users:`);
        return;
      }
      const data = await response.json();
      set({ users: data });
    } catch (error) {
      console.error(error);
    }
  },
  
  //Função para ir buscar todos os users ativos
  fetchActiveUsers: async () => {
    try {
      const token = sessionStorage.getItem('token'); 
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/users/active', {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'token': token,
        },
      });
      if (!response.ok) {
        console.error(`Error fetching active users:`);
        return;
      }
      const data = await response.json();
      set({ users: data });
    } catch (error) {
      console.error(error);
    }
  },

//Função para ir buscar todos os users inativos
  fetchInactiveUsers: async () => {
    try {
      const token = sessionStorage.getItem('token'); 
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/users/inactive', {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'token': token,
        },
      });
      if (!response.ok) {
        console.error(`Error fetching inactive users:`);
        return;
      }
      const data = await response.json();
      set({ users: data });
    } catch (error) {
      console.error(error);
    }
  },

//Função para ir buscar os dados do user que está logado
  fetchUser: async () => {
    const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/users/myUserDto', {
      method: 'GET',
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    });

    if (response.status === 403) {
      alert('Unauthorized');
      sessionStorage.clear();
      window.location.href = 'index.html';
    } else if (response.status === 200) {
      const user = await response.json();
      set({ loggedUser: user }); 
    } else {
      console.error('Failed to fetch user data');
    }
  },
  
  //Função para registar um user 
  registerUser: async (name, username, email, contactNumber, userPhoto, password) => {
    try {
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          token: sessionStorage.getItem('token'),
        },
        body: JSON.stringify({
          name,
          username,
          email,
          contactNumber,
          userPhoto,
          password,
        }),
      });
      if (!response.ok) {
        console.error(`Error registering user: ${response.statusText}`);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  },

  //Função para atualizar os dados de um user
  updateUser: (updatedUser) => {
    set(state => ({
      users: state.users.map(user => user.username === updatedUser.username ? updatedUser : user)
    }));
  },
}));