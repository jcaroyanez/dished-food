import { JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonContent, IonHeader, IonTabBar, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesComponent } from 'src/app/components/categories/categories.component';
import { DishesComponent } from 'src/app/components/dishes/dishes.component';
import { InputSearchComponent } from 'src/app/components/input-search/input-search.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { Category } from 'src/app/definitions/model/categories';
import { StoreCategory } from 'src/app/definitions/model/store';
import { DishesService } from 'src/app/service/dishes.service';
import { StoreService } from 'src/app/store/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
	standalone: true,
	imports: [
		IonHeader,
		IonTabBar,
		IonContent,
		IonTitle,
		IonToolbar,
		CategoriesComponent,
		SearchBarComponent,
		InputSearchComponent,
		DishesComponent,
		JsonPipe,
		IonButton
	],
})
export class HomePage implements OnInit, OnDestroy {
	@ViewChild(InputSearchComponent) inputSearch!: InputSearchComponent;
	router = inject(Router)
	storeService = inject(StoreService);
	categoryStore = inject(StoreService);
	dishesService = inject(DishesService);
	toastController = inject(ToastController);
	storeValue: StoreCategory = { isCategory: true, categorySelected: {} as Category};
	name = '';
	onDestroy$: Subject<void> = new Subject();

	async showToasEmptySearch() {
		const toast = await this.toastController.create({
      message: 'There is no plate related to this search',
      duration: 2000,
      position: 'middle',
			color: 'warning'
    });
    await toast.present();
	}

	getMealForName(name: string) {
		this.dishesService.findByName(name).subscribe((response) => {
			if(Object.keys(response).length) {
				this.router.navigate(['detail', response.idMeal]);
			} else {
				this.showToasEmptySearch();
			}
		});
	}

  onChange(text: string) {
		this.name = text;
		this.storeService.setIsCategory(false);
		this.getMealForName(text);
	} 

	findByCategory() {
		this.storeService.setStore({ isCategory: true, categorySelected: {} as Category})
		this.clear();
	}

	clear() {
		this.inputSearch.clearInput();
	}

	ngOnInit() {
		this.categoryStore.getStateSuscribe()
		.pipe(takeUntil(this.onDestroy$))
		.subscribe((state) => {
			this.storeValue = state;
		})
	}

	ngOnDestroy() {
		this.onDestroy$.next();
    this.onDestroy$.complete();
	}
}
