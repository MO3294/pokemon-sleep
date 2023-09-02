// accept ingredients count input and display a list of recipes which can be cooked with that ingredients
import React, { useState } from "react";

// import ingredients and recipes from data folder
import { ingredients } from "../data/ingredient";
import { RecipeType, recipes } from "../data/recipe";
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
type IngredientsCountInputProps = {
  ingredientsCountState: { [key: string]: number };
  setIngredientsCountState: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
};

const IngredientsCountInput: React.FC<IngredientsCountInputProps> = ({ ingredientsCountState, setIngredientsCountState }) => {
  // prepare ingredients list count and useState
  const initialIngredientsCount: { [key: string]: number } = {};
  Array.from(ingredients).forEach(([key, ingredient]) => {
    initialIngredientsCount[key] = 0;
  });

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ingredientKey = event.target.name;
    const ingredientCount = Number(event.target.value);
    
    setIngredientsCountState((prevState: { [key: string]: number }) => ({
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
const canCookRecipe = (recipe: RecipeType, ingredientsCount: { [key: string]: number }): boolean => {
  for(let requirement of recipe.requires) {
    const ingredientKey = [...ingredients.keys()].find(key => ingredients.get(key) === requirement.ingredient);
    if (!ingredientKey || (ingredientsCount[ingredientKey] || 0) < requirement.count) {
      return false; // ingredientが足りない場合
    }
  }
  return true; // すべてのingredientが足りる場合
}

// レシピリストのコンポーネント
const RecipesList: React.FC<{ selectedCategory: RecipeCategory | null, ingredientsCountState: { [key: string]: number } }> = ({ selectedCategory, ingredientsCountState }) => {
  const filteredRecipes = recipes.filter(recipe => {
    if (selectedCategory && recipe.category !== selectedCategory) return false;

    return recipe.requires.every(requiredIngredient => {
      const ingredientKey = Object.keys(ingredientsCountState).find(key => ingredients.get(key) === requiredIngredient.ingredient);
      const currentCount = ingredientsCountState[ingredientKey!] || 0;
      return currentCount >= requiredIngredient.count;
    });
  })
  .sort((a, b) => b.energy - a.energy); // これで降順にソートされます


  return (
    <div>
      <h2>Available Recipes</h2>
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe.name}>
            <h3>{recipe.name}</h3>
            <p>エナジー: {recipe.energy}</p>
            <ul>
              {recipe.requires.map(ingredient => (
                <li key={ingredient.ingredient.name}>
                  {ingredient.ingredient.name}{ingredient.ingredient.emoji}: {ingredient.count}
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
const IndexPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | null>(null);
  const [ingredientsCountState, setIngredientsCountState] = useState<{ [key: string]: number }>({});

  return (
    <div>
      <h1>{pageTitle}</h1>
      <RecipeCategorySelect setSelectedCategory={setSelectedCategory} />
      <IngredientsCountInput 
        ingredientsCountState={ingredientsCountState} 
        setIngredientsCountState={setIngredientsCountState} 
      />
      <RecipesList 
        selectedCategory={selectedCategory} 
        ingredientsCountState={ingredientsCountState} 
      />
    </div>
  );
}

export default IndexPage