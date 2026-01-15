import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

// PrimeNG Imports
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';

interface Company {
  id: string;
  name: string;
  logo: string;
  image: string;
  sector: string;
  innovationLevel: 'ALTO' | 'MEDIO' | 'BAJO';
  cloud: string;
  technologies: string[];
  annualRevenue?: string;
  employees?: string;
  location: string;
  tags: string[];
  rfpCount?: number;
}

@Component({
  selector: 'app-companymarketplace',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    CardComponent,
    ButtonComponent,
    BadgeComponent,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    AccordionModule,
    SliderModule
  ],
  templateUrl: './companymarketplace.component.html',
  styleUrls: ['./companymarketplace.component.scss']
})
export class CompanyMarketplaceComponent implements OnInit {
  activeTab: 'companies' | 'rfps' | 'use-cases' = 'companies';
  searchQuery: string = '';
  sortBy: string = 'relevancia';

  // Filters
  selectedSectors: string[] = [];
  selectedCompanySizes: string[] = [];
  selectedTechnologies: string[] = [];
  minRevenue: number | null = null;
  maxRevenue: number | null = null;
  revenueRange: number[] = [0, 100]; // For slider if needed

  companies: Company[] = [];
  filteredCompanies: Company[] = [];

  // Use Cases Data
  useCases = [
    {
      id: '1',
      title: 'Solución Integral de IA Empresarial',
      image: 'assets/images/use-cases/analytics.png',
      provider: { name: 'DataLogic AI', logo: 'assets/images/companies/tech-company.png', verified: true },
      relevanceScore: 98,
      featured: true,
      kpis: [
        { label: 'ROI', value: '200%' },
        { label: 'EFICIENCIA', value: '50%' }
      ],
      tags: ['ML', 'Python', 'AWS', 'Enterprise']
    },
    {
      id: '2',
      title: 'Plataforma de Automatización Inteligente',
      image: 'assets/images/use-cases/automation.png',
      provider: { name: 'Nexus Solutions', logo: 'assets/images/companies/startup.png', verified: true },
      relevanceScore: 96,
      featured: true,
      kpis: [
        { label: 'AHORRO', value: '35%' },
        { label: 'PRODUCTIVIDAD', value: '60%' }
      ],
      tags: ['NLP', 'Automation', 'Azure', 'Cloud']
    },
    {
      id: '3',
      title: 'Optimización Avanzada con Machine Learning',
      image: 'assets/images/use-cases/analytics.png',
      provider: { name: 'Optimizer AI', logo: 'assets/images/companies/enterprise.png', verified: false },
      relevanceScore: 94,
      featured: true,
      kpis: [
        { label: 'OPTIMIZACIÓN', value: '45%' },
        { label: 'PRECISIÓN', value: '98%' }
      ],
      tags: ['ML', 'Data Science', 'GCP', 'Big Data']
    },
    {
      id: '4',
      title: 'Optimización de Cadena de Suministro Global',
      image: 'assets/images/use-cases/supply-chain.png',
      provider: { name: 'DataLogic AI', logo: 'assets/images/companies/tech-company.png', verified: true },
      relevanceScore: 92,
      featured: false,
      kpis: [
        { label: 'AHORRO', value: '25%' },
        { label: 'EFICIENCIA', value: '40%' }
      ],
      tags: ['Python', 'ML', 'AWS']
    }
  ];

  // Available filter options
  sectors = [
    'Retail', 'Banca', 'Salud', 'Manufactura', 'Logística',
    'Energía', 'Telecomunicaciones', 'Tecnología', 'Automoción'
  ];

  companySizes = [
    { value: 'startup', label: 'Startup' },
    { value: 'pyme', label: 'Pyme' },
    { value: 'enterprise', label: 'Corporate/Enterprise' }
  ];

  technologies = [
    'SAP', 'Microsoft', 'Salesforce', 'Azure', 'AWS',
    'Oracle', 'Google Cloud', 'IBM', 'Pamis'
  ];

  // Proposal handling
  activeProposalCompanyId: string | null = null;
  proposalData = {
    useCase: '',
    engagement: '24%',
    users: 2000
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    // TODO: Load from API
    this.companies = [
      {
        id: '1',
        name: 'MERCADONA',
        logo: '🛒',
        image: 'assets/images/companies/enterprise.png',
        sector: 'Retail',
        innovationLevel: 'ALTO',
        cloud: 'Azure',
        technologies: ['SAP', 'Azure', 'Microsoft'],
        annualRevenue: '>€25B',
        employees: '90,000+',
        location: 'Valencia, España',
        tags: ['Fortune-100', 'Seeking Innovation Partner'],
        rfpCount: 3
      },
      {
        id: '2',
        name: 'HP Enterprise',
        logo: '💻',
        image: 'assets/images/companies/tech-company.png',
        sector: 'Tecnología',
        innovationLevel: 'ALTO',
        cloud: 'Azure',
        technologies: ['SAP', 'Microsoft', 'Azure'],
        annualRevenue: '>$3B USD',
        employees: '30,000+',
        location: 'Global',
        tags: ['Fortune-100', 'Seeking Innovation Partner'],
        rfpCount: 5
      },
      {
        id: '3',
        name: 'Banco Santander',
        logo: '🏦',
        image: 'assets/images/companies/fintech.png',
        sector: 'Banca',
        innovationLevel: 'ALTO',
        cloud: 'Azure',
        technologies: ['SAP', 'Azure', 'Salesforce'],
        annualRevenue: '>€50B',
        employees: '200,000+',
        location: 'Madrid, España',
        tags: ['Fortune-100'],
        rfpCount: 2
      },
      {
        id: '4',
        name: 'Asistente RRHH Pro',
        logo: '💬',
        image: 'assets/images/companies/startup.png',
        sector: 'HR',
        innovationLevel: 'ALTO',
        cloud: 'AWS',
        technologies: ['Salesforce', 'AWS'],
        annualRevenue: '€500M-1B',
        employees: '5,000+',
        location: 'Barcelona, España',
        tags: ['Innovation Leader'],
        rfpCount: 1
      },
      {
        id: '5',
        name: 'TechCorp Solutions',
        logo: '⚡',
        image: 'assets/images/companies/tech-company.png',
        sector: 'Tecnología',
        innovationLevel: 'MEDIO',
        cloud: 'Google Cloud',
        technologies: ['Google Cloud', 'Salesforce'],
        annualRevenue: '€1B-5B',
        employees: '10,000+',
        location: 'Madrid, España',
        tags: [],
        rfpCount: 0
      },
      {
        id: '6',
        name: 'LogiTech Global',
        logo: '📦',
        image: 'assets/images/companies/enterprise.png',
        sector: 'Logística',
        innovationLevel: 'ALTO',
        cloud: 'AWS',
        technologies: ['SAP', 'AWS', 'Oracle'],
        annualRevenue: '€5B-10B',
        employees: '25,000+',
        location: 'Bilbao, España',
        tags: ['Logistics Leader'],
        rfpCount: 4
      }
    ];

    this.filteredCompanies = [...this.companies];
  }

  filterCompanies(): void {
    this.filteredCompanies = this.companies.filter(company => {
      const matchesSearch = !this.searchQuery ||
        company.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        company.sector.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesSector = this.selectedSectors.length === 0 ||
        this.selectedSectors.includes(company.sector);

      // Note: Company size logic is simplified here as we don't have exact size data in the interface
      // In a real app, we would map employees/revenue to size categories
      const matchesSize = this.selectedCompanySizes.length === 0 || true;

      const matchesTech = this.selectedTechnologies.length === 0 ||
        company.technologies.some(t => this.selectedTechnologies.includes(t));

      return matchesSearch && matchesSector && matchesSize && matchesTech;
    });

    this.sortCompanies();
  }

  sortCompanies(): void {
    if (this.sortBy === 'nombre') {
      this.filteredCompanies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortBy === 'rfps') {
      this.filteredCompanies.sort((a, b) => (b.rfpCount || 0) - (a.rfpCount || 0));
    } else {
      // Relevancia (default) - simplified logic
      this.filteredCompanies.sort((a, b) => {
        const scoreA = (a.rfpCount || 0) + (a.innovationLevel === 'ALTO' ? 5 : 0);
        const scoreB = (b.rfpCount || 0) + (b.innovationLevel === 'ALTO' ? 5 : 0);
        return scoreB - scoreA;
      });
    }
  }

  toggleProposalDropdown(company: Company): void {
    if (this.activeProposalCompanyId === company.id) {
      this.activeProposalCompanyId = null;
    } else {
      this.activeProposalCompanyId = company.id;
      this.proposalData.useCase = ''; // Reset selection
    }
  }

  viewRFPs(company: Company): void {
    console.log('Viewing RFPs for:', company.name);
    this.activeTab = 'rfps';
  }

  submitProposal(company: Company): void {
    if (!this.proposalData.useCase) {
      alert('Por favor selecciona un caso de uso');
      return;
    }
    console.log(`Enviando propuesta a ${company.name} con caso: ${this.proposalData.useCase}`);
    this.activeProposalCompanyId = null;
  }

  createNewUseCase(): void {
    this.router.navigate(['/provider/publish-case']);
  }

  editUseCase(useCase: any): void {
    // Navigate to edit page, passing the ID
    this.router.navigate(['/provider/publish-case'], { queryParams: { id: useCase.id } });
  }

  viewCompany(company: Company): void {
    // Placeholder for viewing company details
    console.log('View company:', company.name);
  }

  isImageLogo(logo: string): boolean {
    return logo?.includes('/') || logo?.includes('.');
  }
}
