import { useState, useEffect } from 'react';
import { RecipeDetails } from '@/types/types';

export const useFetchRecipeDetails = (recipeId: number) => {
  const [recipeDetails, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async (recipeId: number) => {
      if (!recipeId) return; 
  
      try {
        setLoading(true);
        const cachedResponse = await caches.match(`https://dummyjson.com/recipes/${recipeId}`);
        if (cachedResponse) {
          const data = await cachedResponse.json();
          setRecipe(data);
        } else {
          const response = await fetch(`https://dummyjson.com/recipes/${recipeId}`);
          const data = await response.json();
          setRecipe(data);
        }
      } catch (error) {
        setError('Error in fetching recipe');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails(recipeId);
  }, [recipeId]);

  return { recipeDetails, loading, error };
};