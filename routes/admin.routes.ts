import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./../src/app/features/home-admin/home-admin').then((m) => m.HomeAdmin),
    pathMatch: 'full',
  },
  {
    path: 'table',
    loadComponent: () => import('./../src/app/features/table/tasks').then((m) => m.Tasks),
  },
  {
    path: 'loader',
    loadComponent: () => import('./../src/app/features/loader/loader').then((m) => m.Loader),
  },
  {
    path: 'button',
    loadComponent: () => import('./../src/app/features/buttons/buttons').then((m) => m.Buttons),
  },
];
