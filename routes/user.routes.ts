import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: 'user',
    loadComponent: () =>
      import('./../src/app/features/user-dashboard-component/user-dashboard-component').then(
        (m) => m.UserDashboardComponent,
      ),
  },
];

