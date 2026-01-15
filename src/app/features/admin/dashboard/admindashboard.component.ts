import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { TimelineModule } from 'primeng/timeline';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';

interface Activity {
  timestamp: string;
  name: string;
  type: 'cliente' | 'proveedor';
  action: string;
  icon: string;
}

interface PendingCase {
  id: string;
  title: string;
  submittedBy: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Alert {
  type: 'warning' | 'error' | 'success' | 'info';
  severity: 'warn' | 'error' | 'success' | 'info';
  message: string;
  action: string | null;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    CardModule,
    ButtonModule,
    TagModule,
    ChartModule,
    TableModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    ProgressBarModule,
    TimelineModule,
    AvatarModule,
    BadgeModule,
    DividerModule
  ],
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  selectedPeriod: any = { label: 'Últimos 30 días', value: '30d' };
  periodOptions = [
    { label: 'Últimos 7 días', value: '7d' },
    { label: 'Últimos 30 días', value: '30d' },
    { label: 'Últimos 90 días', value: '90d' },
    { label: 'Este año', value: 'year' }
  ];

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

  // Chart data
  revenueChartData: any;
  revenueChartOptions: any;

  // Recent Activity (Últimas 24h)
  recentActivity: Activity[] = [
    { 
      timestamp: 'hace 2h', 
      name: '12 nuevos usuarios', 
      type: 'cliente', 
      action: '8 CEOs, 4 Proveedores',
      icon: 'pi-users'
    },
    { 
      timestamp: 'hace 3h', 
      name: '23 matches exitosos', 
      type: 'cliente', 
      action: 'Contactos realizados',
      icon: 'pi-check-circle'
    },
    { 
      timestamp: 'hace 5h', 
      name: '5 Deal Rooms creados', 
      type: 'cliente', 
      action: 'Proyectos activos',
      icon: 'pi-briefcase'
    },
    { 
      timestamp: 'hace 1d', 
      name: '3 casos de uso', 
      type: 'proveedor', 
      action: 'Pending approval',
      icon: 'pi-clock'
    }
  ];

  // Alerts
  alerts: Alert[] = [
    { 
      type: 'warning', 
      severity: 'warn',
      message: '2 proveedores pending approval', 
      action: 'Revisar' 
    },
    { 
      type: 'error', 
      severity: 'error',
      message: '1 payment failed (retry scheduled)', 
      action: 'Ver detalles' 
    },
    { 
      type: 'success', 
      severity: 'success',
      message: 'Groq API: 23% del límite usado ✅', 
      action: null 
    }
  ];

  // Pending Cases
  pendingCases: PendingCase[] = [
    { id: '1', title: 'NLP Sentiment Analysis for E-Commerce', submittedBy: 'TechVision AI', date: '2024-05-20', status: 'pending' },
    { id: '2', title: 'Computer Vision for Quality Control', submittedBy: 'InnovateTech', date: '2024-05-20', status: 'pending' },
    { id: '3', title: 'Generative AI for Marketing Content', submittedBy: 'CreativeAI', date: '2024-05-19', status: 'pending' },
    { id: '4', title: 'Predictive Maintenance for Manufacturing', submittedBy: 'SmartFactory', date: '2024-05-19', status: 'pending' },
    { id: '5', title: 'AI Chatbot for Customer Support', submittedBy: 'SupportBot Inc', date: '2024-05-18', status: 'pending' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initRevenueChart();
  }

  initRevenueChart(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    
    this.revenueChartData = {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'],
      datasets: [
        {
          label: 'MRR',
          data: [10200, 11500, 12800, 13500, 14405],
          fill: true,
          backgroundColor: 'rgba(13, 134, 255, 0.2)',
          borderColor: 'rgba(13, 134, 255, 1)',
          tension: 0.4
        }
      ]
    };

    this.revenueChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              return '€' + context.parsed.y.toLocaleString('es-ES');
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#a0aec0'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          }
        },
        y: {
          ticks: {
            color: '#a0aec0',
            callback: function(value: any) {
              return '€' + value.toLocaleString('es-ES');
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          }
        }
      }
    };
  }

  // Case Approval Methods
  approveCase(caseItem: PendingCase): void {
    console.log('Approving case:', caseItem.title);
    caseItem.status = 'approved';
  }

  rejectCase(caseItem: PendingCase): void {
    console.log('Rejecting case:', caseItem.title);
    caseItem.status = 'rejected';
  }

  viewCaseDetails(caseItem: PendingCase): void {
    console.log('Viewing case details:', caseItem.id);
    this.router.navigate(['/admin/content']);
  }

  // Activity Methods
  viewActivityDetails(activity: Activity): void {
    console.log('Viewing activity:', activity);
    this.router.navigate(['/admin/users']);
  }

  handleAlertAction(alert: Alert): void {
    console.log('Alert action:', alert);
    if (alert.message.includes('proveedores')) {
      this.router.navigate(['/admin/users']);
    } else if (alert.message.includes('payment')) {
      this.router.navigate(['/admin/finance']);
    }
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

  getStatusSeverity(status: string): 'success' | 'info' | 'warning' | 'danger' {
    const severityMap: { [key: string]: 'success' | 'info' | 'warning' | 'danger' } = {
      'pending': 'warning',
      'approved': 'success',
      'rejected': 'danger'
    };
    return severityMap[status] || 'info';
  }

  getTrendIcon(change: number): string {
    return change > 0 ? 'pi-arrow-up' : change < 0 ? 'pi-arrow-down' : 'pi-minus';
  }

  getTrendClass(change: number): string {
    return change > 0 ? 'trend-up' : change < 0 ? 'trend-down' : 'trend-neutral';
  }
}
