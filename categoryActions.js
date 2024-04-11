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
      set(categories);
    } catch (error) {
      console.error(error);
    }
  };