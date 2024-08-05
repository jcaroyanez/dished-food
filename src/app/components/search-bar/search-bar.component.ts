import { Component } from '@angular/core';
import { IonHeader, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
	imports: [
		IonHeader,
		IonToolbar
	]
})
export class SearchBarComponent {
  constructor() { }
}
