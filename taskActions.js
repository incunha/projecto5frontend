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