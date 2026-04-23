import { redirectDashboardGuard } from '../src/app/core/guard/redirectDashboard/redirect-dashboard-guard';

// ---------------- routes different users -------------------
import { TELESALES_ROUTES } from './telesales.routes';
import { SALES_ROUTES } from './sales.routes';
import { ACCOUNT_ROUTES } from './account.routes';
import { USER_ROUTES } from './user.routes';
import { ADMIN_ROUTES } from './admin.routes';
import { Routes } from '@angular/router';



import { loginGuard } from '../src/app/core/guard/login/login-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('../src/app/auth/auth').then(m => m.AuthComponent),
    canActivate: [loginGuard],
  },

  {
    path: 'dashboard',
    loadComponent: () => import('../src/app/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [redirectDashboardGuard],

    children: [
      ...ADMIN_ROUTES,
      ...USER_ROUTES,
      ...ACCOUNT_ROUTES,
      ...SALES_ROUTES,
      ...TELESALES_ROUTES,
    ],
  },
  {
    path: '**',
    loadComponent: () => import('../src/app/features/not-found/not-found').then(m => m.NotFound),
  },
];
