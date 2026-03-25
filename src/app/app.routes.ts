import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth';
import { redirectDashboardGuard } from './core/guard/redirectDashboard/redirect-dashboard-guard';
import { HomeAdmin } from './features/home-admin/home-admin';
import { UserDashboardComponent } from './features/user-dashboard-component/user-dashboard-component';
import { SalesDashboardComponent } from './features/sales-dashboard-component/sales-dashboard-component';
import { TeleSalesDashboardComponent } from './features/tele-sales-dashboard-component/tele-sales-dashboard-component';
import { AccountantDashboardComponent } from './features/accountant-dashboard-component/accountant-dashboard-component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFound } from './features/not-found/not-found';
import { loginGuard } from './core/guard/login/login-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [redirectDashboardGuard],

    children: [
      {
        path: 'admin',
        component: HomeAdmin,
      },
      {
        path: 'user',
        component: UserDashboardComponent,
      },
      {
        path: 'sales',
        component: SalesDashboardComponent,
      },
      {
        path: 'telesales',
        component: TeleSalesDashboardComponent,
      },
      {
        path: 'accountant',
        component: AccountantDashboardComponent,
      },
      {
        path: '**',
        component: NotFound,
      },
    ],
  },
];



