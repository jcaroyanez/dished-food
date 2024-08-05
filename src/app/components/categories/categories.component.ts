import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { catchError, ignoreElements, of } from 'rxjs';
import { CategoriesService } from 'src/app/service/categories.service';
import { CategoryComponent } from '../category/category.component';
import { IonSegment } from '@ionic/angular/standalone';
import { StoreService } from 'src/app/store/store.service';
import { Category } from 'src/app/definitions/model/categories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
	standalone: true,
	imports: [
		IonContent,
		AsyncPipe,
		JsonPipe,
		CategoryComponent,
		IonSegment,
	]
})
export class CategoriesComponent {
	storeService = inject(StoreService);
	categorySelected$ = this.storeService.getStateSuscribe();
	categoiresService = inject(CategoriesService);
	categories$ = this.categoiresService.getCategories();
	categoriError$ = this.categories$.pipe(
		ignoreElements(),
		catchError((err) => of(err))
	);

	getCategory(category: Category) {
		this.storeService.setCategorySelected(category);
	}
}
