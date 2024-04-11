import { useState, useEffect } from 'react';
import useUserStore from './userStore';
import { fetchCategories } from './categoryActions';

export default function useCategoryStore() {
  const [categories, setCategories] = useState([]);
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    fetchCategories(setCategories, token);
  }, [token]);

  return categories;
}