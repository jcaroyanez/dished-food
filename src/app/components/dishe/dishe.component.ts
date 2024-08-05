import { Component, input, OnInit } from '@angular/core';
import { DishesCategory } from 'src/app/definitions/model/categories';

@Component({
  selector: 'app-dishe',
  templateUrl: './dishe.component.html',
  styleUrls: ['./dishe.component.scss'],
  standalone: true,
})
export class DisheComponent {
	dishe = input.required<DishesCategory>();

  constructor() { }
}
