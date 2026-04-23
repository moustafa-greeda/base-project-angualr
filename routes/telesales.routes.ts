import { Routes } from '@angular/router';

export const TELESALES_ROUTES: Routes = [
  {
    path: 'telesales',
    loadComponent: () =>
      import('./../src/app/features/tele-sales-dashboard-component/tele-sales-dashboard-component').then(
        (m) => m.TeleSalesDashboardComponent,
      ),
  },
];
