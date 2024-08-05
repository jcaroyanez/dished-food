export interface Category {
	idCategory: string;
	strCategory: string;
	strCategoryThumb: string;
	strCategoryDescription: string;
}

export interface CategoriesResponse {
	categories: Category[]
}

export interface DishesCategory {
	idMeal: string;
	strMeal: string;
	strMealThumb: string;
}

export interface DishesCategoryResponse {
	meals: DishesCategory[];
}