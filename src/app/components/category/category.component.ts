import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { IonCard, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { Category } from '../../definitions/model/categories';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
	standalone: true,
	imports: [
		NgOptimizedImage,
		IonCard,
		IonGrid,
		IonCol,
		IonRow,
		NgClass
	]
})
export class CategoryComponent {
	category = input.required<Category>();
	categoryStore = input.required<string>();
	sendCategory = output<Category>();
}
