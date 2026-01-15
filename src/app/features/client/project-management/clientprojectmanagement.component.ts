import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface Project {
  id: string;
  dealRoomId: string;
  title: string;
  provider: {
    name: string;
    logo: string;
    verified: boolean;
  };
  status: 'active' | 'completed' | 'on-hold';
  acceptedDate: string;
  lastActivity: string;
  value?: number;
  timeline?: string;
}

@Component({
  selector: 'app-client-project-management',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    CardComponent,
    BadgeComponent,
    ButtonComponent
  ],
  templateUrl: './clientprojectmanagement.component.html',
  styleUrls: ['./clientprojectmanagement.component.scss']
})
export class ClientProjectManagementComponent implements OnInit {
  projects: Project[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // TODO: Load projects from backend API
    // For now, using mock data
    this.loadMockProjects();
  }

  loadMockProjects(): void {
    this.projects = [
      {
        id: '1',
        dealRoomId: 'deal-1',
        title: 'Chatbot para E-commerce',
        provider: {
          name: 'Nexus Solutions',
          logo: '⚡',
          verified: true
        },
        status: 'active',
        acceptedDate: '2025-11-15',
        lastActivity: 'Hace 2 horas',
        value: 25000,
        timeline: '8 semanas'
      },
      {
        id: '2',
        dealRoomId: 'deal-2',
        title: 'Sistema de Detección de Fraude',
        provider: {
          name: 'DataLogic AI',
          logo: '🤖',
          verified: true
        },
        status: 'active',
        acceptedDate: '2025-11-10',
        lastActivity: 'Hace 1 día',
        value: 45000,
        timeline: '12 semanas'
      },
      {
        id: '3',
        dealRoomId: 'deal-3',
        title: 'Optimización de Logística',
        provider: {
          name: 'Optimizer AI',
          logo: '📊',
          verified: true
        },
        status: 'on-hold',
        acceptedDate: '2025-10-20',
        lastActivity: 'Hace 1 semana',
        value: 35000,
        timeline: '10 semanas'
      }
    ];
  }

  openDealRoom(dealRoomId: string): void {
    this.router.navigate(['/client/deal-room', dealRoomId]);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'completed':
        return 'status-completed';
      case 'on-hold':
        return 'status-on-hold';
      default:
        return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'completed':
        return 'Completado';
      case 'on-hold':
        return 'En Pausa';
      default:
        return status;
    }
  }
}



