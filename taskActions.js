export const createTask = async (token, payload) => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': "*/*",
          'token': token,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Error creating task: ${response.statusText}`);
      }
  
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  export const fetchAllActiveTasks = async (set, token) => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/tasks?active=true', {
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
      set({ tasks: data });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  export const fetchActiveTasks = async (set, token, username, category) => {
    try {
      let url = 'http://localhost:8080/projecto5backend/rest/tasks?active=true';
      if (username) url += `&username=${username}`;
      if (category) url += `&category=${category}`;
  
      const response = await fetch(url, {
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
      set({ tasks: data });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  export const fetchInactiveTasks = async (set, token) => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/tasks?active=false', {
        headers: {
          Accept: "*/*",
          token: token,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Fetch Inactive Tasks:', data);
      set(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  export const fetchTaskDetails = async (id, token) => {
    const response = await fetch(`http://localhost:8080/projecto5backend/rest/tasks?id=${id}`, {
      headers: {
        Accept: "*/*",
        token: token,
      },
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  };
  
  export const updateTask = async (task, token) => {
    const response = await fetch(`http://localhost:8080/projecto5backend/rest/tasks`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "*/*",
        'token': token,
      },
      body: JSON.stringify(task),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  export const deleteTask = async (id, token) => {
    const response = await fetch(`http://localhost:8080/projecto5backend/rest/tasks/active/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "*/*",
        'token': token,
      },
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  export const restoreTask = async (id, token) => {
    const response = await fetch(`http://localhost:8080/projecto5backend/rest/tasks/active/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "*/*",
        'token': token,
      },
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  export const changeTaskStatus = async (id, status, token) => {
    const response = await fetch(`http://localhost:8080/projecto5backend/rest/tasks/status/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': "*/*",
        'token': token,
      },
      body: JSON.stringify({ status: Number(status) }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const text = await response.text();
  
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  };

  export const fetchTaskStatistics = async (set, token) => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/tasks/statistics', {
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
      set({ taskStatistics: data});
    } catch (error) {
      console.error('Error:', error);
    }
  };

  export const fetchTaskCreator = async (id, token) => {
    try {
      const response = await fetch(`http://localhost:8080/projecto5backend/rest/tasks/creator/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': "*/*",
          'token': token,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  export const removeAllTasks = async (token, username) => {
    try {
      const url = `http://localhost:8080/projecto5backend/rest/tasks/${username}`;
  
      const response = await fetch(url, {
        method: 'DELETE',
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
      console.log('Tasks removed:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };