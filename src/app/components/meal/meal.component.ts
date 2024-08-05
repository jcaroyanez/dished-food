import { Component, input } from '@angular/core';
import { IonCard, IonCardTitle, IonCardSubtitle, IonAccordion, IonItem, IonLabel, IonAccordionGroup } from '@ionic/angular/standalone';
import { Meal } from '../../definitions/model/dishes';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
  standalone: true,
	imports: [
		IonCard,
		IonCardTitle,
		IonCardSubtitle,
		IonAccordion,
		IonItem,
		IonLabel,
		IonAccordionGroup
	]
})
export class MealComponent {
	meal = input.required<Meal>();
}
