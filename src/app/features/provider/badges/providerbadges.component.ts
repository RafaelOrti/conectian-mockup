import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';

interface Badge {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  requirement?: string;
}

@Component({
  selector: 'app-providerbadges',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    CardModule,
    ButtonModule,
    ProgressBarModule,
    TagModule,
    ChipModule,
    TooltipModule
  ],
  templateUrl: './providerbadges.component.html',
  styleUrls: ['./providerbadges.component.scss']
})
export class ProviderBadgesComponent {
  @Input() showNavbar: boolean = true;

  currentLevel = 'Experto Platinum';
  nextLevel = 'Experto Diamond';
  currentXP = 4250;
  nextLevelXP = 5000;
  progressPercentage = 85;

  badges: Badge[] = [
    {
      id: '1',
      icon: '⭐',
      title: 'Primera Venta',
      description: 'Cerraste tu primer proyecto en Conectian',
      unlocked: true,
      unlockedDate: '15 Dic 2025'
    },
    {
      id: '2',
      icon: '🎯',
      title: 'Top Performer',
      description: 'Alcanzaste 10 proyectos completados',
      unlocked: true,
      unlockedDate: '10 Ene 2026'
    },
    {
      id: '3',
      icon: '💎',
      title: 'Cliente Satisfecho',
      description: 'Obtuviste 5 reseñas de 5 estrellas',
      unlocked: true,
      unlockedDate: '25 Ene 2026'
    },
    {
      id: '4',
      icon: '🚀',
      title: 'Innovador',
      description: 'Publica 10 casos de uso únicos',
      unlocked: false,
      progress: 70,
      requirement: '7 de 10 casos'
    },
    {
      id: '5',
      icon: '🌟',
      title: 'Experto Certificado',
      description: 'Completa todas las certificaciones de IA',
      unlocked: false,
      progress: 40,
      requirement: '2 de 5 certificaciones'
    },
    {
      id: '6',
      icon: '👑',
      title: 'Elite Partner',
      description: 'Alcanza €100k en proyectos facturados',
      unlocked: false,
      progress: 55,
      requirement: '€55k de €100k'
    }
  ];

  getUnlockedBadges(): Badge[] {
    return this.badges.filter(b => b.unlocked);
  }

  getLockedBadges(): Badge[] {
    return this.badges.filter(b => !b.unlocked);
  }
}
