import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';

interface LogEntry {
  time: string;
  level: 'error' | 'warning' | 'info';
  message: string;
}

interface SystemMetric {
  label: string;
  value: string;
  percentage: number;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  details: string;
}

@Component({
  selector: 'app-adminmonitoring',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    CardModule,
    ButtonModule,
    ProgressBarModule,
    TableModule,
    TagModule,
    ChipModule,
    ChartModule,
    DividerModule,
    BadgeModule
  ],
  templateUrl: './adminmonitoring.component.html',
  styleUrls: ['./adminmonitoring.component.scss']
})
export class AdminMonitoringComponent implements OnInit {
  systemStatus = 'operational';

  metrics: SystemMetric[] = [
    {
      label: 'CPU Usage',
      value: '24%',
      percentage: 24,
      status: 'good',
      trend: 'stable',
      details: '4 Cores Active'
    },
    {
      label: 'Memory',
      value: '6.2 GB',
      percentage: 78,
      status: 'warning',
      trend: 'up',
      details: 'of 8 GB Total'
    },
    {
      label: 'Disk Space',
      value: '45%',
      percentage: 45,
      status: 'good',
      trend: 'stable',
      details: '240GB Free'
    },
    {
      label: 'Response Time',
      value: '124ms',
      percentage: 85,
      status: 'good',
      trend: 'down',
      details: 'Avg last 1h'
    }
  ];

  logs: LogEntry[] = [
    { time: '10:42:15', level: 'error', message: 'Database connection timeout on replica-02' },
    { time: '10:38:22', level: 'warning', message: 'High memory usage detected in worker-04' },
    { time: '10:30:00', level: 'info', message: 'Scheduled backup completed successfully' },
    { time: '09:15:44', level: 'error', message: 'Payment gateway timeout: Stripe API' }
  ];

  activeUsers = 342;
  activeCountries = 12;
  mobilePercentage = 85;

  responseTimeChart: any;
  trafficChart: any;

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    // Response Time Chart
    this.responseTimeChart = {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      datasets: [
        {
          label: 'Response Time (ms)',
          data: [150, 120, 140, 110, 124, 115],
          fill: true,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4
        }
      ]
    };

    // Traffic Chart
    this.trafficChart = {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [
        {
          label: 'Usuarios',
          data: [320, 380, 360, 420, 450, 280, 190],
          backgroundColor: '#0d86ff',
          borderColor: '#0d86ff',
          borderWidth: 2
        }
      ]
    };
  }

  getChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#94a3b8'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#94a3b8'
          }
        }
      }
    };
  }

  refreshData(): void {
    // Simulate data refresh
    console.log('Refreshing monitoring data...');
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'danger' {
    const map: { [key: string]: 'success' | 'warning' | 'danger' } = {
      'good': 'success',
      'warning': 'warning',
      'critical': 'danger'
    };
    return map[status] || 'success';
  }

  getLogSeverity(level: string): 'danger' | 'warning' | 'info' {
    const map: { [key: string]: 'danger' | 'warning' | 'info' } = {
      'error': 'danger',
      'warning': 'warning',
      'info': 'info'
    };
    return map[level] || 'info';
  }

  getTrendIcon(trend: string): string {
    const map: { [key: string]: string } = {
      'up': 'pi pi-arrow-up',
      'down': 'pi pi-arrow-down',
      'stable': 'pi pi-minus'
    };
    return map[trend] || 'pi pi-minus';
  }

  getTrendColor(trend: string): string {
    const map: { [key: string]: string } = {
      'up': '#f59e0b',
      'down': '#10b981',
      'stable': '#94a3b8'
    };
    return map[trend] || '#94a3b8';
  }
}
