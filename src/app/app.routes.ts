import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./page/home/home.page').then((c) => c.HomePage)
	},
	{
		path: 'detail/:id',
		loadComponent: () => import('./page/detail/detail.page').then((c) => c.DetailPage)
	}
];
