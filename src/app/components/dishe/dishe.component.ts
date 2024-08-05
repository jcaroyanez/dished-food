import { Component, input} from '@angular/core';
import { DishesCategory } from '../../definitions/model/categories';

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
