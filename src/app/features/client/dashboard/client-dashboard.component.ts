import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface CaseStudy {
  id: string;
  title: string;
  provider: {
    name: string;
    logo: string;
    verified: boolean;
  };
  relevanceScore: number;
  kpis: {
    label: string;
    value: string;
    icon: string;
  }[];
  sector: string;
  tags: string[];
  featured?: boolean; // Para casos destacados/premium
}

interface FeaturedProvider {
  name: string;
  logo: string;
  verified: boolean;
}

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    CardComponent,
    BadgeComponent,
    ButtonComponent
  ],
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {
  constructor(private router: Router) {
    // Component initialization
  }

  ngOnInit(): void {
    // Load data from backend (TODO)
  }
  // Chatbot
  chatQuery: string = '';
  suggestions: string[] = [
    'Reducir fraude',
    'Automatizar ventas',
    'Optimizar logística'
  ];

  // Case Studies (Mock data) - Los primeros son casos destacados/premium
  activeTab: 'marketplace' | 'received' | 'my-requests' = 'marketplace';

  // Case Studies (Mock data) - Los primeros son casos destacados/premium
  caseStudies: CaseStudy[] = [
    // Casos destacados (proveedores destacados convertidos a casos de uso)
    {
      id: 'featured-1',
      title: 'Solución Integral de IA Empresarial',
      provider: {
        name: 'DataLogic AI',
        logo: '🤖',
        verified: true
      },
      relevanceScore: 98,
      kpis: [
        { label: 'ROI', value: '200%', icon: '💰' },
        { label: 'Eficiencia', value: '50%', icon: '⚡' }
      ],
      sector: 'Enterprise',
      tags: ['ML', 'Python', 'AWS', 'Enterprise'],
      featured: true
    },
    {
      id: 'featured-2',
      title: 'Plataforma de Automatización Inteligente',
      provider: {
        name: 'Nexus Solutions',
        logo: '⚡',
        verified: true
      },
      relevanceScore: 96,
      kpis: [
        { label: 'Ahorro', value: '35%', icon: '💰' },
        { label: 'Productividad', value: '60%', icon: '📈' }
      ],
      sector: 'Tech',
      tags: ['NLP', 'Automation', 'Azure', 'Cloud'],
      featured: true
    },
    {
      id: 'featured-3',
      title: 'Optimización Avanzada con Machine Learning',
      provider: {
        name: 'Optimizer AI',
        logo: '📊',
        verified: true
      },
      relevanceScore: 94,
      kpis: [
        { label: 'Optimización', value: '45%', icon: '📊' },
        { label: 'Precisión', value: '98%', icon: '🎯' }
      ],
      sector: 'Analytics',
      tags: ['ML', 'Data Science', 'GCP', 'Big Data'],
      featured: true
    },
    // Casos de uso regulares
    {
      id: '1',
      title: 'Optimización de Cadena de Suministro Global',
      provider: {
        name: 'DataLogic AI',
        logo: '🤖',
        verified: true
      },
      relevanceScore: 92,
      kpis: [
        { label: 'Ahorro', value: '25%', icon: '💰' },
        { label: 'Eficiencia', value: '40%', icon: '⚡' }
      ],
      sector: 'Logística',
      tags: ['Python', 'ML', 'AWS']
    },
    {
      id: '2',
      title: 'Automatización de Servicio al Cliente para E-commerce',
      provider: {
        name: 'Nexus Solutions',
        logo: '⚡',
        verified: true
      },
      relevanceScore: 89,
      kpis: [
        { label: 'Reducción', value: '25%', icon: '📉' },
        { label: 'Satisfacción', value: '40%', icon: '😊' }
      ],
      sector: 'Retail',
      tags: ['NLP', 'ChatGPT', 'Azure']
    },
    {
      id: '3',
      title: 'Predicción de Fraude en Transacciones Financieras',
      provider: {
        name: 'FinTech AI',
        logo: '🔐',
        verified: true
      },
      relevanceScore: 95,
      kpis: [
        { label: 'Precisión', value: '99%', icon: '🎯' },
        { label: 'Reducción', value: '30%', icon: '🛡️' }
      ],
      sector: 'Fintech',
      tags: ['XGBoost', 'TensorFlow', 'Python']
    },
    {
      id: '4',
      title: 'Personalización de Marketing en Tiempo Real',
      provider: {
        name: 'MarketSense',
        logo: '📈',
        verified: true
      },
      relevanceScore: 87,
      kpis: [
        { label: 'ROI', value: '150%', icon: '💵' },
        { label: 'Conversión', value: '45%', icon: '📊' }
      ],
      sector: 'Marketing',
      tags: ['Recommendation AI', 'BigQuery']
    },
    {
      id: '5',
      title: 'Análisis de Sentimiento en Redes Sociales',
      provider: {
        name: 'SocialPulse',
        logo: '💬',
        verified: true
      },
      relevanceScore: 84,
      kpis: [
        { label: 'Insights', value: '250k/día', icon: '🔍' },
        { label: 'Ahorro tiempo', value: '60%', icon: '⏱️' }
      ],
      sector: 'Marketing',
      tags: ['BERT', 'Sentiment Analysis', 'GCP']
    },
    {
      id: '6',
      title: 'Diagnóstico Médico Asistido por IA',
      provider: {
        name: 'MediTech AI',
        logo: '🏥',
        verified: true
      },
      relevanceScore: 91,
      kpis: [
        { label: 'Precisión', value: '97%', icon: '✅' },
        { label: 'Detección temprana', value: '35%', icon: '🔬' }
      ],
      sector: 'Salud',
      tags: ['Computer Vision', 'ResNet', 'HIPAA']
    }
  ];

  receivedProposals: CaseStudy[] = [
    {
      id: 'prop-1',
      title: 'Propuesta Personalizada: Automatización de Inventario',
      provider: { name: 'LogiTech Solutions', logo: '📦', verified: true },
      relevanceScore: 100,
      kpis: [{ label: 'Ahorro Est.', value: '30%', icon: '💰' }],
      sector: 'Logística',
      tags: ['Private Offer', 'Automation']
    },
    {
      id: 'prop-2',
      title: 'Propuesta: Chatbot Interno HR',
      provider: { name: 'HR Tech AI', logo: '👥', verified: false },
      relevanceScore: 95,
      kpis: [{ label: 'Eficiencia', value: '40%', icon: '⚡' }],
      sector: 'HR',
      tags: ['Private Offer', 'NLP']
    }
  ];

  myRequests: any[] = [
    {
      id: 'req-1',
      title: 'Sistema de Detección de Anomalías en Producción',
      date: '2025-10-15',
      status: 'Active',
      responses: 5,
      budget: '50k - 100k'
    },
    {
      id: 'req-2',
      title: 'Motor de Recomendación para E-commerce',
      date: '2025-09-20',
      status: 'Closed',
      responses: 12,
      budget: '20k - 50k'
    }
  ];

  // Filters
  filters = {
    sector: [] as string[],
    servicioProductoFormacion: [] as string[],
    coste: { min: 0, max: 100000 },
    tamanoMadurezProveedor: '',
    madurezUseCase: '',
    tipoIA: '',
    modalidadTecnica: [] as string[],
    intervencionHumana: false,
    stackTecnologico: [] as string[],
    integraciones: [] as string[],
    tiempoIntegracion: '',
    idiomas: [] as string[],
    tamanoEmpresa: [] as string[],
    ubicacionSoberania: '',
    regulacion: [] as string[],
    certificaciones: [] as string[],
    seguridadDatos: [] as string[]
  };

  filtersExpanded: boolean = true;
  sidebarMode: 'filters' | 'chatbot' = 'filters';

  toggleSidebarMode(): void {
    this.sidebarMode = this.sidebarMode === 'filters' ? 'chatbot' : 'filters';
  }

  onChatSubmit(): void {
    if (this.chatQuery.trim()) {
      // TODO: Integrate with chatbot API
      this.chatQuery = '';
    }
  }

  onSuggestionClick(suggestion: string): void {
    this.chatQuery = suggestion;
    this.onChatSubmit();
  }

  onCaseClick(caseStudy: CaseStudy): void {
    this.router.navigate(['/client/case', caseStudy.id]);
  }


  toggleFilters(): void {
    this.filtersExpanded = !this.filtersExpanded;
  }

  viewMyRFIDCases(): void {
    // TODO: Navigate to my cases
  }

  toggleChip(arrayName: string, value: string): void {
    const array = this.filters[arrayName as keyof typeof this.filters] as string[];
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(value);
    }
  }

  toggleArray(arrayName: string, value: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const array = this.filters[arrayName as keyof typeof this.filters] as string[];
    if (checked) {
      if (!array.includes(value)) {
        array.push(value);
      }
    } else {
      const index = array.indexOf(value);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
  }

  addToArray(arrayName: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    if (value) {
      const array = this.filters[arrayName as keyof typeof this.filters] as string[];
      if (!array.includes(value)) {
        array.push(value);
        input.value = '';
      }
    }
  }

  removeFromArray(arrayName: string, value: string): void {
    const array = this.filters[arrayName as keyof typeof this.filters] as string[];
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  clearFilters(): void {
    this.filters = {
      sector: [],
      servicioProductoFormacion: [],
      coste: { min: 0, max: 100000 },
      tamanoMadurezProveedor: '',
      madurezUseCase: '',
      tipoIA: '',
      modalidadTecnica: [],
      intervencionHumana: false,
      stackTecnologico: [],
      integraciones: [],
      tiempoIntegracion: '',
      idiomas: [],
      tamanoEmpresa: [],
      ubicacionSoberania: '',
      regulacion: [],
      certificaciones: [],
      seguridadDatos: []
    };
  }
  get featuredCases(): CaseStudy[] {
    return this.caseStudies.filter(c => c.featured);
  }

  get regularCases(): CaseStudy[] {
    return this.caseStudies.filter(c => !c.featured);
  }

  publishRFP(): void {
    this.router.navigate(['/client/publish-rfid']);
  }

  scrollToCases(): void {
    const element = document.querySelector('.cases-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
