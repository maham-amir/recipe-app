import React from 'react';
import { RecipeDetailsProps } from '@/types/types';
import {useFetchRecipeDetails } from '../hooks/useFetchRecipeDetails';
import { Col, Row } from 'react-bootstrap';



const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipeId }) => {

const {recipeDetails,  error} = useFetchRecipeDetails(recipeId);


  if (error) return <p>{error}</p>;

  if(!recipeDetails) return <div></div>;

  return (
    <div style={{marginTop: "3rem"}}>
        <Row style={{textAlign: "center"}}>
        <h2>{recipeDetails?.name}</h2>
        </Row>
        <Row style={{marginTop: "2rem"}}>
            <Col style={{marginTop: "2rem", marginLeft: "250px"}} >
                <p><strong>Difficulty:</strong> {recipeDetails?.difficulty}</p>
                <p><strong>Prep Time:</strong> {recipeDetails?.prepTimeMinutes} minutes</p>
                <p><strong>Cook Time:</strong> {recipeDetails?.cookTimeMinutes} minutes</p>
                <p><strong>Meal Type:</strong> {recipeDetails?.mealType.join(", ")}</p>
                <p><strong>Servings:</strong> {recipeDetails?.servings}</p>
                <p><strong>Tags:</strong> {recipeDetails?.tags.join(", ")}</p>
                <p><strong>Review Count:</strong> {recipeDetails?.reviewCount}</p>
                <p><strong>Rating:</strong> {recipeDetails?.rating}</p>
        </Col>
        <Col>
            <img height={350} width={350} src={recipeDetails?.image} alt={recipeDetails?.name} />
        </Col>
      </Row>
      <Row>
        <Col style={{marginTop: "2rem", marginLeft: "250px"}}>
                <h4>Ingredients:</h4>
                <ul>
                    {recipeDetails?.ingredients.map((ing, index) => (
                        <li key={index}>{ing}</li>
                    ))}
                </ul>
        </Col>
        <Col style={{marginTop: "2rem", marginLeft: "100px", paddingRight:"200px" }}>
                <h4>Instructions:</h4>
                <ol>
                    {recipeDetails?.instructions.map((inst, index) => (
                        <li key={index}>{inst}</li>
                    ))}
                </ol>
        </Col>
      </Row>
    </div>
  );
};

export default RecipeDetails;