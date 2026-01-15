import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface NetworkOpportunity {
  id: string;
  type: 'collaboration' | 'joint-venture' | 'referral';
  title: string;
  description: string;
  company: {
    name: string;
    avatar: string;
    color: string;
  };
  postedDate: string;
  skills: string[];
  budget?: string;
}

@Component({
  selector: 'app-providerreferrals',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './providerreferrals.component.html',
  styleUrls: ['./providerreferrals.component.scss']
})
export class ProviderReferralsComponent {
  stats = {
    activePartners: 24,
    sharedDeals: 8,
    commissionsEarned: 1250
  };

  opportunities: NetworkOpportunity[] = [
    {
      id: '1',
      type: 'collaboration',
      title: 'Proyecto de Visión Artificial',
      description: 'Empresa de robótica busca partner especializado en Computer Vision para proyecto industrial.',
      company: {
        name: 'Robotics Corp',
        avatar: 'R',
        color: '#3b82f6'
      },
      postedDate: 'Hace 2 días',
      skills: ['Computer Vision', 'Deep Learning', 'Python'],
      budget: '€40K - €60K'
    },
    {
      id: '2',
      type: 'joint-venture',
      title: 'Expansión a Mercado LATAM',
      description: 'Consultora busca socio tecnológico para implementar soluciones de IA en banca latinoamericana.',
      company: {
        name: 'FinTech Global',
        avatar: 'F',
        color: '#10b981'
      },
      postedDate: 'Hace 5 días',
      skills: ['FinTech', 'Banking', 'IA'],
      budget: '€100K+'
    },
    {
      id: '3',
      type: 'referral',
      title: 'Cliente Enterprise busca NLP',
      description: 'Tenemos un cliente grande que necesita procesamiento de lenguaje natural. Buscamos experto.',
      company: {
        name: 'Data Solutions',
        avatar: 'D',
        color: '#8b5cf6'
      },
      postedDate: 'Hace 1 semana',
      skills: ['NLP', 'Transformers', 'LLMs'],
      budget: '€30K - €50K'
    }
  ];

  referralLink = 'https://conectian.com/partner/techsolutions-ai';

  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'collaboration': 'Colaboración',
      'joint-venture': 'Joint Venture',
      'referral': 'Referido'
    };
    return labels[type] || type;
  }

  getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      'collaboration': 'blue',
      'joint-venture': 'green',
      'referral': 'purple'
    };
    return colors[type] || 'blue';
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.referralLink);
    // TODO: Show toast notification
  }

  connectWithCompany(opportunityId: string): void {
    console.log('Connecting with opportunity:', opportunityId);
    // TODO: Implement connection logic
  }
}


