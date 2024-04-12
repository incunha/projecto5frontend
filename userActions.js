import useUserStore from "./userStore";

export const setToken = (set, token) => set({ token });
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
            console: console.log('token', token),
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
          console.log('fetchTaskTotals', token, username);
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
    console.log(`Token: ${token}`);
    console.log(`Username: ${username}`);
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

