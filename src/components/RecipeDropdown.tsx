import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useFetchRecipes } from '../hooks/useFetchRecipes';
import { RecipeDropdownProps } from '@/types/types';

const RecipeDropdown: React.FC<RecipeDropdownProps> = ({ onSelect }) => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const { recipes, loading, error } = useFetchRecipes();

  return (
    <div>
        {loading && <p>Loading recipes...</p>}

        {error &&  (<Alert key="danger" variant="danger" dismissible>{error}</Alert>)} 

        {!loading && !error && (
          <select 
            id="recipe-select" 
            value={selectedId} 
            onChange={(e) => {setSelectedId(Number(e.target.value));
              if(!!e.target.value)
              { 
                onSelect((Number(e.target.value)));
              }
            }}
            style={{textAlign: "center"}}
            >
                <option>Please select a recipe...</option>

                {recipes.map((recipe) => (
                    <option key={recipe.id} value={recipe.id}>
                        {recipe.name}
                    </option>
                ))}
          </select>
        )}
    </div>
  );
};

export default RecipeDropdown;