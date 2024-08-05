import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PATH, URL_BASE } from '../definitions/constant/variables';
import { map, Observable } from 'rxjs';
import { adapterCategory, adarterDishesCategory } from '../utl/mapper';
import { CategoriesResponse, Category, DishesCategory, DishesCategoryResponse } from '../definitions/model/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient);

	getCategories(): Observable<Category[]> {
		return this.http.get<CategoriesResponse>(`${URL_BASE}${PATH.categoires}`).pipe(
			map(adapterCategory)
		);
	}

	getDishesForCategory(name: string): Observable<DishesCategory[]> {
		return this.http.get<DishesCategoryResponse>(`${URL_BASE}${PATH.filter}?c=${name}`).pipe(
			map(adarterDishesCategory)
		)
	}
}
