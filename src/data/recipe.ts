// Define a list of recipes
// each recipe has name, energy, category and contains required ingredient counts

import { IngredientType, ingredients } from "./ingredient";

export enum RecipeCategory {
    "curry"="カレー・シチュー",
    "salad"="サラダ",
    "desert"="デザート・スイーツ",
}

export type RecipeType = {
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
        ],
    },
    {
        name: "クラフトサイコソーダ",
        energy: 964,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("honey")!, count: 9 },
        ],
    },
    {
        name: "ねがいごとアップルパイ",
        energy: 1634,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("milk")!, count: 4 },
            { ingredient: ingredients.get("apple")!, count: 12 },
        ],
    },
    {
        name: "じゅくせいスイートポテト",
        energy: 1783,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("milk")!, count: 5 },
            { ingredient: ingredients.get("potato")!, count: 9 },
        ],
    },
    {
        name: "ひのこのジンジャーティー",
        energy: 1788,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("apple")!, count: 7 },
            { ingredient: ingredients.get("ginger")!, count: 9 },
        ],
    },{
        name: "マイペースやさいジュース",
        energy: 1798,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("apple")!, count: 7 },
            { ingredient: ingredients.get("tomato")!, count: 9 },
        ],
    },
    {
        name: "かるわざソイケーキ",
        energy: 1798,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("soybeans")!, count: 7 },
            { ingredient: ingredients.get("egg")!, count: 8 },
        ],
    },
    {
        name: "おおきいマラサダ",
        energy: 2927,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("milk")!, count: 7 },
            { ingredient: ingredients.get("oil")!, count: 10 },
            { ingredient: ingredients.get("honey")!, count: 6 },
        ],
    },
    {
        name: "はりきりプロテインスムージー",
        energy: 3168,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("soybeans")!, count: 15 },
            { ingredient: ingredients.get("cacao")!, count: 8 },
        ],
    },
    {
        name: "ちからもちソイドーナツ",
        energy: 3213,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("soybeans")!, count: 6 },
            { ingredient: ingredients.get("cacao")!, count: 7 },
            { ingredient: ingredients.get("oil")!, count: 9 },
        ],
    },
    {
        name: "あまいかおりチョコケーキ",
        energy: 3280,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("cacao")!, count: 8 },
            { ingredient: ingredients.get("milk")!, count: 7 },
            { ingredient: ingredients.get("honey")!, count: 9 },
        ],
    },
    {
        name: "あくまのキッスフルーツオレ",
        energy: 4734,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("cacao")!, count: 8 },
            { ingredient: ingredients.get("milk")!, count: 9 },
            { ingredient: ingredients.get("apple")!, count: 11 },
            { ingredient: ingredients.get("honey")!, count: 7 },
        ],
    },
    {
        name: "ふくつのジンジャークッキー",
        energy: 4921,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("cacao")!, count: 5 },
            { ingredient: ingredients.get("egg")!, count: 4 },
            { ingredient: ingredients.get("honey")!, count: 14 },
            { ingredient: ingredients.get("ginger")!, count: 12 },
        ],
    },
    {
        name: "ネロリのデトックスティー",
        energy: 5065,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("apple")!, count: 15 },
            { ingredient: ingredients.get("ginger")!, count: 11 },
            { ingredient: ingredients.get("mushroom")!, count: 9 },
        ],
    },
    {
        name: "プリンのプリンアラモード",
        energy: 7594,
        category: RecipeCategory.desert,
        requires: [
            { ingredient: ingredients.get("milk")!, count: 10 },
            { ingredient: ingredients.get("apple")!, count: 10 },
            { ingredient: ingredients.get("egg")!, count: 15 },
            { ingredient: ingredients.get("honey")!, count: 20 },
        ],
    },{
        name: "とくせんリンゴカレー",
        energy: 668,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("apple")!, count: 7 },
        ],
    },
    {
        name: "たんじゅんホワイトシチュー",
        energy: 727,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("milk")!, count: 7 },
        ],
    },
    {
        name: "ベイビィハニーカレー",
        energy: 749,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("honey")!, count: 7 },
        ],
    },
    {
        name: "マメバーグカレー",
        energy: 764,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("sausage")!, count: 7 },
        ],
    },
    {
        name: "満腹チーズバーグカレー",
        energy: 1785,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("milk")!, count: 8 },
            { ingredient: ingredients.get("sausage")!, count: 8 },
        ],
    },
    {
        name: "ひでりカツカレー",
        energy: 1815,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("sausage")!, count: 10 },
            { ingredient: ingredients.get("oil")!, count: 5 },
        ],
    },
    {
        name: "サンパワートマトカレー",
        energy: 1943,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("herb")!, count: 5 },
            { ingredient: ingredients.get("tomato")!, count: 10 },
        ],
    },
    {
        name: "とけるオムカレー",
        energy: 2009,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("egg")!, count: 10 },
            { ingredient: ingredients.get("tomato")!, count: 6 },
        ],
    },
    {
        name: "ほっこりホワイトシチュー",
        energy: 3089,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("milk")!, count: 10 },
            { ingredient: ingredients.get("potato")!, count: 8 },
            { ingredient: ingredients.get("mushroom")!, count: 4 },
        ],
    },
    {
        name: "ビルドアップマメカレー",
        energy: 3274,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("soybeans")!, count: 12 },
            { ingredient: ingredients.get("sausage")!, count: 6 },
            { ingredient: ingredients.get("egg")!, count: 4 },
            { ingredient: ingredients.get("herb")!, count: 4 },
        ],
    },
    {
        name: "キノコのほうしカレー",
        energy: 4041,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("potato")!, count: 9 },
            { ingredient: ingredients.get("mushroom")!, count: 14 },
        ],
    },
    {
        name: "おやこあいカレー",
        energy: 4523,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("potato")!, count: 4 },
            { ingredient: ingredients.get("apple")!, count: 11 },
            { ingredient: ingredients.get("egg")!, count: 8 },
            { ingredient: ingredients.get("honey")!, count: 12 },
        ],
    },
    {
        name: "からくちネギもりカレー",
        energy: 5900,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("leek")!, count: 14 },
            { ingredient: ingredients.get("herb")!, count: 8 },
            { ingredient: ingredients.get("ginger")!, count: 10 },
        ],
    },
    {
        name: "ニンジャカレー",
        energy: 6159,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("soybeans")!, count: 15 },
            { ingredient: ingredients.get("sausage")!, count: 9 },
            { ingredient: ingredients.get("leek")!, count: 9 },
            { ingredient: ingredients.get("mushroom")!, count: 5 },
        ],
    },
    {
        name: "あぶりテールカレー",
        energy: 7483,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("herb")!, count: 25 },
            { ingredient: ingredients.get("tail")!, count: 8 },
        ],
    },
    {
        name: "ぜったいねむりバターカレー",
        energy: 9010,
        category: RecipeCategory.curry,
        requires: [
            { ingredient: ingredients.get("cacao")!, count: 12 },
            { ingredient: ingredients.get("milk")!, count: 10 },
            { ingredient: ingredients.get("potato")!, count: 18 },
            { ingredient: ingredients.get("tomato")!, count: 15 },
        ],
    },{
        name: "とくせんリンゴサラダ",
        energy: 763,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("apple")!, count: 8 },
        ],
    },
    {
        name: "マメハムサラダ",
        energy: 873,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("sausage")!, count: 8 },
        ],
    },
    {
        name: "あんみんトマトサラダ",
        energy: 933,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("tomato")!, count: 8 },
        ],
    },
    {
        name: "ゆきかきシーザーサラダ",
        energy: 1774,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("milk")!, count: 10 },
            { ingredient: ingredients.get("sausage")!, count: 6 },
        ],
    },
    {
        name: "うるおいとうふサラダ",
        energy: 1843,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("soybeans")!, count: 10 },
            { ingredient: ingredients.get("tomato")!, count: 6 },
        ],
    },
    {
        name: "ねっぷうとうふサラダ",
        energy: 1976,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("soybeans")!, count: 10 },
            { ingredient: ingredients.get("herb")!, count: 6 },
        ],
    },
    {
        name: "メロメロりんごのチーズサラダ",
        energy: 2578,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("milk")!, count: 5 },
            { ingredient: ingredients.get("oil")!, count: 3 },
            { ingredient: ingredients.get("apple")!, count: 15 },
        ],
    },
    {
        name: "めんえきねぎサラダ",
        energy: 2658,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("leek")!, count: 10 },
            { ingredient: ingredients.get("ginger")!, count: 5 },
        ],
    },
    {
        name: "モーモーカプレーゼ",
        energy: 2856,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("milk")!, count: 12 },
            { ingredient: ingredients.get("oil")!, count: 5 },
            { ingredient: ingredients.get("tomato")!, count: 6 },
        ],
    },
    {
        name: "ばかぢからワイルドサラダ",
        energy: 2958,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("sausage")!, count: 9 },
            { ingredient: ingredients.get("potato")!, count: 3 },
            { ingredient: ingredients.get("egg")!, count: 5 },
            { ingredient: ingredients.get("ginger")!, count: 6 },
        ],
    },
    {
        name: "ムラっけチョコミートサラダ",
        energy: 3558,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("cacao")!, count: 14 },
            { ingredient: ingredients.get("sausage")!, count: 9 },
        ],
    },
    {
        name: "くいしんぼうポテトサラダ",
        energy: 5040,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("sausage")!, count: 7 },
            { ingredient: ingredients.get("potato")!, count: 14 },
            { ingredient: ingredients.get("apple")!, count: 6 },
            { ingredient: ingredients.get("egg")!, count: 9 },
        ],
    },
    {
        name: "オーバーヒートサラダ",
        energy: 5225,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("herb")!, count: 17 },
            { ingredient: ingredients.get("tomato")!, count: 8 },
            { ingredient: ingredients.get("ginger")!, count: 10 },
        ],
    },
    {
        name: "キノコのほうしサラダ",
        energy: 5859,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("oil")!, count: 8 },
            { ingredient: ingredients.get("tomato")!, count: 8 },
            { ingredient: ingredients.get("mushroom")!, count: 17 },
        ],
    },
    {
        name: "ヤドンテールのペッパーサラダ",
        energy: 8169,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("oil")!, count: 15 },
            { ingredient: ingredients.get("herb")!, count: 10 },
            { ingredient: ingredients.get("tail")!, count: 10 },
        ],
    },
    {
        name: "ニンジャサラダ",
        energy: 10095,
        category: RecipeCategory.salad,
        requires: [
            { ingredient: ingredients.get("soybeans")!, count: 15 },
            { ingredient: ingredients.get("leek")!, count: 15 },
            { ingredient: ingredients.get("ginger")!, count: 11 },
            { ingredient: ingredients.get("mushroom")!, count: 12 },
        ],
    },
]