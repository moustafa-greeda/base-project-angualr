import { Routes } from '@angular/router';

import { authGuard } from '../src/app/core/guard/auth/auth-guard';
import { loginGuard } from '../src/app/core/guard/login/login-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('../src/app/auth/auth').then((m) => m.AuthComponent),
    canActivate: [loginGuard],
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('../src/app/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],

    children: [
      // ─── available to every role ──────────────────────────────
      {
        path: 'profile',
        loadComponent: () => import('../src/app/features/profile/profile').then((m) => m.Profile),
      },

      // ─── role landing pages ───────────────────────────────────
      {
        path: 'admin',
        pathMatch: 'full',
        loadComponent: () =>
          import('../src/app/features/home-admin/home-admin').then((m) => m.HomeAdmin),
      },
      // TODO: hr / legal / finance / operation get their own dashboards later;
      // for now every role lands on the shared admin dashboard.
      {
        path: 'hr',
        loadComponent: () =>
          import('../src/app/features/home-admin/home-admin').then((m) => m.HomeAdmin),
      },
      {
        path: 'legal',
        loadComponent: () =>
          import('../src/app/features/home-admin/home-admin').then((m) => m.HomeAdmin),
      },
      {
        path: 'finance',
        loadComponent: () =>
          import('../src/app/features/home-admin/home-admin').then((m) => m.HomeAdmin),
      },
      {
        path: 'operation',
        loadComponent: () =>
          import('../src/app/features/home-admin/home-admin').then((m) => m.HomeAdmin),
      },

      // ─── access control ───────────────────────────────────────
      {
        path: 'roles',
        loadComponent: () => import('../src/app/features/roles/roles').then((m) => m.Roles),
      },
      {
        path: 'roles/:id/permissions',
        loadComponent: () =>
          import('../src/app/features/roles/role-permissions/role-permissions').then(
            (m) => m.RolePermissions,
          ),
      },
      {
        path: 'permissions',
        loadComponent: () =>
          import('../src/app/features/permissions/permissions').then((m) => m.Permissions),
      },

      // ─── design system showcase ───────────────────────────────
      {
        path: 'table',
        loadComponent: () => import('../src/app/features/table/tasks').then((m) => m.Tasks),
      },
      {
        path: 'button',
        loadComponent: () => import('../src/app/features/buttons/buttons').then((m) => m.Buttons),
      },
      {
        path: 'forms',
        loadComponent: () =>
          import('../src/app/features/forms/forms').then((m) => m.FormsShowcase),
      },
      {
        path: 'loader',
        loadComponent: () => import('../src/app/features/loader/loader').then((m) => m.Loader),
      },
      {
        path: 'cards',
        loadComponent: () => import('../src/app/features/cards/cards').then((m) => m.Cards),
      },
      {
        path: 'feedback',
        loadComponent: () =>
          import('../src/app/features/feedback/feedback').then((m) => m.Feedback),
      },
      {
        path: 'i18n',
        loadComponent: () =>
          import('../src/app/features/i18n-test/i18n-test').then((m) => m.I18nTest),
      },
      {
        path: 'errors',
        loadComponent: () =>
          import('../src/app/features/errors-showcase/errors-showcase').then(
            (m) => m.ErrorsShowcase,
          ),
      },
    ],
  },

  {
    path: 'not-authorized',
    loadComponent: () =>
      import('../src/app/features/not-authorized/not-authorized').then((m) => m.NotAuthorized),
  },
  {
    path: '**',
    loadComponent: () => import('../src/app/features/not-found/not-found').then((m) => m.NotFound),
  },
];
