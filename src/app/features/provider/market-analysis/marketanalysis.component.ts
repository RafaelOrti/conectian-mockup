import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface SectorTrend {
  sector: string;
  searchGrowth: number;
  providersCount: number;
  goldSealCount: number;
  opportunity: 'high' | 'medium' | 'low';
}

interface UseCaseConversion {
  id: string;
  title: string;
  views: number;
  contacts: number;
  conversionRate: number;
  missingFeatures: string[];
}

interface CompetitorGap {
  sector: string;
  averagePrice: number;
  yourAveragePrice: number;
  priceDifference: number;
  recommendation: string;
}

@Component({
  selector: 'app-marketanalysis',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './marketanalysis.component.html',
  styleUrls: ['./marketanalysis.component.scss']
})
export class MarketAnalysisComponent {
  @Input() showNavbar: boolean = true;
  // A. Market Radar - Demand Analysis
  sectorTrends: SectorTrend[] = [
    {
      sector: 'IA para optimización de rutas',
      searchGrowth: 40,
      providersCount: 15,
      goldSealCount: 2,
      opportunity: 'high'
    },
    {
      sector: 'Chatbots Bancarios',
      searchGrowth: 25,
      providersCount: 30,
      goldSealCount: 8,
      opportunity: 'medium'
    },
    {
      sector: 'Análisis Predictivo Retail',
      searchGrowth: 35,
      providersCount: 20,
      goldSealCount: 5,
      opportunity: 'high'
    },
    {
      sector: 'Automatización LegalTech',
      searchGrowth: 15,
      providersCount: 45,
      goldSealCount: 12,
      opportunity: 'low'
    }
  ];

  // B. Pitch Optimizer - Conversion Audit
  useCaseConversions: UseCaseConversion[] = [
    {
      id: '1',
      title: 'Chatbot Bancario',
      views: 500,
      contacts: 0,
      conversionRate: 0,
      missingFeatures: ['Calculadora de ROI', 'Demo Interactivo']
    },
    {
      id: '2',
      title: 'Optimización de Rutas',
      views: 320,
      contacts: 8,
      conversionRate: 2.5,
      missingFeatures: ['Calculadora de ROI']
    },
    {
      id: '3',
      title: 'Análisis Predictivo',
      views: 180,
      contacts: 12,
      conversionRate: 6.7,
      missingFeatures: []
    }
  ];

  // C. Competition Gap Analysis
  competitorGaps: CompetitorGap[] = [
    {
      sector: 'LegalTech',
      averagePrice: 15000,
      yourAveragePrice: 18000,
      priceDifference: 20,
      recommendation: 'Ajusta tus presupuestos un 15-20% para ganar más RFPs'
    },
    {
      sector: 'FinTech',
      averagePrice: 25000,
      yourAveragePrice: 22000,
      priceDifference: -12,
      recommendation: 'Tu precio es competitivo, enfócate en destacar tu valor diferencial'
    },
    {
      sector: 'Retail',
      averagePrice: 12000,
      yourAveragePrice: 15000,
      priceDifference: 25,
      recommendation: 'Considera ofrecer paquetes escalonados para captar más clientes'
    }
  ];

  getOpportunityColor(opportunity: string): string {
    const colors: { [key: string]: string } = {
      'high': '#18b981',
      'medium': '#f96908',
      'low': '#f4444a'
    };
    return colors[opportunity] || '#718096';
  }

  getOpportunityLabel(opportunity: string): string {
    const labels: { [key: string]: string } = {
      'high': 'Alta Oportunidad',
      'medium': 'Oportunidad Media',
      'low': 'Baja Oportunidad'
    };
    return labels[opportunity] || opportunity;
  }

  getPriceDifferenceColor(difference: number): string {
    if (difference > 15) return '#f4444a';
    if (difference < -10) return '#18b981';
    return '#f96908';
  }
}

