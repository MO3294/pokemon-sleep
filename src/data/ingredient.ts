// map of ingredients
// each ingredient has a japanese name and a emoji icon

export type IngredientType = {
    name: string;
    emoji: string;
};

export const ingredients = new Map<string, IngredientType>([
    ["egg", { name: "とくせんエッグ", emoji: "🐣" }],
    ["apple", { name: "とくせんリンゴ", emoji: "🍎" }],
    ["herb", { name: "げきからハーブ", emoji: "🍁" }],
    ["sausage", { name: "マメミート", emoji: "🌭" }],
    ["milk", { name: "モーモーミルク", emoji: "🥛" }],
    ["honey", { name: "あまいミツ", emoji: "🍯" }],
    ["oil", { name: "ピュアなオイル", emoji: "🫙" }],
    ["ginger", { name: "あったかジンジャー", emoji: "🧄" }],
    ["tomato", { name: "あんみんトマト", emoji: "🍅" }],
    ["cacao", { name: "リラックスカカオ", emoji: "🍫" }],
    ["soybeans", { name: "ワカクサ大豆", emoji: "🌱" }],
    ["mushroom", { name: "あじわいキノコ", emoji: "🍄" }],
    ["tail", { name: "おいしいシッポ", emoji: "🐖" }],
    ["leek", { name: "ふといながねぎ", emoji: "🪴" }],
    ["potato", { name: "ほっこりポテト", emoji: "🥔" }],
]);

