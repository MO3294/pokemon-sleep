// accept ingredients count input and display a list of recipes which can be cooked with that ingredients
import React, { useState } from "react";

// import ingredients and recipes from data folder
import { ingredients } from "../data/ingredient";
import { recipes } from "../data/recipe";
import { RecipeCategory } from "../data/recipe";


// select recipe category from dropdown
// カテゴリ選択のコンポーネント
const RecipeCategorySelect = ({ setSelectedCategory }: { setSelectedCategory: (category: RecipeCategory | null) => void }) => {
  return (
    <div>
      <h2>Category</h2>
      <select onChange={(e) => {
        if(e.target.value === "") {
          setSelectedCategory(null);
        } else {
          setSelectedCategory(RecipeCategory[e.target.value as keyof typeof RecipeCategory]);
        }
      }}>
        <option value="">All Categories</option>
        {Object.entries(RecipeCategory).map(([categoryKey, category]) => {
          return (
            <option key={categoryKey} value={categoryKey}>{category}</option>
          )
        })}
      </select>
    </div>
  );
}


// display ingredients list and accept count for each
const IngredientsCountInput = () => {
  // prepare ingredients list count and useState
  const initialIngredientsCount: { [key: string]: number } = {};
  Array.from(ingredients).forEach(([key, ingredient]) => {
    initialIngredientsCount[key] = 0;
  });
  const [ingredientsCountState, setIngredientsCountState] = useState(initialIngredientsCount);

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ingredientKey = event.target.name;
    const ingredientCount = Number(event.target.value);
    
    setIngredientsCountState(prevState => ({
      ...prevState,
      [ingredientKey]: ingredientCount
    }));
  }

  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
      {Array.from(ingredients).map(([key, ingredient]) => {
        return (
          <li key={key}>
            <input type="number" min="0" 
              name={key}
              value={ingredientsCountState[key] || 0}
              onChange={handleCountChange} 
            />
            {ingredient.name}{ingredient.emoji}
          </li>
        );
      })}
      </ul>
    </div>
  );
}


// display list of recipes which can be cooked with the ingredients
const RecipeList = ({ selectedCategory }: { selectedCategory: RecipeCategory | null }) => {
  const filteredRecipes = recipes.filter(recipe => !selectedCategory || recipe.category === selectedCategory);

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {filteredRecipes.map((recipe, index) => (
          <li key={index}>
            <h3>{recipe.name}</h3>
            <p>Energy: {recipe.energy}</p>
            <p>Category: {recipe.category}</p>
            <ul>
              {recipe.requires.map((requirement, idx) => (
                <li key={idx}>
                  {requirement.ingredient.name} {requirement.ingredient.emoji} - {requirement.count}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}


// page title
const pageTitle = "Cooking Recipes";

// create index page
const IndexPage = () => {
  // カテゴリの状態を管理するためのuseStateフック
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | null>(null);

  return (
    <div>
      <h1>{pageTitle}</h1>
      <RecipeCategorySelect setSelectedCategory={setSelectedCategory} />
      <IngredientsCountInput />
      <RecipeList selectedCategory={selectedCategory} />
    </div>
  );
}


export default IndexPage