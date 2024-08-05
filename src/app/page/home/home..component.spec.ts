import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { DishesService } from 'src/app/service/dishes.service';
import { StoreService } from 'src/app/store/store.service';
import { of } from 'rxjs';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Meal } from 'src/app/definitions/model/dishes';
import { IonicModule, ToastController } from '@ionic/angular';
import { MockComponent } from 'ng-mocks';
import { CategoriesComponent } from 'src/app/components/categories/categories.component';
import { DishesComponent } from 'src/app/components/dishes/dishes.component';
import { StoreCategory } from 'src/app/definitions/model/store';
import { Category } from 'src/app/definitions/model/categories';

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
		{ ingredient: 'soy sauce', measure: '3/4 cup' },
		{ ingredient: 'water', measure: '1/2 cup' },
		{ ingredient: 'brown sugar', measure: '1/4 cup' }
	],
	strSource: '',
	strImageSource: '',
	strCreativeCommonsConfirmed: '',
	dateModified: ''
}

describe('HomePage', () => {
	let component: HomePage;
	let fixture: ComponentFixture<HomePage>;
	let httpMock: HttpTestingController;
	let storeService: StoreService;
	let dishesService: DishesService;
	let router: Router;
	let toastController: ToastController;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				MockComponent(CategoriesComponent),
				MockComponent(DishesComponent),
				HomePage,
			],
			providers: [
				provideRouter([]),
				provideHttpClient(),
				provideHttpClientTesting(),
			]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HomePage);
		component = fixture.componentInstance;
		httpMock = TestBed.inject(HttpTestingController);
		storeService = TestBed.inject(StoreService);
		dishesService = TestBed.inject(DishesService);
		router = TestBed.inject(Router);
		toastController = TestBed.inject(ToastController);

		fixture.detectChanges();
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should create HomePage', () => {
		expect(component).toBeTruthy();
	});

	it('should call getMealForName and response have value then navigate', () => {
		spyOn(dishesService, 'findByName').and.returnValue(of(dummyDishe));
		spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
		component.getMealForName('Test');

		expect(router.navigate).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalledOnceWith(['detail', dummyDishe.idMeal]);
	});

	it('should call getMealForName and response don\'t have value then call toast', () => {
		spyOn(dishesService, 'findByName').and.returnValue(of({} as Meal));
		spyOn(router, 'navigate').and.returnValue(Promise.resolve(false));
		spyOn(toastController, 'create').and.returnValue(
			Promise.resolve(
				{ 
					present: () => { return Promise.resolve() } 
				}) as unknown as Promise<HTMLIonToastElement>
		);
		component.getMealForName('Test');

		expect(router.navigate).not.toHaveBeenCalled();
		expect(toastController.create).toHaveBeenCalled();
		expect(toastController.create).toHaveBeenCalledWith({
      message: 'There is no plate related to this search',
      duration: 2000,
      position: 'middle',
			color: 'warning'
    });
	});

	it('should call onchange and then to the correct methods and send correct params', () => {
		spyOn(component, 'getMealForName').and.callFake(() => {});
		spyOn(storeService, 'setIsCategory').and.callFake((_: boolean) => {});
		component.onChange('Test');

		expect(component.name).toBe('Test');
		expect(storeService.setIsCategory).toHaveBeenCalled();
		expect(storeService.setIsCategory).toHaveBeenCalledWith(false);
		expect(component.getMealForName).toHaveBeenCalled();
		expect(component.getMealForName).toHaveBeenCalledWith('Test');
	});

	it('should call findByCategory then correct methods and send correct params ', () => {
		spyOn(storeService, 'setStore').and.callFake((_: StoreCategory) => {});
		spyOn(component, 'clear');
		component.findByCategory();

		expect(storeService.setStore).toHaveBeenCalled();
		expect(storeService.setStore).toHaveBeenCalledOnceWith({ isCategory: true, categorySelected: {} as Category});
		expect(component.clear).toHaveBeenCalled();
	});

	it('should call claear then call method component InputSearchComponent', () => {
		spyOn(component.inputSearch, 'clearInput');
		component.clear();

		expect(component.inputSearch.clearInput).toHaveBeenCalled();
	});
});