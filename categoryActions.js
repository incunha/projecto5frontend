export const fetchCategories = async (set, token) => {
  try {
    const response = await fetch(
      "http://localhost:8080/projecto5backend/rest/tasks/categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          token: token,
        },
      }
    );

    if (!response.ok) {
      console.error(`Error fetching categories: ${response.statusText}`);
      return;
    }

    const categories = await response.json();
    set(state => ({ ...state, categories })); // Atualiza corretamente o estado
  } catch (error) {
    console.error(error);
  }
};

  // POST /categories
  export const createCategory = async (set, category, token) => {
    const response = await fetch("http://localhost:8080/projecto5backend/rest/tasks/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify(category)
    });
  
    if (!response.ok) {
      throw new Error(`Error creating category: ${response.statusText}`);
    }
  
    // Only try to parse the response as JSON if the status code is 200
    if (response.status === 200) {
      return await response.json();
    } else {
      return response.statusText;
    }
  };

// PUT /categories
export const updateCategory = async (set, category, token) => {
  const response = await fetch("http://localhost:8080/projecto5backend/rest/tasks/categories", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
    body: JSON.stringify(category)
  });

  if (!response.ok) {
    throw new Error(`Error updating category: ${response.statusText}`);
  }

  // Parse the response as text instead of JSON
  return await response.text();
};

// DELETE /categories/{name}
export const removeCategory = async (set, name, token) => {
  const response = await fetch(`http://localhost:8080/projecto5backend/rest/tasks/categories/${name}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "token": token,
    }
  });

  if (!response.ok) {
    throw new Error(`Error updating category: ${response.statusText}`);
  }

  // Parse the response as text instead of JSON
  return await response.text();
};

