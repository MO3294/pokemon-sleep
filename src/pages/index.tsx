// accept ingredients count input and display a list of recipes which can be cooked with that ingredients
import React, { useEffect, useState } from "react";

// import ingredients and recipes from data folder
import { ingredients } from "../data/ingredient";
import { RecipeType, recipes } from "../data/recipe";
import { RecipeCategory } from "../data/recipe";
import RecipeCategorySelect from "./category";
import IngredientsCountInput from "./ingredient";
import RecipesList from "./recipe";

// page title
const pageTitle = "Cooking Recipes";

// local storage
export const LOCAL_STORAGE_INGREDIENTS = "pokemonSleepIngredients";
export const LOCAL_STORAGE_CATEGORY = "pokemonSleepCategory";

// create index page
const IndexPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | null>(null);
  const [ingredientsCountState, setIngredientsCountState] = useState<{ [key: string]: number }>({});

  // load from localStorage
  useEffect(() => {
    const savedIngredients = localStorage.getItem(LOCAL_STORAGE_INGREDIENTS);
    if (savedIngredients) {
      const parsedIngredients = JSON.parse(savedIngredients);
      setIngredientsCountState(parsedIngredients);
    }

    const savedCategory = localStorage.getItem(LOCAL_STORAGE_CATEGORY);
    if (savedCategory && savedCategory !== "") {
      setSelectedCategory(RecipeCategory[savedCategory as keyof typeof RecipeCategory]);
    }
  }, []);  // ← 空の依存配列を指定することで、このuseEffectはコンポーネントのマウント時に一度だけ実行されます

  const allRecipes = [...recipes].sort((a, b) => b.energy - a.energy); 
  const [availableRecipes, unavailableRecipes] = allRecipes.reduce(([accAvailable, accUnavailable], recipe) => {
    if (selectedCategory && recipe.category !== selectedCategory) return [accAvailable, accUnavailable];

    const isAvailable = recipe.requires.every(requiredIngredient => {
      const ingredientKey = Object.keys(ingredientsCountState).find(key => ingredients.get(key) === requiredIngredient.ingredient);
      const currentCount = ingredientsCountState[ingredientKey!] || 0;
      return currentCount >= requiredIngredient.count;
    });

    if (isAvailable) {
      accAvailable.push(recipe);
    } else {
      accUnavailable.push(recipe);
    }

    return [accAvailable, accUnavailable];
  }, [[], []] as [RecipeType[], RecipeType[]]);

  return (
    <div>
      <h1>{pageTitle}</h1>
      <RecipeCategorySelect 
        setSelectedCategory={setSelectedCategory} 
        selectedCategory={selectedCategory}
      />
      <IngredientsCountInput 
        ingredientsCountState={ingredientsCountState} 
        setIngredientsCountState={setIngredientsCountState} 
        unavailableRecipes={unavailableRecipes}
        selectedCategory={selectedCategory}
      />
      <RecipesList 
        ingredientsCountState={ingredientsCountState} 
        availableRecipes={availableRecipes}
        unavailableRecipes={unavailableRecipes}
      />
    </div>
  );
}

export default IndexPage
