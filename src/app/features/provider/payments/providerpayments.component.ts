import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

interface Transaction {
  id: string;
  date: string;
  description: string;
  client: string;
  amount: number;
  status: 'completed' | 'pending' | 'processing';
  invoiceUrl?: string;
}

@Component({
  selector: 'app-providerpayments',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent,
    CardModule,
    ButtonModule,
    TableModule,
    TagModule,
    TooltipModule,
    ChartModule,
    DialogModule,
    InputTextModule,
    CalendarModule
  ],
  templateUrl: './providerpayments.component.html',
  styleUrls: ['./providerpayments.component.scss']
})
export class ProviderPaymentsComponent {
  @Input() showNavbar: boolean = true;

  availableBalance: number = 12450;
  pendingAmount: number = 3200;
  totalEarnings: number = 48750;

  showWithdrawDialog: boolean = false;

  transactions: Transaction[] = [
    {
      id: 'TX-8921',
      date: '12 Ene 2026',
      description: 'Pago Hito 1 - Chatbot',
      client: 'Repsol',
      amount: 5000,
      status: 'completed'
    },
    {
      id: 'TX-8915',
      date: '08 Ene 2026',
      description: 'Consultoría Inicial',
      client: 'BBVA',
      amount: 2500,
      status: 'completed'
    },
    {
      id: 'TX-8890',
      date: '02 Ene 2026',
      description: 'Pago Mensual - Mantenimiento',
      client: 'Inditex',
      amount: 1200,
      status: 'pending'
    },
    {
      id: 'TX-8850',
      date: '28 Dic 2025',
      description: 'Implementación Piloto',
      client: 'Mercadona',
      amount: 3750,
      status: 'completed'
    },
    {
      id: 'TX-8830',
      date: '20 Dic 2025',
      description: 'Desarrollo MVP',
      client: 'Telefónica',
      amount: 8500,
      status: 'completed'
    }
  ];

  chartData: any;
  chartOptions: any;

  constructor() {
    this.initializeChart();
  }

  initializeChart(): void {
    this.chartData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Ingresos Mensuales',
          data: [8500, 6200, 7800, 9500, 11200, 12450],
          backgroundColor: 'rgba(13, 134, 255, 0.2)',
          borderColor: 'rgba(13, 134, 255, 1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#9ca3af',
            callback: function(value: any) {
              return '€' + value.toLocaleString();
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          }
        },
        x: {
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          }
        }
      }
    };
  }

  formatCurrency(amount: number): string {
    return '€' + amount.toLocaleString('es-ES', { minimumFractionDigits: 2 });
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'info' {
    const severities: { [key: string]: 'success' | 'warning' | 'info' } = {
      'completed': 'success',
      'pending': 'warning',
      'processing': 'info'
    };
    return severities[status] || 'info';
  }

  openWithdrawDialog(): void {
    this.showWithdrawDialog = true;
  }

  downloadInvoice(transaction: Transaction): void {
    // Lógica para descargar factura
    console.log('Downloading invoice for', transaction.id);
  }
}
