import React from "react";
import { RecipeCategory, RecipeType, recipes } from "../data/recipe";
import { ingredients } from "../data/ingredient";
import { LOCAL_STORAGE_INGREDIENTS } from ".";

// display ingredients list and accept count for each
type IngredientsCountInputProps = {
  ingredientsCountState: { [key: string]: number };
  setIngredientsCountState: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  unavailableRecipes: RecipeType[];
  selectedCategory: RecipeCategory | null;
};

const IngredientsCountInput: React.FC<IngredientsCountInputProps> = ({ ingredientsCountState, setIngredientsCountState, unavailableRecipes, selectedCategory }) => {
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
  recipes.forEach(recipe => {
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
    
    setIngredientsCountState((prevState: { [key: string]: number }) => ({
      ...prevState,
      [ingredientKey]: ingredientCount
    }));
  }

  const saveData = () => {
    // 入力値をlocalStorageに保存
    localStorage.setItem(LOCAL_STORAGE_INGREDIENTS, JSON.stringify(ingredientsCountState));
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
                  value={ingredientsCountState ? ingredientsCountState[key] : ""}
                  onChange={handleCountChange}
                  onBlur={saveData}
                />
                {ingredient.emoji}{ingredient.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IngredientsCountInput;
