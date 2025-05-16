import type { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthLayoutComponent } from './layout/auth/auth-layout.component';

export const routes: Routes = [
  {
    path: 'superadmin',
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./superadmin/dashboard/superadmin-dashboard.component').then(
            (m) => m.SuperadminDashboardComponent
          ),
      },
    ],
  },
  {
    path: 'superadmin',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
