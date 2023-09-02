// Define a list of recipes
// each recipe has name, energy, category and contains required ingredient counts

import { IngredientType, ingredients } from "./ingredient";

export enum RecipeCategory {
    "curry"="カレー・シチュー",
    "salad"="サラダ",
    "desert"="デザート・スイーツ",
}

type RecipeType = {
    name: string;
    energy: number;
    category: RecipeCategory;
    requires: { ingredient: IngredientType; count: number }[];
};

export const recipes: RecipeType[] = [
    {
        name: "モーモーホットミルク",
        energy: 727,
        category: RecipeCategory.desert,
        requires: [
        { ingredient: ingredients.get("milk")!, count: 7 },
        ],
    },
    {
        name: "とくせんリンゴジュース",
        energy: 763,
        category: RecipeCategory.desert,
        requires: [
        { ingredient: ingredients.get("apple")!, count: 8 },
        ]
    }
]