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
  unavailableRecipes: RecipeType[];
  selectedCategory: RecipeCategory | null;
};

const IngredientsCountInput: React.FC<IngredientsCountInputProps> = ({ ingredientsCountState, setIngredientsCountState, unavailableRecipes, selectedCategory }) => {
  // 1. Unavailable Recipesの上位3つに含まれる材料の一覧を取得
  const top3UnavailableRecipes = unavailableRecipes.slice(0, 3);
  const ingredientsInTop3 = new Set<string>();
  top3UnavailableRecipes.forEach(recipe => {
    recipe.requires.forEach(ingredient => {
      ingredientsInTop3.add(ingredient.ingredient.name);
    });
  });

  // 2. 選択されたカテゴリのレシピに含まれていない材料の一覧を取得
  const ingredientsInSelectedCategory = new Set<string>();
  recipes.forEach(recipe => {
    if (selectedCategory && recipe.category === selectedCategory) {
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
                  name={key}
                  value={ingredientsCountState[key] || ""}
                  onChange={handleCountChange}
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



// display list of recipes which can be cooked with the ingredients
// レシピリストのコンポーネント
interface RecipesListProps {
  selectedCategory: RecipeCategory | null;
  ingredientsCountState: { [key: string]: number };
  availableRecipes: RecipeType[];
  unavailableRecipes: RecipeType[];
}

const RecipesList: React.FC<RecipesListProps> = ({ 
  selectedCategory, 
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




// page title
const pageTitle = "Cooking Recipes";

// create index page
const IndexPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | null>(null);
  const [ingredientsCountState, setIngredientsCountState] = useState<{ [key: string]: number }>({});

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
      <RecipeCategorySelect setSelectedCategory={setSelectedCategory} />
      <IngredientsCountInput 
        ingredientsCountState={ingredientsCountState} 
        setIngredientsCountState={setIngredientsCountState} 
        unavailableRecipes={unavailableRecipes}
        selectedCategory={selectedCategory}
      />
      <RecipesList 
        selectedCategory={selectedCategory} 
        ingredientsCountState={ingredientsCountState} 
        availableRecipes={availableRecipes}
        unavailableRecipes={unavailableRecipes}
      />
    </div>
  );
}

export default IndexPage
