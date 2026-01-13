import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: 'BRONCE' | 'PLATA' | 'ORO' | 'DIAMANTE';
  status: 'earned' | 'in-progress' | 'locked';
  progress?: number;
  maxProgress?: number;
  earnedDate?: string;
  rewards?: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: 'cases' | 'leads' | 'referrals' | 'quality';
  status: 'completed' | 'in-progress' | 'locked';
}

@Component({
  selector: 'app-providerbadges',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './providerbadges.component.html',
  styleUrls: ['./providerbadges.component.scss']
})
export class ProviderBadgesComponent {
  @Input() showNavbar: boolean = true;
  reputationScore: number = 3200;
  reputationLevel: string = 'Maestro';
  reputationProgress: number = 85;

  badges: Badge[] = [
    {
      id: '1',
      name: 'Proveedor Verificado',
      description: 'Completa la verificación de tu empresa y equipo',
      icon: '✅',
      level: 'BRONCE',
      status: 'earned',
      earnedDate: '2024-01-10',
      rewards: ['Sello de Verificación', 'Mayor visibilidad']
    },
    {
      id: '2',
      name: 'Creador de Contenido',
      description: 'Publica 10 casos de uso destacados',
      icon: '📝',
      level: 'PLATA',
      status: 'in-progress',
      progress: 7,
      maxProgress: 10,
      rewards: ['Sello Plata', 'Prioridad en búsquedas']
    },
    {
      id: '3',
      name: 'Líder en Conversión',
      description: 'Convierte 20 leads en proyectos cerrados',
      icon: '🎯',
      level: 'ORO',
      status: 'in-progress',
      progress: 12,
      maxProgress: 20,
      rewards: ['Sello Oro', 'Badge destacado', 'Comisiones mejoradas']
    },
    {
      id: '4',
      name: 'Embajador Premium',
      description: 'Refiere 15 proveedores que se unan',
      icon: '👑',
      level: 'DIAMANTE',
      status: 'locked',
      progress: 3,
      maxProgress: 15,
      rewards: ['Sello Diamante', 'Comisión por referidos', 'Acceso VIP']
    }
  ];

  achievements: Achievement[] = [
    {
      id: '1',
      title: 'Primer Caso Publicado',
      description: 'Publica tu primer caso de uso',
      icon: '🎉',
      points: 150,
      category: 'cases',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Lead Master',
      description: 'Responde a 50 leads en menos de 2 horas',
      icon: '⚡',
      points: 300,
      category: 'leads',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Calidad 5 Estrellas',
      description: 'Mantén un rating de 5 estrellas en 10 proyectos',
      icon: '⭐',
      points: 500,
      category: 'quality',
      status: 'locked'
    },
    {
      id: '4',
      title: 'Network Builder',
      description: 'Refiere 5 proveedores exitosos',
      icon: '🌐',
      points: 750,
      category: 'referrals',
      status: 'locked'
    }
  ];

  getLevelColor(level: string): string {
    const colors: { [key: string]: string } = {
      'BRONCE': '#cd7f32',
      'PLATA': '#c0c0c0',
      'ORO': '#ffd700',
      'DIAMANTE': '#b9f2ff'
    };
    return colors[level] || '#718096';
  }

  getProgressPercentage(badge: Badge): number {
    if (!badge.progress || !badge.maxProgress) return 0;
    return (badge.progress / badge.maxProgress) * 100;
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'cases': '📝',
      'leads': '📊',
      'referrals': '🌟',
      'quality': '⭐'
    };
    return icons[category] || '🏆';
  }

  getEarnedBadges(): Badge[] {
    return this.badges.filter(b => b.status === 'earned');
  }

  getInProgressBadges(): Badge[] {
    return this.badges.filter(b => b.status === 'in-progress');
  }

  getLockedBadges(): Badge[] {
    return this.badges.filter(b => b.status === 'locked');
  }
}
