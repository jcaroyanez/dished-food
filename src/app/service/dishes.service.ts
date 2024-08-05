import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PATH, URL_BASE } from '../definitions/constant/variables';
import { map, Observable } from 'rxjs';
import { Meal, MealResponse } from '../definitions/model/dishes';
import { adpapterMeal } from '../utl/mapper';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
	private http = inject(HttpClient);

	getDetail(id: string): Observable<Meal> {
		return this.http.get<MealResponse>(`${URL_BASE}${PATH.detail}?i=${id}`).pipe(
			map(adpapterMeal)
		);
	}

	findByName(name: string): Observable<Meal> {
		return this.http.get<MealResponse>(`${URL_BASE}${PATH.search}?s=${name}`).pipe(
			map(adpapterMeal)
		);;
	}
}
