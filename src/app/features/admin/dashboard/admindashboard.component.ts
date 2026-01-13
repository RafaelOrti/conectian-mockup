import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface Activity {
  timestamp: string;
  name: string;
  type: 'cliente' | 'proveedor';
  action: string;
}

interface PendingCase {
  id: string;
  title: string;
  submittedBy: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, BadgeComponent, ButtonComponent],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdminDashboardComponent {
  constructor(private router: Router) { }

  // KPIs
  kpis = {
    mrr: 14405,
    mrrGrowth: 23,
    totalUsers: 400,
    usersGrowth: 15,
    matches: 89,
    matchesGrowth: 34,
    churnRate: 8,
    churnChange: -2,
    nps: 52,
    npsChange: 0
  };

  // Recent Activity (Últimas 24h)
  recentActivity: Activity[] = [
    { timestamp: 'hace 2h', name: '12 nuevos usuarios', type: 'cliente', action: '8 CEOs, 4 Proveedores' },
    { timestamp: 'hace 3h', name: '23 matches exitosos', type: 'cliente', action: 'Contactos realizados' },
    { timestamp: 'hace 5h', name: '5 Deal Rooms creados', type: 'cliente', action: 'Proyectos activos' },
    { timestamp: 'hace 1d', name: '3 casos de uso', type: 'proveedor', action: 'Pending approval' }
  ];

  // Alerts
  alerts = [
    { type: 'warning', message: '2 proveedores pending approval', action: 'Revisar' },
    { type: 'error', message: '1 payment failed (retry scheduled)', action: 'Ver detalles' },
    { type: 'success', message: 'Groq API: 23% del límite usado ✅', action: null }
  ];

  // Pending Cases
  pendingCases: PendingCase[] = [
    { id: '1', title: 'NLP Sentiment Analysis for E-Commerce', submittedBy: 'TechVision AI', date: '2024-05-20', status: 'pending' },
    { id: '2', title: 'Computer Vision for Quality Control', submittedBy: 'InnovateTech', date: '2024-05-20', status: 'pending' },
    { id: '3', title: 'Generative AI for Marketing Content', submittedBy: 'CreativeAI', date: '2024-05-19', status: 'pending' },
    { id: '4', title: 'Predictive Maintenance for Manufacturing', submittedBy: 'SmartFactory', date: '2024-05-19', status: 'pending' },
    { id: '5', title: 'AI Chatbot for Customer Support', submittedBy: 'SupportBot Inc', date: '2024-05-18', status: 'pending' }
  ];


  // Case Approval Methods
  approveCase(caseItem: PendingCase): void {
    console.log('Approving case:', caseItem.title);
    caseItem.status = 'approved';
    // TODO: Call backend API
    alert(`Caso "${caseItem.title}" aprobado`);
  }

  rejectCase(caseItem: PendingCase): void {
    console.log('Rejecting case:', caseItem.title);
    caseItem.status = 'rejected';
    // TODO: Call backend API
    alert(`Caso "${caseItem.title}" rechazado`);
  }

  viewCaseDetails(caseItem: PendingCase): void {
    console.log('Viewing case details:', caseItem.id);
    // this.router.navigate(['/admin/content', caseItem.id]);
  }

  // Activity Methods
  viewActivityDetails(activity: Activity): void {
    console.log('Viewing activity:', activity);
    if (activity.type === 'cliente') {
      this.router.navigate(['/admin/users']);
    } else {
      this.router.navigate(['/admin/users']);
    }
  }

  handleAlertAction(alert: any): void {
    console.log('Alert action:', alert);
    // TODO: Implement alert actions
  }

  navigateToApprovals(): void {
    this.router.navigate(['/admin/users']);
  }

  navigateToCases(): void {
    this.router.navigate(['/admin/content']);
  }

  navigateToChurnReport(): void {
    this.router.navigate(['/admin/monitoring']);
  }

  navigateToAnalytics(): void {
    this.router.navigate(['/admin/monitoring']);
  }
}
