import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  linkedInConnected: boolean;
  avatar?: string;
}

interface Badge {
  id: string;
  name: string;
  level: 'BRONCE' | 'PLATA' | 'ORO';
  progress: number;
  maxProgress: number;
  description: string;
  icon: string;
}

interface Referral {
  id: string;
  companyName: string;
  invitedBy: string;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
}

interface UseCase {
  id: string;
  title: string;
  sector: string;
  views: number;
  dealRoomRequests: number;
}

@Component({
  selector: 'app-providerinnovationcenter',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './providerinnovationcenter.component.html',
  styleUrls: ['./providerinnovationcenter.component.scss']
})
export class ProviderInnovationCenterComponent {
  @Input() showNavbar: boolean = true;
  teamMembers: TeamMember[] = [
    { id: '1', name: 'María García', role: 'Directora de Proyectos', email: 'maria@empresa.com', linkedInConnected: true },
    { id: '2', name: 'Carlos Ruiz', role: 'Especialista en IA', email: 'carlos@empresa.com', linkedInConnected: false },
    { id: '3', name: 'Ana Martínez', role: 'Analista de Negocios', email: 'ana@empresa.com', linkedInConnected: true }
  ];

  badges: Badge[] = [
    {
      id: '1',
      name: 'Líder en Innovación',
      level: 'BRONCE',
      progress: 1,
      maxProgress: 2,
      description: 'Invita a 1 empresa más para destacar tu logo en el Market de Casos de Uso',
      icon: '🏆'
    }
  ];

  referrals: Referral[] = [
    { id: '1', companyName: 'DataSecure AI', invitedBy: 'Jorge S.', status: 'accepted', date: '2024-01-15' },
    { id: '2', companyName: 'PayFin Tech', invitedBy: 'Savia F.', status: 'pending', date: '2024-01-20' }
  ];

  topUseCases: UseCase[] = [
    { id: '1', title: 'Chatbot Bancario Inteligente', sector: 'Fintech', views: 500, dealRoomRequests: 8 },
    { id: '2', title: 'Optimización de Rutas con IA', sector: 'Logística', views: 320, dealRoomRequests: 5 },
    { id: '3', title: 'Análisis Predictivo de Ventas', sector: 'Retail', views: 280, dealRoomRequests: 4 }
  ];

  getCurrentBadge(): Badge {
    return this.badges[0];
  }

  getProgressPercentage(badge: Badge): number {
    return (badge.progress / badge.maxProgress) * 100;
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'pending': '#f96908',
      'accepted': '#18b981',
      'rejected': '#f4444a'
    };
    return colors[status] || '#718096';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'pending': 'Pendiente',
      'accepted': 'Aceptado',
      'rejected': 'Rechazado'
    };
    return labels[status] || status;
  }

  inviteTeamMember(): void {
    console.log('Invitar miembro del equipo');
  }

  inviteCompany(type: 'partner' | 'provider'): void {
    console.log(`Invitar empresa ${type}`);
  }
}
