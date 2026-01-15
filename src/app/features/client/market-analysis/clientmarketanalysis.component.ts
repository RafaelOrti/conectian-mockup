import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientmarketanalysis',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    CardModule,
    ButtonModule,
    DropdownModule,
    ChartModule,
    ProgressBarModule,
    FormsModule
  ],
  templateUrl: './clientmarketanalysis.component.html',
  styleUrls: ['./clientmarketanalysis.component.scss']
})
export class ClientMarketAnalysisComponent {
  @Input() showNavbar: boolean = true;

  periods = [
    { label: 'Últimos 30 días', value: '30d' },
    { label: 'Este Trimestre', value: 'quarter' },
    { label: 'Este Año', value: 'year' }
  ];

  selectedPeriod: string = '30d';

  chartData: any;
  chartOptions: any;

  constructor() {
    this.initChart();
  }

  initChart() {
    this.chartData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Sector Retail',
          data: [65, 59, 80, 81, 56, 55],
          fill: false,
          borderColor: '#0d86ff',
          tension: 0.4
        },
        {
          label: 'Promedio Mercado',
          data: [28, 48, 40, 19, 86, 27],
          fill: false,
          borderColor: '#6b5cf0',
          borderDash: [5, 5],
          tension: 0.4
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#a0aec0'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#a0aec0'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        y: {
          ticks: {
            color: '#a0aec0'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    };
  }
}


