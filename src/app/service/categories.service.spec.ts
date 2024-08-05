import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CategoriesService } from './categories.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { CategoriesResponse, Category, DishesCategoryResponse } from '../definitions/model/categories';
import { PATH, URL_BASE } from '../definitions/constant/variables';

describe('CategoriesService', () => {
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;
	let service: CategoriesService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CategoriesService,
				provideHttpClient(),
				provideHttpClientTesting()
			]
		});
	
		httpClient = TestBed.inject(HttpClient);
		httpTestingController = TestBed.inject(HttpTestingController);
		service = TestBed.inject(CategoriesService);
	});

	it('should be created CategoriesService', () => {
		expect(service).toBeTruthy();
	});

	it('should call getCategories then then validate request', () => {
		const dummyCategory = [
			{ idCategory: '1', strCategory: 'Beef', strCategoryThumb: '', strCategoryDescription: '' },
			{ idCategory: '2', strCategory: 'Chicken', strCategoryThumb: '', strCategoryDescription: '' }
		];

		const dummyCategoriesResponse: CategoriesResponse = {
			categories: dummyCategory
		};

		service.getCategories().subscribe((response) => {
			expect(response).toEqual(dummyCategory);
		});

		const req = httpTestingController.expectOne(`${URL_BASE}${PATH.categoires}`);
		expect(req.request.method).toBe('GET');
		req.flush(dummyCategoriesResponse);
	});

	it('should call getDishesForCategory then validate request', () => {
		const nameCategory = "Seafood";
		const dummyDishes = [
			{
				strMeal: "Baked salmon with fennel & tomatoes",
				strMealThumb: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
				idMeal: "52959"
			},
			{
				strMeal: "Cajun spiced fish tacos",
				strMealThumb: "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
				idMeal: "52819"
			},
			{
				strMeal: "Escovitch Fish",
				strMealThumb: "https://www.themealdb.com/images/media/meals/1520084413.jpg",
				idMeal: "52944"
			}
		];

		const dummyDishesResponse: DishesCategoryResponse = {
				meals: [
					{
						strMeal: "Baked salmon with fennel & tomatoes",
						strMealThumb: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
						idMeal: "52959"
					},
					{
						strMeal: "Cajun spiced fish tacos",
						strMealThumb: "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
						idMeal: "52819"
					},
					{
						strMeal: "Escovitch Fish",
						strMealThumb: "https://www.themealdb.com/images/media/meals/1520084413.jpg",
						idMeal: "52944"
					}
				]
		};

		service.getDishesForCategory(nameCategory).subscribe((response) => {
			expect(response).toEqual(dummyDishes);
		});

		const req = httpTestingController.expectOne(`${URL_BASE}${PATH.filter}?c=${nameCategory}`);
		expect(req.request.method).toBe('GET');
		expect(req.request.urlWithParams).toContain(nameCategory);
		req.flush(dummyDishesResponse);
	});
});
