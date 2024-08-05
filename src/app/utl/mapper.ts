import { CategoriesResponse, Category, DishesCategory, DishesCategoryResponse } from "../definitions/model/categories";
import { Meal, MealResponse, MealResult, Recipe } from "../definitions/model/dishes";

export const adapterCategory = (value: CategoriesResponse): Category[] => {
	return value.categories;
}

export const adarterDishesCategory = (value: DishesCategoryResponse): DishesCategory[] => {
	return value.meals;
}

const formatRecipe = (value: MealResult): Recipe[] => {
	const sizeIngredient = Object.keys(value).filter((key) => key.includes('strIngredient')).length;
	const list: Recipe[] = [];

	for (let i = 0; i <= sizeIngredient; i++) {
		const ingredient = (value as any)[`strIngredient${i}`];
		const measure = (value as any)[`strMeasure${i}`];

		if (ingredient && measure) {
			list.push({
				ingredient,
				measure
			})
		}
	}

	return list;
}

export const adpapterMeal = (value: MealResponse): Meal => {
	if(!value.meals?.length) {
		return {} as Meal;
	}

	const meal = value.meals[0];

	return {
		idMeal: meal.idMeal,
		strMeal: meal.strMeal,
		strDrinkAlternate: meal.strDrinkAlternate,
		strCategory: meal.strCategory,
		strArea: meal.strArea,
		strInstructions: meal.strInstructions.replace(/\\r\\n/g, '<br>').replace(/\\n/g, '<br>').replace(/\r\n/g, '<br>').replace(/\n/g, '<br>'),
		strMealThumb: meal.strMealThumb,
		strTags: meal.strTags,
		strYoutube: meal.strYoutube,
		strSource: meal.strSource,
		strImageSource: meal.strImageSource,
		strCreativeCommonsConfirmed: meal.strCreativeCommonsConfirmed,
		dateModified: meal.dateModified,
		recipe: formatRecipe(meal)
	}
}