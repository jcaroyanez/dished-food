import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, Input, input } from '@angular/core';
import { IonContent, IonList, IonItem } from '@ionic/angular/standalone';
import { catchError, ignoreElements, Observable, of } from 'rxjs';
import { DishesCategory } from 'src/app/definitions/model/categories';
import { CategoriesService } from 'src/app/service/categories.service';
import { DisheComponent } from '../dishe/dishe.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
  standalone: true,
	imports: [
		AsyncPipe,
		JsonPipe,
		IonContent,
		DisheComponent,
		IonList,
		IonItem
	]
})
export class DishesComponent {
	router = inject(Router);
	categoryService = inject(CategoriesService);
	dishes$: Observable<DishesCategory[]> = new Observable();
	dishesError$ = this.dishes$.pipe(
		ignoreElements(),
		catchError((err) => of(err))
	);

	@Input()
	set nameCategory(value: string) {
		this.dishes$ = this.categoryService.getDishesForCategory(value);
	}

	goToDetail(id: string) {
		this.router.navigate(['/detail', id])
	}
}
