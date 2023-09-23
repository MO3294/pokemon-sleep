import React from "react";
import { RecipeCategory } from "../data/recipe";
import { LOCAL_STORAGE_CATEGORY } from ".";

// select recipe category from dropdown
// カテゴリ選択のコンポーネント
function getRecipeCategoryKey(categoryValue: RecipeCategory): string {
  return Object.keys(RecipeCategory).find(key => RecipeCategory[key as keyof typeof RecipeCategory] === categoryValue) || "";
}

interface RecipeCategorySelectProps {
  setSelectedCategory: (category: RecipeCategory | null) => void;
  selectedCategory: RecipeCategory | null;
}

const RecipeCategorySelect: React.FC<RecipeCategorySelectProps> = ({ setSelectedCategory, selectedCategory }) => {
  const selectedCategoryKey = selectedCategory ? getRecipeCategoryKey(selectedCategory) : "";

  return (
    <div>
      <h2>Category</h2>
      <select 
        value={selectedCategoryKey ?? ""}
        onChange={(e) => {
          let category = null;
          if (e.target.value !== "") {
            category = RecipeCategory[e.target.value as keyof typeof RecipeCategory];
          }
          setSelectedCategory(category);
        
          // enum 値からキーを取得して保存
          const categoryKeyToSave = getRecipeCategoryKey(category!);  // こちらで!を使用してcategoryがnullでないことをアサート
          localStorage.setItem(LOCAL_STORAGE_CATEGORY, categoryKeyToSave);
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
