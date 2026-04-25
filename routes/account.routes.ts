import { Routes } from "@angular/router";

export const ACCOUNT_ROUTES: Routes = [
  {
    path: 'accountant',
    loadComponent: () => import('./../src/app/features/accountant-dashboard-component/accountant-dashboard-component').then((m)=> m.AccountantDashboardComponent),
  },
];