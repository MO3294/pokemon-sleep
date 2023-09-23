import React from "react";
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

export default RecipeCategorySelect;
