import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonFab, IonFabButton, IonButton } from '@ionic/angular/standalone';
import { DishesService } from 'src/app/service/dishes.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, ignoreElements, of } from 'rxjs';
import { MealComponent } from 'src/app/components/meal/meal.component';
import { arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.page.html',
	styleUrls: ['./detail.page.scss'],
	standalone: true,
	imports: [
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar,
		CommonModule,
		FormsModule,
		AsyncPipe,
		JsonPipe,
		MealComponent,
		IonIcon,
		IonFab,
		IonFabButton,
		IonButton
	]
})
export class DetailPage {
	navController = inject(NavController);
	activateRouter = inject(ActivatedRoute);
	dishesService = inject(DishesService);
	detail$ = this.dishesService.getDetail(this.activateRouter.snapshot.params['id']);
	detailError$ = this.detail$.pipe(
		ignoreElements(),
		catchError((err) => of(err))
	);

	constructor() {
		addIcons({ arrowBackOutline });
	}

	goToback() {
		this.navController.back();
	}
}
