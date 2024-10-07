import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeDropdown from './components/RecipeDropdown';
import RecipeDetails from './components/RecipeDetails';


function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedRecipeId(id);
  };

  return (
    <div>
      <header className="App-header" style={{marginTop:"3rem"}}>
        <h3>
          Recipe App
        </h3>
      </header>

      <div style={{margin:"2rem"}}>
        <div className='centerAlign'>
          <RecipeDropdown onSelect={handleSelect} />
        </div>
        {!!selectedRecipeId && <RecipeDetails recipeId={selectedRecipeId} />}
      </div>
    </div>
  );
}

export default App;
