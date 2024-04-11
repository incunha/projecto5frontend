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

  export const fetchActiveTasks = async (set, token) => {
    try {
      const response = await fetch('http://localhost:8080/projecto5backend/rest/tasks?active=true', {
        headers: {
          Accept: "*/*",
          token: token,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      set(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };