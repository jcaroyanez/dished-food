import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../definitions/model/categories';
import { StoreCategory } from '../definitions/model/store';

@Injectable({
	providedIn: 'root'
})
export class StoreService {
	private stateSubject = new BehaviorSubject<StoreCategory>
		({ isCategory: true, categorySelected: {} as Category }); // Puedes usar un estado inicial
	private state$ = this.stateSubject.asObservable();

	constructor() { }

	setStore(value: StoreCategory) {
		this.stateSubject.next(value);
	}

	setCategorySelected(category: Category) {
		this.stateSubject.next({ ...this.getState(), categorySelected: category })
	}

	setIsCategory(value: boolean) {
		this.stateSubject.next({ ...this.getState(), isCategory: value });
	}

	getState(): StoreCategory {
		return this.stateSubject.getValue();
	}

	getStateSuscribe() {
		return this.state$;
	}
}
