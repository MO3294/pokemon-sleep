import React from "react";
import { RecipeType } from "../data/recipe";
import { ingredients } from "../data/ingredient";

// display list of recipes which can be cooked with the ingredients
// レシピリストのコンポーネント
interface RecipesListProps {
  ingredientsCountState: { [key: string]: number };
  availableRecipes: RecipeType[];
  unavailableRecipes: RecipeType[];
}

const RecipesList: React.FC<RecipesListProps> = ({ 
  ingredientsCountState,
  availableRecipes,
  unavailableRecipes 
}) => {
  
  return (
    <div>
      <h2>Available Recipes</h2>
      <ul>
        {availableRecipes.map(recipe => (
          <li key={recipe.name}>
            <h3>{recipe.name}</h3>
            <p>エナジー: {recipe.energy}</p>
            <ul>
              {recipe.requires.map(ingredient => (
                <li key={ingredient.ingredient.name}>
                  {ingredient.ingredient.emoji}{ingredient.ingredient.name}: {ingredient.count}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h2>Unavailable Recipes</h2>
      <ul>
        {unavailableRecipes.map(recipe => (
          <li key={recipe.name}>
            <h3>{recipe.name}</h3>
            <p>エナジー: {recipe.energy}</p>
            <ul>
              {recipe.requires.map(ingredient => {
                const ingredientKey = Object.keys(ingredientsCountState).find(key => ingredients.get(key) === ingredient.ingredient);
                const currentCount = ingredientsCountState[ingredientKey!] || 0;
                const shortage = ingredient.count - currentCount;
                const isInsufficient = currentCount < ingredient.count;

                return (
                  <li key={ingredient.ingredient.name} style={isInsufficient ? { fontWeight: 'bold', color: 'red' } : {}}>
                    {ingredient.ingredient.name}{ingredient.ingredient.emoji}: {ingredient.count} 
                    {isInsufficient ? ` (-${shortage})` : ''}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipesList;
