import RecipeDetails from "@/components/RecipeDetails";

export type Recipe = {
  id: number;
  name: string;
};

export type RecipeDropdownProps = {
  onSelect: (id: number) => void;
};

export type RecipeDetailsProps = {
  recipeId: number;
}

export type RecipeDetails = {
  id: number;
  name: string;
  ingredients: Array<string>;
  instructions: Array<string>;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  tags: Array<string>;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: Array<string>;
}