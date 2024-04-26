import useUserStore from "./userStore";

export const setToken = (set, token) => {
  set({ token });
};
export const setUser = (set, user) => set({ user });

export const fetchUser = async (set, token) => {
    try {
        const response = await fetch('http://localhost:8080/projecto5backend/rest/users/myUserDto', {
          method: 'GET',
          headers: {
            Accept: "*/*",
            token: token,
          },
        });
        if (response.ok) {
          const user = await response.json();
          set({ user });
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };
  
  export const fetchActiveUsers = async (set, token) => {
    try {
        const response = await fetch('http://localhost:8080/projecto5backend/rest/users?active=true', {
          method: 'GET',
          headers: {
            Accept: "*/*",
            token: token,
          },
        });
        if (response.ok) {
          const activeUsers = await response.json();
          set({ activeUsers });
        } else {
          console.error('Failed to fetch active users');
        }
      } catch (error) {
        console.error('Failed to fetch active users', error);
      }
    };

    export const fetchInactiveUsers = async (set, token) => {
      try {
          const response = await fetch('http://localhost:8080/projecto5backend/rest/users?active=false', {
            method: 'GET',
            headers: {
              Accept: "*/*",
              token: token,
            },
          });
          if (response.ok) {
            const inactiveUsers = await response.json();
            set({ inactiveUsers });
          } else {
            console.error('Failed to fetch inactive users');
          }
        } catch (error) {
          console.error('Failed to fetch inactive users', error);
        }
      };
  
      export const fetchTaskTotals = async (token, username) => {
        try {
          const response = await fetch(`http://localhost:8080/projecto5backend/rest/users/totalTasks?username=${username}`, {
            method: 'GET',
            headers: {
              Accept: "*/*",
              token: token,
            },
          });
          if (response.ok) {
            const taskTotals = await response.json();
            useUserStore.setState({ taskTotals });
          } else {
            console.error('Failed to fetch task totals');
          }
        } catch (error) {
          console.error('Failed to fetch task totals', error);
        }
      };
  
  export const logout = async (set, token) => {
    try {
        const response = await fetch('http://localhost:8080/projecto5backend/rest/users/logout', {
          method: 'GET',
          headers: {
            Accept: "*/*",
            token: token,
          },
        });
        if (response.ok) {
          set({ user: null, token: null });
        } else {
          console.error('Failed to logout');
        }
      } catch (error) {
        console.error('Failed to logout', error);
      }
    };
  
  export const fetchOtherUser = async (token, username) => {
    try {
        const response = await fetch(`http://localhost:8080/projecto5backend/rest/users/${username}`, {
          method: 'GET',
          headers: {
            Accept: "*/*",
            token: token,
          },
        });
        if (response.ok) {
          const user = await response.json();
          return user;
        } else {
          console.error('Failed to fetch other user data');
        }
      } catch (error) {
        console.error('Failed to fetch other user data', error);
      }
  };

  export const fetchNotifications = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/users/notifications', {
        method: 'GET',
        headers: {
          Accept: "*/*",
          token: token,
        },
      });
      if (response.ok) {
        const notifications = await response.json();
        return notifications;
      } else {
        console.error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    }
  };

  export const markAllNotificationsAsRead = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/users/notifications/read', {
        method: 'PUT',
        headers: {
          Accept: "*/*",
          token: token,
        },
      });
      if (response.ok) {
        
      } else {
        console.error('Failed to mark all notifications as read');
      }
    } catch (error) {
      console.error('Failed to mark all notifications as read', error);
    }
  };

  export const fetchUnreadNotificationsCount = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/users/notifications/unread', {
        method: 'GET',
        headers: {
          Accept: "*/*",
          token: token,
        },
      });
      if (response.ok) {
        const count = await response.text();
        return count;
      } else {
        console.error('Failed to fetch unread notifications count');
      }
    } catch (error) {
      console.error('Failed to fetch unread notifications count', error);
    }
  };

  export const updateUser = async (token, user) => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        useUserStore.setState({ user: updatedUser });
        return updatedUser; // Retorne o usuário atualizado
      } else {
        console.error('Failed to update user data');
        throw new Error('Failed to update user data'); // Lançar um erro se a atualização falhar
      }
    } catch (error) {
      console.error('Failed to update user data', error);
      throw error; // Lançar o erro capturado
    }
  };

  export const deleteUser = async (token, username) => {
    try {
      const response = await fetch(`http://localhost:8080/projecto5backend/rest/users/${username}`, {
        method: 'DELETE',
        headers: {
          'Accept': '*/*',
          'token': token,
        },
      });
  
      if (response.ok) {
        console.log('User deleted successfully');
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  export const restoreUser = async (token, username) => {
    try {
      const response = await fetch(`http://localhost:8080/projecto5backend/rest/users/active/${username}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': token,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to restore user: ${response.statusText}`);
      }
  
      console.log('User restored successfully');
    } catch (error) {
      console.error('Failed to restore user', error);
      throw error;
    }
  };

  export const fetchUserStatistics = async (set, token) => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/users/statistics', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: "*/*",
          token: token,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      set({ userStatistics: data});
    } catch (error) {
      console.error('Error:', error);
    }
  };

  export const updatePassword = async (token, password) => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/users/password', {
        method: 'PATCH',
        headers: {
          Accept: "*/*",
          'Content-Type': 'application/json', 
          token: token,
        },
        body: JSON.stringify(password),
      });
      if (response.ok) {
        console.log('Password updated successfully');
      } else {
        console.error('Failed to update password');
      }
    } catch (error) {
      console.error('Failed to update password', error);
    }
  };
  
  export const setTimeOut = async (token, timeOut) => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/users/setTimeOut', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(timeOut),
      });
      if (response.ok) {
        console.log('Time out set successfully');
      } else {
        console.error('Failed to set time out');
      }
    } catch (error) {
      console.error('Failed to set time out', error);
    }
  };

  
