import { Routes } from '@angular/router';

export const SALES_ROUTES: Routes = [
  {
    path: 'sales',
    loadComponent: () =>
      import('./../src/app/features/sales-dashboard-component/sales-dashboard-component').then(
        (m) => m.SalesDashboardComponent,
      ),
  },
];
