import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/admindashboard.component')
      .then(m => m.AdminDashboardComponent),
    title: 'Dashboard | Admin'
  },
  {
    path: 'users',
    loadComponent: () => import('./users/adminusers.component')
      .then(m => m.AdminUsersComponent),
    title: 'Usuarios | Admin'
  },
  {
    path: 'content',
    loadComponent: () => import('./content/admincontent.component')
      .then(m => m.AdminContentComponent),
    title: 'Gestión de Contenido | Admin'
  },
  {
    path: 'finance',
    loadComponent: () => import('./finance/adminfinance.component')
      .then(m => m.AdminFinanceComponent),
    title: 'Finanzas | Admin'
  },
  {
    path: 'config',
    loadComponent: () => import('./config/adminconfig.component')
      .then(m => m.AdminConfigComponent),
    title: 'Configuración | Admin'
  },
  {
    path: 'monitoring',
    loadComponent: () => import('./monitoring/adminmonitoring.component')
      .then(m => m.AdminMonitoringComponent),
    title: 'Monitoreo | Admin'
  }
];
