import { TestBed } from '@angular/core/testing';

import { DishesService } from './dishes.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Meal, MealResponse } from '../definitions/model/dishes';
import { PATH, URL_BASE } from '../definitions/constant/variables';

const dummyDishe: Meal = {
	idMeal: "52772",
	strMeal: "Teriyaki Chicken Casserole",
	strDrinkAlternate: '',
	strCategory: "Chicken",
	strArea: "Japanese",
	strInstructions: "Preheat oven to 350° F. Spray a 9x13-inch",
	strMealThumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
	strTags: "Meat,Casserole",
	strYoutube: "https://www.youtube.com/watch?v=4aZr5hZXP_s",
	recipe: [
		{ ingredient: 'soy sauce', measure: '3/4 cup'},
		{ ingredient: 'water', measure: '1/2 cup'},
		{ ingredient: 'brown sugar', measure: '1/4 cup'}
	],
	strSource: '',
	strImageSource: '',
	strCreativeCommonsConfirmed: '',
	dateModified: ''
}

const DisheResponse: MealResponse = {
	meals: [
		{
			idMeal: "52772",
			strMeal: "Teriyaki Chicken Casserole",
			strDrinkAlternate: '',
			strCategory: "Chicken",
			strArea: "Japanese",
			strInstructions: "Preheat oven to 350° F. Spray a 9x13-inch",
			strMealThumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
			strTags: "Meat,Casserole",
			strYoutube: "https://www.youtube.com/watch?v=4aZr5hZXP_s",
			strIngredient1: "soy sauce",
			strIngredient2: "water",
			strIngredient3: "brown sugar",
			strMeasure1: "3/4 cup",
			strMeasure2: "1/2 cup",
			strMeasure3: "1/4 cup",
			strSource: '',
			strImageSource: '',
			strCreativeCommonsConfirmed: '',
			dateModified: ''
		}
	]
};

describe('DishesService', () => {
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;
	let service: DishesService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DishesService,
				provideHttpClient(),
				provideHttpClientTesting()
			]
		});

		httpClient = TestBed.inject(HttpClient);
		httpTestingController = TestBed.inject(HttpTestingController);
		service = TestBed.inject(DishesService);
	});
 
	it('should be created DishesService', () => {
		expect(service).toBeTruthy();
	});

	it('should call getDetail then then validate request', () => {
		const id = "52772";
		service.getDetail(id).subscribe((response) => {
			expect(response).toEqual(dummyDishe);
		});

		const req = httpTestingController.expectOne(`${URL_BASE}${PATH.detail}?i=${id}`);
		expect(req.request.method).toBe('GET');
		expect(req.request.urlWithParams).toContain(id);
		req.flush(DisheResponse);
	});

	it('should call findByName then then validate request', () => {
		const name = 'Arrabiata';
		service.findByName(name).subscribe((response) => {
			expect(response).toEqual(dummyDishe);
		});

		const req = httpTestingController.expectOne(`${URL_BASE}${PATH.search}?s=${name}`);
		expect(req.request.method).toBe('GET');
		expect(req.request.urlWithParams).toContain(name);
		req.flush(DisheResponse);
	});
});
