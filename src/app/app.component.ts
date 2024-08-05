import { Component } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { StoreService } from './store/store.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
	standalone: true,
	imports: [
		IonRouterOutlet
	],
	providers: [
		StoreService
	]
})
export class AppComponent {
  constructor() {}
}
