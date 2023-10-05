// accept ingredients count input and display a list of recipes which can be cooked with that ingredients
import React, { useEffect, useState } from "react";

// import ingredients and recipes from data folder
import { ingredients } from "../data/ingredient";
import { RecipeType, recipes } from "../data/recipe";
import { RecipeCategory } from "../data/recipe";
import RecipeCategorySelect from "./category";
import IngredientsInput, { IngredientInputType } from "./ingredient";
import RecipesList from "./recipe";

// page title
const pageTitle = "Cooking Recipes";

// local storage
export const LOCAL_STORAGE_INGREDIENTS = "pokemonSleep:Ingredients";
export const LOCAL_STORAGE_CATEGORY = "pokemonSleep:Category";

// create index page
const IndexPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | null>(null);
  const [ingredientsState, setIngredientsState] = useState<{ [key: string]: IngredientInputType }>({});
  const [availableRecipes, setAvailableRecipes] = useState<RecipeType[]>([]);
  const [unavailableRecipes, setUnavailableRecipes] = useState<RecipeType[]>([]);
  
  // load from localStorage
  useEffect(() => {
    const savedIngredients = localStorage.getItem(LOCAL_STORAGE_INGREDIENTS);
    if (savedIngredients) {
      const parsedIngredientCounts = JSON.parse(savedIngredients);
      setIngredientsState(parsedIngredientCounts);
    }

    const savedCategory = localStorage.getItem(LOCAL_STORAGE_CATEGORY);
    if (savedCategory && savedCategory !== "") {
      setSelectedCategory(RecipeCategory[savedCategory as keyof typeof RecipeCategory]);
    }

  }, []);  // ← 空の依存配列を指定することで、このuseEffectはコンポーネントのマウント時に一度だけ実行されます

  useEffect(() => {
    const allRecipes = [...recipes]
    .filter((recipe) => recipe.requires.every((requiredIngredient) => {
      const ingredientKey = Object.keys(ingredientsState).find(key => ingredients.get(key) === requiredIngredient.ingredient);
      return ingredientsState[ingredientKey!]?.isReleased
    }))
    .sort((a, b) => b.energy - a.energy); 

    const [newAvailableRecipes, newUnavailableRecipes] = allRecipes.reduce(([accAvailable, accUnavailable], recipe) => {
      if (selectedCategory && recipe.category !== selectedCategory) return [accAvailable, accUnavailable];

      const isAvailable = recipe.requires.every(requiredIngredient => {
        const ingredientKey = Object.keys(ingredientsState).find(key => ingredients.get(key) === requiredIngredient.ingredient);
        const currentCount = ingredientsState[ingredientKey!]?.count || 0;
        return currentCount >= requiredIngredient.count;
      });

      if (isAvailable) {
        accAvailable.push(recipe);
      } else {
        accUnavailable.push(recipe);
      }

      return [accAvailable, accUnavailable];
    }, [[], []] as [RecipeType[], RecipeType[]]);

    setAvailableRecipes(newAvailableRecipes);
    setUnavailableRecipes(newUnavailableRecipes);
  }, [ingredientsState, selectedCategory]);  // ← ingredientsStateとselectedCategoryが変更されたときに実行されます

  return (
    <div>
      <h1>{pageTitle}</h1>
      <RecipeCategorySelect 
        setSelectedCategory={setSelectedCategory} 
        selectedCategory={selectedCategory}
      />
      <IngredientsInput 
        ingredientsState={ingredientsState} 
        setIngredientsState={setIngredientsState} 
        unavailableRecipes={unavailableRecipes}
        selectedCategory={selectedCategory}
      />
      <RecipesList 
        ingredientsState={ingredientsState} 
        availableRecipes={availableRecipes}
        unavailableRecipes={unavailableRecipes}
      />
    </div>
  );
}

export default IndexPage
