import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';

interface ProviderResponse {
  id: string;
  provider: {
    name: string;
    logo: string;
    verified: boolean;
    rating: number;
    expertise: string[];
  };
  proposal: {
    title: string;
    description: string;
    approach: string;
    timeline: string;
    budget: string;
  };
  kpis: {
    label: string;
    value: string;
    icon: string;
  }[];
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'accepted' | 'rejected';
  matchScore: number;
}

interface RequestDetail {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  budget: string;
  sector: string;
  requirements: string[];
  responses: ProviderResponse[];
}

@Component({
  selector: 'app-request-responses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    ButtonModule,
    TagModule,
    BadgeModule,
    RatingModule,
    DropdownModule,
    TooltipModule,
    CardModule
  ],
  templateUrl: './request-responses.component.html',
  styleUrls: ['./request-responses.component.scss']
})
export class RequestResponsesComponent implements OnInit {
  requestId: string = '';
  statusFilter: string = 'all';

  sortOptions = [
    { label: 'Mayor coincidencia', value: 'match' },
    { label: 'Más recientes', value: 'date' },
    { label: 'Menor presupuesto', value: 'budget_asc' },
    { label: 'Mayor presupuesto', value: 'budget_desc' }
  ];

  selectedSort: string = 'match';

  request: RequestDetail = {
    id: 'req-1',
    title: 'Sistema de Detección de Anomalías en Producción',
    description: 'Buscamos una solución de IA capaz de detectar anomalías en tiempo real en nuestra línea de producción manufacturera. El sistema debe integrarse con nuestros sensores IoT existentes y proporcionar alertas predictivas para reducir el tiempo de inactividad.',
    date: '2025-10-15',
    status: 'Active',
    budget: '50k - 100k',
    sector: 'Manufactura',
    requirements: ['Python', 'TensorFlow', 'IoT Integration', 'Real-time Processing'],
    responses: [
      {
        id: 'resp-1',
        provider: {
          name: 'DataLogic AI',
          logo: 'assets/images/companies/tech-company.png',
          verified: true,
          rating: 4.9,
          expertise: ['Machine Learning', 'IoT', 'Manufacturing']
        },
        proposal: {
          title: 'Plataforma Predictiva de Anomalías ML',
          description: 'Nuestra solución utiliza algoritmos de aprendizaje profundo para detectar patrones anómalos en los datos de sensores, con una precisión del 99.2% en entornos similares.',
          approach: 'Implementación en 3 fases con piloto inicial',
          timeline: '3-4 meses',
          budget: '75.000€'
        },
        kpis: [
          { label: 'Precisión', value: '99.2%', icon: '🎯' },
          { label: 'Reducción', value: '40%', icon: '📉' }
        ],
        submittedAt: '2025-10-18',
        status: 'shortlisted',
        matchScore: 96
      },
      {
        id: 'resp-2',
        provider: {
          name: 'Industrial AI Solutions',
          logo: 'assets/images/companies/enterprise.png',
          verified: true,
          rating: 4.7,
          expertise: ['Computer Vision', 'Edge Computing', 'Industry 4.0']
        },
        proposal: {
          title: 'Sistema de Visión Industrial con Edge AI',
          description: 'Combinamos visión por computadora con procesamiento edge para detectar defectos y anomalías directamente en la línea de producción.',
          approach: 'Instalación hardware + software integrado',
          timeline: '4-5 meses',
          budget: '85.000€'
        },
        kpis: [
          { label: 'Tiempo Real', value: '<50ms', icon: '⚡' },
          { label: 'ROI', value: '180%', icon: '💰' }
        ],
        submittedAt: '2025-10-19',
        status: 'pending',
        matchScore: 89
      },
      {
        id: 'resp-3',
        provider: {
          name: 'SmartFactory Tech',
          logo: 'assets/images/companies/startup.png',
          verified: false,
          rating: 4.5,
          expertise: ['Predictive Maintenance', 'Data Analytics', 'Python']
        },
        proposal: {
          title: 'Mantenimiento Predictivo con IA',
          description: 'Solución cloud-native para análisis predictivo de fallos en maquinaria industrial, con dashboard intuitivo y alertas automatizadas.',
          approach: 'SaaS con integración API',
          timeline: '2-3 meses',
          budget: '55.000€'
        },
        kpis: [
          { label: 'Ahorro', value: '35%', icon: '💵' },
          { label: 'Uptime', value: '99.5%', icon: '⬆️' }
        ],
        submittedAt: '2025-10-20',
        status: 'pending',
        matchScore: 82
      },
      {
        id: 'resp-4',
        provider: {
          name: 'Nexus Analytics',
          logo: 'assets/images/companies/fintech.png',
          verified: true,
          rating: 4.8,
          expertise: ['Deep Learning', 'Time Series', 'Anomaly Detection']
        },
        proposal: {
          title: 'Motor de Detección de Anomalías Avanzado',
          description: 'Utilizamos redes neuronales LSTM especializadas en series temporales para identificar patrones anómalos con alta precisión.',
          approach: 'Modelo custom entrenado con sus datos',
          timeline: '3 meses',
          budget: '68.000€'
        },
        kpis: [
          { label: 'Falsos +', value: '<2%', icon: '✅' },
          { label: 'Cobertura', value: '100%', icon: '📊' }
        ],
        submittedAt: '2025-10-21',
        status: 'reviewed',
        matchScore: 91
      },
      {
        id: 'resp-5',
        provider: {
          name: 'TechVision Labs',
          logo: 'assets/images/companies/tech-company.png',
          verified: true,
          rating: 4.6,
          expertise: ['AutoML', 'Cloud Solutions', 'AWS']
        },
        proposal: {
          title: 'AutoML para Detección Industrial',
          description: 'Plataforma automatizada que entrena y despliega modelos de detección sin necesidad de data scientists dedicados.',
          approach: 'Plataforma SaaS con soporte dedicado',
          timeline: '2 meses',
          budget: '45.000€'
        },
        kpis: [
          { label: 'Setup', value: '2 sem', icon: '🚀' },
          { label: 'Escalable', value: '∞', icon: '📈' }
        ],
        submittedAt: '2025-10-22',
        status: 'pending',
        matchScore: 78
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    // TODO: Load request data from backend
  }

  get filteredResponses(): ProviderResponse[] {
    let responses = this.request.responses;

    // Filter
    if (this.statusFilter !== 'all') {
      responses = responses.filter(r => r.status === this.statusFilter);
    }

    // Sort
    return responses.sort((a, b) => {
      if (this.selectedSort === 'match') return b.matchScore - a.matchScore;
      if (this.selectedSort === 'date') return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      // Simple budget sort (assuming numeric values for demo)
      return 0;
    });
  }

  get shortlistedCount(): number {
    return this.request.responses.filter(r => r.status === 'shortlisted').length;
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      pending: 'Pendiente',
      reviewed: 'Revisado',
      shortlisted: 'Preseleccionado',
      accepted: 'Aceptado',
      rejected: 'Rechazado'
    };
    return labels[status] || status;
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | undefined {
    switch (status) {
      case 'shortlisted': return 'success';
      case 'reviewed': return 'info';
      case 'pending': return 'warning';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  }

  getScoreClass(score: number): string {
    if (score >= 90) return 'high';
    if (score >= 75) return 'medium';
    return 'low';
  }

  goBack(): void {
    this.router.navigate(['/client/marketplace'], {
      queryParams: { tab: 'my-requests' }
    });
  }

  viewProviderProfile(response: ProviderResponse): void {
    console.log('View provider:', response.provider.name);
  }

  viewFullProposal(response: ProviderResponse): void {
    console.log('View proposal:', response.id);
  }

  shortlistProvider(response: ProviderResponse): void {
    response.status = 'shortlisted';
  }

  startDealRoom(response: ProviderResponse): void {
    this.router.navigate(['/client/deal-room', response.id]);
  }
}
