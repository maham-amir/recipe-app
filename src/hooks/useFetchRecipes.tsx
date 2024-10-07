import { useState, useEffect } from 'react';
import { Recipe } from '@/types/types';


export const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true); 
        const cachedResponse = await caches.match('https://dummyjson.com/recipes?select=name');
        if (cachedResponse) {
          const data = await cachedResponse.json();
          setRecipes(data.recipes);
        } else {
          const response = await fetch('https://dummyjson.com/recipes?select=name');
          if (!response.ok) {
            throw new Error('Error in fetching recipes');
          }
          const data = await response.json();
          setRecipes(data.recipes);
        }
      } catch (error) {
        setError('Error in fetching recipes');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecipes();
  }, []);
  return { recipes, loading, error };
};