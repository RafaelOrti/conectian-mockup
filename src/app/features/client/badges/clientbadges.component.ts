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
  selector: 'app-clientbadges',
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
  templateUrl: './clientbadges.component.html',
  styleUrls: ['./clientbadges.component.scss']
})
export class ClientBadgesComponent {
  @Input() showNavbar: boolean = true;

  currentLevel = 'Innovador Gold';
  nextLevel = 'Innovador Platinum';
  currentXP = 2450;
  nextLevelXP = 3000;
  progressPercentage = 75;

  badges: Badge[] = [
    {
      id: '1',
      icon: '🚀',
      title: 'Pionero Digital',
      description: 'Primer proyecto de IA lanzado con éxito',
      unlocked: true,
      unlockedDate: '12 Ene 2026'
    },
    {
      id: '2',
      icon: '🤝',
      title: 'Networker Pro',
      description: 'Conectaste con 5 proveedores verificados',
      unlocked: true,
      unlockedDate: '05 Feb 2026'
    },
    {
      id: '3',
      icon: '💡',
      title: 'Visionario',
      description: 'Publicaste 3 casos de uso innovadores',
      unlocked: true,
      unlockedDate: '20 Feb 2026'
    },
    {
      id: '4',
      icon: '🌍',
      title: 'Expansión Global',
      description: 'Implementa soluciones en 3 países diferentes',
      unlocked: false,
      progress: 33,
      requirement: '1 de 3 países'
    },
    {
      id: '5',
      icon: '🦄',
      title: 'Unicorn Hunter',
      description: 'Colabora con una startup unicornio',
      unlocked: false,
      progress: 0,
      requirement: 'Sin progreso'
    },
    {
      id: '6',
      icon: '🎓',
      title: 'AI Master',
      description: 'Completa todos los cursos de formación básica',
      unlocked: false,
      progress: 60,
      requirement: '3 de 5 cursos'
    }
  ];

  getUnlockedBadges(): Badge[] {
    return this.badges.filter(b => b.unlocked);
  }

  getLockedBadges(): Badge[] {
    return this.badges.filter(b => !b.unlocked);
  }
}
