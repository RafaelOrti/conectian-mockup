import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  linkedInConnected: boolean;
  validationStatus: 'pending' | 'validated' | 'rejected';
  avatar?: string;
}

interface TrustSeal {
  level: 'BRONCE' | 'PLATA' | 'ORO';
  currentProgress: number;
  nextLevelProgress: number;
  description: string;
}

interface UseCase {
  id: string;
  title: string;
  sector: string;
  views: number;
  dealRoomRequests: number;
  thumbnail?: string;
}

interface Referral {
  id: string;
  clientName: string;
  creditsEarned: number;
  status: 'pending' | 'accepted';
  date: string;
}

@Component({
  selector: 'app-growthcenter',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './growthcenter.component.html',
  styleUrls: ['./growthcenter.component.scss']
})
export class GrowthCenterComponent {
  // Block 1: Team Management and Trust Seals
  teamMembers: TeamMember[] = [
    { id: '1', name: 'María García', email: 'maria@empresa.com', linkedInConnected: true, validationStatus: 'validated' },
    { id: '2', name: 'Carlos Ruiz', email: 'carlos@empresa.com', linkedInConnected: false, validationStatus: 'pending' },
    { id: '3', name: 'Ana Martínez', email: 'ana@empresa.com', linkedInConnected: true, validationStatus: 'validated' }
  ];

  trustSeal: TrustSeal = {
    level: 'BRONCE',
    currentProgress: 2,
    nextLevelProgress: 4,
    description: 'Necesitas 2 más para PLATA'
  };

  // Block 2: Credit Wallet and Referrals
  creditBalance: number = 250;
  referralLink: string = 'https://conectian.com/ref/ABC123';
  referralsCount: number = 2;
  creditsEarned: number = 40;

  // Block 3: Portfolio and Success Cases
  useCases: UseCase[] = [
    { id: '1', title: 'Chatbot Bancario Inteligente', sector: 'Fintech', views: 250, dealRoomRequests: 3 },
    { id: '2', title: 'Optimización de Rutas con IA', sector: 'Logística', views: 180, dealRoomRequests: 2 },
    { id: '3', title: 'Análisis Predictivo de Ventas', sector: 'Retail', views: 320, dealRoomRequests: 5 }
  ];

  totalViews: number = 750;
  totalDealRoomRequests: number = 10;

  // Block 4: Referrals History
  referrals: Referral[] = [
    { id: '1', clientName: 'DataTech & IA', creditsEarned: 100, status: 'accepted', date: '2024-01-10' },
    { id: '2', clientName: 'Norberg AI', creditsEarned: 100, status: 'accepted', date: '2024-01-15' },
    { id: '3', clientName: 'INFORed', creditsEarned: 250, status: 'accepted', date: '2024-01-20' }
  ];

  getProgressPercentage(): number {
    return (this.trustSeal.currentProgress / this.trustSeal.nextLevelProgress) * 100;
  }

  getSealIcon(level: string): string {
    const icons: { [key: string]: string } = {
      'BRONCE': '🥉',
      'PLATA': '🥈',
      'ORO': '🥇'
    };
    return icons[level] || '🏆';
  }

  getValidationStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'validated': '#18b981',
      'pending': '#f96908',
      'rejected': '#f4444a'
    };
    return colors[status] || '#718096';
  }

  getValidationStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'validated': 'Validado',
      'pending': 'Pendiente',
      'rejected': 'Rechazado'
    };
    return labels[status] || status;
  }

  copyReferralLink(): void {
    navigator.clipboard.writeText(this.referralLink);
    // TODO: Show toast notification
    console.log('Link copiado al portapapeles');
  }

  inviteTeamMember(): void {
    // TODO: Implement invite team member logic
    console.log('Invitar miembro del equipo');
  }
}

