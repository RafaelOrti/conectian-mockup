import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  // Default route redirects to login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Auth routes
  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar Sesión | Conectian'
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component')
      .then(m => m.RegisterComponent),
    title: 'Crear Cuenta | Conectian'
  },

  // Client routes (lazy loaded)
  {
    path: 'client',
    loadChildren: () => import('./features/client/client.routes')
      .then(m => m.CLIENT_ROUTES)
  },

  // Provider routes (lazy loaded)
  {
    path: 'provider',
    loadChildren: () => import('./features/provider/provider.routes')
      .then(m => m.PROVIDER_ROUTES)
  },

  // Deal Room routes
  {
    path: 'deal-room/:id',
    loadComponent: () => import('./features/deal-room/dealroom.component')
      .then(m => m.DealRoomComponent)
  },

  // Admin routes (lazy loaded)
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
  },

  // 404 Not Found
  {
    path: '**',
    redirectTo: '/login'
  }
];
