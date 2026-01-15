import { Routes } from '@angular/router';

export const PROVIDER_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'marketplace',
    pathMatch: 'full'
  },
  {
    path: 'marketplace',
    loadComponent: () => import('./company-marketplace/companymarketplace.component')
      .then(m => m.CompanyMarketplaceComponent),
    title: 'Marketplace de Empresas | Proveedor'
  },
  {
    path: 'analytics',
    loadComponent: () => import('./dashboard/providerdashboard.component')
      .then(m => m.ProviderDashboardComponent),
    title: 'Analytics | Proveedor'
  },
  {
    path: 'dashboard',
    redirectTo: 'analytics',
    pathMatch: 'full'
  },
  {
    path: 'cases',
    loadComponent: () => import('./case-management/casemanagement.component')
      .then(m => m.CaseManagementComponent),
    title: 'Gestionar Casos | Proveedor'
  },
  {
    path: 'publish-case',
    loadComponent: () => import('./publish-case/providerpublishcase.component')
      .then(m => m.ProviderPublishCaseComponent),
    title: 'Publicar Caso de Uso | Proveedor'
  },
  {
    path: 'innovation-center',
    loadComponent: () => import('./innovation-center/providerinnovationcenter.component')
      .then(m => m.ProviderInnovationCenterComponent),
    title: 'Centro de Innovación | Proveedor'
  },
  {
    path: 'growth-center',
    loadComponent: () => import('./growth-center/growthcenter.component')
      .then(m => m.GrowthCenterComponent),
    title: 'Centro de Crecimiento | Proveedor'
  },
  {
    path: 'market-analysis',
    loadComponent: () => import('./market-analysis/marketanalysis.component')
      .then(m => m.MarketAnalysisComponent),
    title: 'Análisis de Mercado | Proveedor'
  },
  {
    path: 'leads',
    loadComponent: () => import('./leads-crm/leadscrm.component')
      .then(m => m.LeadsCrmComponent),
    title: 'Leads CRM | Proveedor'
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/providernotifications.component')
      .then(m => m.ProviderNotificationsComponent),
    title: 'Notificaciones | Proveedor'
  },
  {
    path: 'project-management',
    loadComponent: () => import('./project-management/providerprojectmanagement.component')
      .then(m => m.ProviderProjectManagementComponent),
    title: 'Gestión de Proyectos | Proveedor'
  },
  {
    path: 'projects',
    redirectTo: 'project-management',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/providerprofile.component')
      .then(m => m.ProviderProfileComponent),
    title: 'Mi Perfil | Proveedor'
  },
  {
    path: 'messages',
    loadComponent: () => import('./messages/providermessages.component')
      .then(m => m.ProviderMessagesComponent),
    title: 'Mensajes | Proveedor'
  },
  {
    path: 'referrals',
    loadComponent: () => import('./referrals/providerreferrals.component')
      .then(m => m.ProviderReferralsComponent),
    title: 'Referidos y Networking | Proveedor'
  },
  {
    path: 'payments',
    loadComponent: () => import('./payments/providerpayments.component')
      .then(m => m.ProviderPaymentsComponent),
    title: 'Pagos | Proveedor'
  },
  {
    path: 'company',
    loadComponent: () => import('./company/providercompany.component')
      .then(m => m.ProviderCompanyComponent),
    title: 'Mi Empresa | Proveedor'
  },
  {
    path: 'badges',
    loadComponent: () => import('./badges/providerbadges.component')
      .then(m => m.ProviderBadgesComponent),
    title: 'Badges y Recompensas | Proveedor'
  },
  {
    path: 'profile-hub',
    loadComponent: () => import('./profile-hub/providerprofilehub.component')
      .then(m => m.ProviderProfileHubComponent),
    title: 'Mi Cuenta | Proveedor'
  },
  {
    path: 'ecosystem',
    loadComponent: () => import('./ecosystem/providerecosystem.component')
      .then(m => m.ProviderEcosystemComponent),
    title: 'Ecosistema | Proveedor'
  },
  {
    path: 'deal-room/:id',
    loadComponent: () => import('./deal-room/provider-deal-room.component')
      .then(m => m.ProviderDealRoomComponent),
    title: 'Deal Room | Proveedor'
  }
];
