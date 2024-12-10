export interface Category {
  strCategory: string;
}

export interface Area {
  strArea: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strTags: string | null;
  strInstructions: string;
  ingredients: string[];

  [key: string]: string | number | null | string[] | object;
}
