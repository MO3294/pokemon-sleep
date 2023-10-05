import React, { useEffect } from "react";
import { RecipeCategory, RecipeType, recipes } from "../data/recipe";
import { ingredients } from "../data/ingredient";
import { LOCAL_STORAGE_INGREDIENTS } from ".";

export type IngredientInputType = {
  count: number;
  isReleased: boolean;
};


// display ingredients list and accept count for each
type IngredientsInputProps = {
  ingredientsState: { [key: string]: IngredientInputType };
  setIngredientsState: React.Dispatch<React.SetStateAction<{ [key: string]: IngredientInputType }>>;
  availableRecipes: RecipeType[];
  unavailableRecipes: RecipeType[];
  selectedCategory: RecipeCategory | null;
};



const IngredientsInput: React.FC<IngredientsInputProps> = ({ ingredientsState: ingredientsState, setIngredientsState: setIngredientsState, availableRecipes, unavailableRecipes, selectedCategory }) => {
  // 1. Unavailable Recipesの上位3つに含まれる材料の一覧を取得
  const top3UnavailableRecipes = unavailableRecipes?.slice(0, 3) ?? [];
  const ingredientsInTop3 = new Set<string>();
  top3UnavailableRecipes.forEach(recipe => {
    recipe.requires.forEach(ingredient => {
      ingredientsInTop3.add(ingredient.ingredient.name);
    });
  });

  // 2. 選択されたカテゴリのレシピに含まれていない材料の一覧を取得
  const ingredientsInSelectedCategory = new Set<string>();
  const allRecipes = [...[...availableRecipes, ...unavailableRecipes]];
  allRecipes.forEach(recipe => {
    // カテゴリが選択されていない、または、選択されたカテゴリがレシピのカテゴリと一致する場合
    if (!selectedCategory || recipe.category === selectedCategory) {
        recipe.requires.forEach(ingredient => {
        ingredientsInSelectedCategory.add(ingredient.ingredient.name);
      });
    }
  });

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ingredientKey = event.target.name;
    const ingredientCount = Number(event.target.value);
    
    const updatedState = {
      ...ingredientsState,
      [ingredientKey]: {count: ingredientCount, isReleased: ingredientsState[ingredientKey]?.isReleased ?? true}
    };
  
    setIngredientsState(updatedState);
    saveData(updatedState);
  }

  const toggleRelease = (key: string) => {
    const updatedState = {
      ...ingredientsState,
      [key]: {count: ingredientsState[key]?.count ?? 0, isReleased: !ingredientsState[key]?.isReleased}
    };
  
    setIngredientsState(updatedState);
    saveData(updatedState);
  };

  const saveData = (dataToSave: { [key: string]: IngredientInputType }) => {
    localStorage.setItem(LOCAL_STORAGE_INGREDIENTS, JSON.stringify(dataToSave));
  }

  return (
    <div>
      <ul>
        {Array.from(ingredients).map(([key, ingredient]) => {
          const isInTop3 = ingredientsInTop3.has(ingredient.name);
          const isInSelectedCategory = ingredientsInSelectedCategory.has(ingredient.name);
          let color = 'black'; // default color
          if (isInTop3) {
            color = 'red';
          } else if (!ingredientsState[key]?.isReleased) {
            color = 'gray';
          } else if (!isInSelectedCategory) {
            color = 'blue';
          }

          return (
            <li key={key} style={{ color: color }}>
              <label>
                <input
                  type="number"
                  pattern="\d*"
                  name={key}
                  value={ingredientsState[key]?.count || ""}
                  onChange={handleCountChange}
                />
                {ingredient.emoji}{ingredient.name}
              </label>
              <button 
                onClick={() => {toggleRelease(key)}}>{ingredientsState[key]?.isReleased ? 'Release' : 'Lock'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientsInput;
