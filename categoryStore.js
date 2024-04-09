import { useState, useEffect } from 'react';
import useUserStore from './userStore';

export default function useCategoryStore() {
  const [categories, setCategories] = useState([]);
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    const fetchCategories = async () => {
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
        setCategories(categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [token]);

  return categories;
}