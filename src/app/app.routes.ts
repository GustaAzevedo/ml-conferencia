import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./domains/dashboard/pages/dashboard-page.component').then((m) => m.DashboardPageComponent)
	},
	{
		path: 'importacao',
		loadComponent: () =>
			import('./domains/conference/pages/import-page/import-page.component').then((m) => m.ImportPageComponent)
	},
	{
		path: 'scanner',
		loadComponent: () =>
			import('./domains/conference/pages/scanner-page/scanner-page.component').then((m) => m.ScannerPageComponent)
	},
	{ path: '**', redirectTo: '' }
];
