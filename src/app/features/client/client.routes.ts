import { Routes } from '@angular/router';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'marketplace',
    pathMatch: 'full'
  },
  {
    path: 'marketplace',
    loadComponent: () => import('./dashboard/client-dashboard.component')
      .then(m => m.ClientDashboardComponent),
    title: 'Marketplace | Cliente'
  },
  {
    path: 'dashboard',
    redirectTo: 'marketplace',
    pathMatch: 'full'
  },
  {
    path: 'case/:id',
    loadComponent: () => import('./case-detail/casedetail.component')
      .then(m => m.CaseDetailComponent),
    title: 'Detalle de Caso | Cliente'
  },
  {
    path: 'projects',
    loadComponent: () => import('./project-management/clientprojectmanagement.component')
      .then(m => m.ClientProjectManagementComponent),
    title: 'Proyectos | Cliente'
  },
  {
    path: 'provider/:id',
    loadComponent: () => import('./provider-profile/providerprofile.component')
      .then(m => m.ProviderProfileComponent),
    title: 'Perfil del Proveedor | Cliente'
  },
  {
    path: 'publish-rfid',
    loadComponent: () => import('./publish-rfid/publishrfid.component')
      .then(m => m.PublishRfidComponent),
    title: 'Publicar Caso RFID | Cliente'
  },
  {
    path: 'request/:id/responses',
    loadComponent: () => import('./request-responses/request-responses.component')
      .then(m => m.RequestResponsesComponent),
    title: 'Respuestas a Solicitud | Cliente'
  },
  {
    path: 'innovation-center',
    loadComponent: () => import('./innovation-center/clientinnovationcenter.component')
      .then(m => m.ClientInnovationCenterComponent),
    title: 'Centro de Innovación | Cliente'
  },
  {
    path: 'growth-center',
    loadComponent: () => import('./growth-center/clientgrowthcenter.component')
      .then(m => m.ClientGrowthCenterComponent),
    title: 'Centro de Crecimiento | Cliente'
  },
  {
    path: 'market-analysis',
    loadComponent: () => import('./market-analysis/clientmarketanalysis.component')
      .then(m => m.ClientMarketAnalysisComponent),
    title: 'Análisis de Mercado | Cliente'
  },
  {
    path: 'notifications',
    loadComponent: () => import('./notifications/clientnotifications.component')
      .then(m => m.ClientNotificationsComponent),
    title: 'Notificaciones | Cliente'
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/clientprofile.component')
      .then(m => m.ClientProfileComponent),
    title: 'Mi Perfil | Cliente'
  },
  {
    path: 'messages',
    loadComponent: () => import('./messages/clientmessages.component')
      .then(m => m.ClientMessagesComponent),
    title: 'Mensajes | Cliente'
  },
  {
    path: 'referrals',
    loadComponent: () => import('./referrals/clientreferrals.component')
      .then(m => m.ClientReferralsComponent),
    title: 'Referidos y Networking | Cliente'
  },
  {
    path: 'payments',
    loadComponent: () => import('./payments/clientpayments.component')
      .then(m => m.ClientPaymentsComponent),
    title: 'Pagos | Cliente'
  },
  {
    path: 'company',
    loadComponent: () => import('./company/clientcompany.component')
      .then(m => m.ClientCompanyComponent),
    title: 'Mi Empresa | Cliente'
  },
  {
    path: 'badges',
    loadComponent: () => import('./badges/clientbadges.component')
      .then(m => m.ClientBadgesComponent),
    title: 'Badges y Recompensas | Cliente'
  },
  {
    path: 'analytics',
    loadComponent: () => import('../shared/analytics/analytics.component')
      .then(m => m.AnalyticsComponent),
    title: 'Analítica | Cliente'
  },
  {
    path: 'profile-hub',
    loadComponent: () => import('./profile-hub/clientprofilehub.component')
      .then(m => m.ClientProfileHubComponent),
    title: 'Mi Cuenta | Cliente'
  },
  {
    path: 'ecosystem',
    loadComponent: () => import('./ecosystem/clientecosystem.component')
      .then(m => m.ClientEcosystemComponent),
    title: 'Ecosistema | Cliente'
  },
  {
    path: 'deal-room/:id',
    loadComponent: () => import('./deal-room/client-deal-room.component')
      .then(m => m.ClientDealRoomComponent),
    title: 'Deal Room | Cliente'
  }
];
