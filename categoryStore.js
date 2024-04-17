import { useState, useEffect } from 'react';
import useUserStore from './userStore';
import { fetchCategories } from './categoryActions';

export default function useCategoryStore(token) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories(setCategories, token);
  }, [token]);

  return categories;
}