import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

interface Company {
  id: string;
  name: string;
  logo: string;
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
  imports: [CommonModule, FormsModule, NavbarComponent, CardComponent, ButtonComponent, BadgeComponent],
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

  companies: Company[] = [];
  filteredCompanies: Company[] = [];

  // Use Cases Data
  useCases = [
    {
      id: '1',
      title: 'Solución Integral de IA Empresarial',
      provider: { name: 'DataLogic AI', logo: '🤖', verified: true },
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
      provider: { name: 'Nexus Solutions', logo: '⚡', verified: true },
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
      provider: { name: 'Optimizer AI', logo: '📊', verified: false },
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
      provider: { name: 'DataLogic AI', logo: '🤖', verified: true },
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

  // Proposal sidebar
  selectedUseCase: any = null;
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

      const matchesTechnology = this.selectedTechnologies.length === 0 ||
        this.selectedTechnologies.some(tech => company.technologies.includes(tech));

      return matchesSearch && matchesSector && matchesTechnology;
    });

    this.sortCompanies();
  }

  sortCompanies(): void {
    switch (this.sortBy) {
      case 'relevancia':
        // Sort by innovation level and RFP count
        this.filteredCompanies.sort((a, b) => {
          const innovationOrder = { 'ALTO': 3, 'MEDIO': 2, 'BAJO': 1 };
          return (innovationOrder[b.innovationLevel] - innovationOrder[a.innovationLevel]) ||
            ((b.rfpCount || 0) - (a.rfpCount || 0));
        });
        break;
      case 'nombre':
        this.filteredCompanies.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rfps':
        this.filteredCompanies.sort((a, b) => (b.rfpCount || 0) - (a.rfpCount || 0));
        break;
    }
  }

  toggleFilter(array: string[], value: string): void {
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(value);
    }
    this.filterCompanies();
  }

  viewCompany(company: Company): void {
    // TODO: Navigate to company detail page
    console.log('View company:', company);
  }

  sendProposal(company: Company): void {
    // TODO: Open proposal modal or navigate to proposal form
    console.log('Send proposal to:', company);
  }

  selectUseCase(useCase: any): void {
    this.selectedUseCase = useCase;
    this.proposalData.useCase = useCase?.title || '';
  }

  createNewUseCase(): void {
    this.router.navigate(['/provider/publish-case']);
  }
}
