import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    CardComponent,
    ButtonComponent,
    BadgeComponent
  ],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  userRole: 'CLIENT' | 'PROVIDER' = 'PROVIDER';
  userName: string = 'Usuario';

  constructor(private route: ActivatedRoute) {}

  // KPIs adaptados según el rol
  kpis: any = {};
  pipeline: any = {};
  topCases: any[] = [];
  leadsTrend: any[] = [];

  ngOnInit(): void {
    // Determinar el rol desde la ruta
    const url = this.route.snapshot.url.join('/');
    if (url.includes('client')) {
      this.userRole = 'CLIENT';
      this.userName = 'Carlos Martínez';
    } else if (url.includes('provider')) {
      this.userRole = 'PROVIDER';
      this.userName = 'María González';
    }
    
    this.loadDataForRole();
  }

  loadDataForRole(): void {
    if (this.userRole === 'PROVIDER') {
      this.kpis = {
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

      this.pipeline = { nuevo: 12, contactado: 8, enNegociacion: 5, cerrado: 3 };

      this.topCases = [
        { title: 'Optimización de Ventas B2B', views: 1250 },
        { title: 'Chatbot de Soporte Avanzado', views: 980 },
        { title: 'Predicción de Churn de Clientes', views: 870 }
      ];

      this.leadsTrend = [
        { month: 'Mes 1', leads: 120 },
        { month: 'Mes 2', leads: 160 },
        { month: 'Mes 3', leads: 200 }
      ];
    } else {
      // KPIs para Cliente
      this.kpis = {
        proyectosActivos: 5,
        tiempoPromedio: '3.5 semanas',
        tasaExito: 78,
        casosExplorados: 145,
        casosCrecimiento: 23,
        ahorroEstimado: 125000,
        proyectosCompletados: 8,
        proveedoresContactados: 12,
        casosGuardados: 28,
        casosCompartidos: 15
      };

      this.pipeline = { 
        explorando: 8, 
        enContacto: 5, 
        enNegociacion: 3, 
        activos: 5 
      };

      this.topCases = [
        { title: 'Optimización de Cadena de Suministro', views: 45, relevance: 92 },
        { title: 'Automatización de Servicio al Cliente', views: 38, relevance: 89 },
        { title: 'Predicción de Fraude', views: 32, relevance: 95 }
      ];

      this.leadsTrend = [
        { month: 'Mes 1', casos: 45 },
        { month: 'Mes 2', casos: 68 },
        { month: 'Mes 3', casos: 92 }
      ];
    }
  }

  getPageTitle(): string {
    return this.userRole === 'PROVIDER' 
      ? 'Analítica del Proveedor' 
      : 'Analítica del Cliente';
  }

  getPageSubtitle(): string {
    return this.userRole === 'PROVIDER'
      ? 'Métricas y KPIs de tu actividad como proveedor'
      : 'Métricas y KPIs de tu actividad como cliente';
  }
}

