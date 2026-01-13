import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-provider-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent, BadgeComponent],
  templateUrl: './providerdashboard.component.html',
  styleUrls: ['./providerdashboard.component.scss']
})
export class ProviderDashboardComponent implements OnInit {
  kpis = {
    leadsActive: 25,
    responseTime: '1.2h',
    conversionRate: 22,
    visibilityViews: 2340,
    visibilityGrowth: 15,
    revenueInPipeline: 45000,
    dealsClosedThisMonth: 3,
    leadScoreA: 60,
    leadScoreB: 25,
    leadScoreC: 15,
    leadsTrendGrowth: 67
  };

  pipeline = { nuevo: 12, contactado: 8, enNegociacion: 5, cerrado: 3 };

  topCases = [
    { title: 'Optimización de Ventas B2B', views: 1250 },
    { title: 'Chatbot de Soporte Avanzado', views: 980 },
    { title: 'Predicción de Churn de Clientes', views: 870 }
  ];

  leadsTrend = [
    { month: 'Mes 1', leads: 120 },
    { month: 'Mes 2', leads: 160 },
    { month: 'Mes 3', leads: 200 }
  ];

  ngOnInit(): void { }
}
