import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

interface Project {
  id: string;
  dealRoomId: string;
  title: string;
  client: {
    name: string;
    logo: string;
    image?: string;
  };
  status: 'active' | 'completed' | 'on-hold';
  acceptedDate: string;
  lastActivity: string;
  value?: number;
  timeline?: string;
  progress?: number;
  category?: string;
}

@Component({
  selector: 'app-provider-project-management',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    CardModule,
    TagModule,
    ButtonModule,
    AvatarModule
  ],
  templateUrl: './providerprojectmanagement.component.html',
  styleUrls: ['./providerprojectmanagement.component.scss']
})
export class ProviderProjectManagementComponent implements OnInit {
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
        client: {
          name: 'REPSOL',
          logo: '⛽',
          image: 'assets/images/companies/repsol.png'
        },
        status: 'active',
        acceptedDate: '2025-11-15',
        lastActivity: 'Hace 2 horas',
        value: 25000,
        timeline: '8 semanas',
        progress: 65,
        category: 'AI & Chatbots'
      },
      {
        id: '2',
        dealRoomId: 'deal-2',
        title: 'Sistema de Detección de Fraude',
        client: {
          name: 'BBVA',
          logo: '🏦',
          image: 'assets/images/companies/bbva.png'
        },
        status: 'active',
        acceptedDate: '2025-11-10',
        lastActivity: 'Hace 1 día',
        value: 45000,
        timeline: '12 semanas',
        progress: 45,
        category: 'Security & Fraud'
      },
      {
        id: '3',
        dealRoomId: 'deal-3',
        title: 'Optimización de Logística',
        client: {
          name: 'INDITEX',
          logo: '👔',
          image: 'assets/images/companies/inditex.png'
        },
        status: 'on-hold',
        acceptedDate: '2025-10-20',
        lastActivity: 'Hace 1 semana',
        value: 35000,
        timeline: '10 semanas',
        progress: 30,
        category: 'Logistics & Optimization'
      }
    ];
  }

  openDealRoom(dealRoomId: string): void {
    this.router.navigate(['/provider/deal-room', dealRoomId]);
  }

  getSeverity(status: string): 'success' | 'info' | 'warning' | 'danger' | undefined {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'info';
      case 'on-hold':
        return 'warning';
      default:
        return undefined;
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'active':
        return 'ACTIVO';
      case 'completed':
        return 'COMPLETADO';
      case 'on-hold':
        return 'EN PAUSA';
      default:
        return status.toUpperCase();
    }
  }
}



