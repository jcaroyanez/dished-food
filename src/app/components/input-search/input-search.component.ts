import { Component, output, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  standalone: true,
	imports: [IonSearchbar]
})
export class InputSearchComponent {
	@ViewChild(IonSearchbar) ionSearchBar!: IonSearchbar;
	onChange = output<string>();

	handleChange(value: string) {
		this.onChange.emit(value);
	}

	clearInput() {
		this.ionSearchBar.value = null;
	}
}
