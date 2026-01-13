import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface Lead {
  id: string;
  companyName: string;
  logo: string;
  priority: 'Alta' | 'Media' | 'Baja';
  contactDate?: string;
  nextFollowUp?: string;
  proposalSent?: boolean;
  progress?: number;
  followUpDate?: string;
  // Campos para proyectos activos
  isProject?: boolean;
  dealRoomId?: string;
  projectTitle?: string;
  value?: number;
  timeline?: string;
  acceptedDate?: string;
  lastActivity?: string;
  projectStatus?: 'active' | 'completed' | 'on-hold';
}

@Component({
  selector: 'app-leads-crm',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, BadgeComponent, ButtonComponent],
  templateUrl: './leadscrm.component.html',
  styleUrls: ['./leadscrm.component.scss']
})
export class LeadsCrmComponent {
  constructor(private router: Router) { }

  activeView: 'all' | 'leads' | 'projects' = 'all';

  allColumns = [
    {
      id: 'nuevo', title: 'Nuevo', count: 12, color: 'blue', leads: [
        { id: '1', companyName: 'NeuroTech Solutions', logo: '🧠', priority: 'Alta' as const },
        { id: '2', companyName: 'Apex AI Corp', logo: '⚡', priority: 'Media' as const },
        { id: '3', companyName: 'Quantum Data', logo: '📊', priority: 'Baja' as const }
      ]
    },
    {
      id: 'contactado', title: 'Contactado', count: 8, color: 'purple', leads: [
        { id: '4', companyName: 'Cognitive Dynamics', logo: '🎯', priority: 'Alta' as const, contactDate: '15 de Octubre', nextFollowUp: 'Mañana' },
        { id: '5', companyName: 'Synthesis AI', logo: '🔬', priority: 'Media' as const, contactDate: '14 de Octubre', nextFollowUp: 'Mañana' }
      ]
    },
    {
      id: 'negociacion', title: 'En Negociación', count: 5, color: 'orange', leads: [
        { id: '6', companyName: 'DeepMind Ventures', logo: '🚀', priority: 'Alta' as const, proposalSent: true, progress: 80 },
        { id: '7', companyName: 'Future Logic', logo: '💡', priority: 'Alta' as const, proposalSent: true, progress: 100 }
      ]
    },
    {
      id: 'ganado', title: 'Cerrado-Ganado ✅', count: 6, color: 'green', leads: [
        { id: '8', companyName: 'Global AI Systems', logo: '🌍', priority: 'Alta' as const },
        // Proyectos integrados en Cerrado-Ganado
        {
          id: 'p1',
          companyName: 'Repsol',
          logo: '⛽',
          priority: 'Alta' as const,
          isProject: true,
          dealRoomId: 'deal-1',
          projectTitle: 'Chatbot para E-commerce',
          value: 25000,
          timeline: '8 semanas',
          acceptedDate: '2025-11-15',
          lastActivity: 'Hace 2 horas',
          projectStatus: 'active' as const
        },
        {
          id: 'p2',
          companyName: 'BBVA',
          logo: '🏦',
          priority: 'Alta' as const,
          isProject: true,
          dealRoomId: 'deal-2',
          projectTitle: 'Sistema de Detección de Fraude',
          value: 45000,
          timeline: '12 semanas',
          acceptedDate: '2025-11-10',
          lastActivity: 'Hace 1 día',
          projectStatus: 'active' as const
        },
        {
          id: 'p3',
          companyName: 'Inditex',
          logo: '👔',
          priority: 'Media' as const,
          isProject: true,
          dealRoomId: 'deal-3',
          projectTitle: 'Optimización de Logística',
          value: 35000,
          timeline: '10 semanas',
          acceptedDate: '2025-10-20',
          lastActivity: 'Hace 1 semana',
          projectStatus: 'on-hold' as const
        }
      ]
    },
    {
      id: 'perdido', title: 'Cerrado-Perdido ❌', count: 2, color: 'red', leads: [
        { id: '9', companyName: 'Alpha Intelligence', logo: '🔷', priority: 'Baja' as const, followUpDate: 'Follow-up en 3 meses' }
      ]
    }
  ];

  get columns() {
    if (this.activeView === 'all') {
      return this.allColumns;
    } else if (this.activeView === 'leads') {
      return this.allColumns.map(col => ({
        ...col,
        leads: col.leads.filter(lead => !(lead as Lead).isProject),
        count: col.leads.filter(lead => !(lead as Lead).isProject).length
      }));
    } else {
      // Solo proyectos
      const proyectosColumn = this.allColumns.find(col => col.id === 'ganado');
      if (proyectosColumn) {
        return [{
          ...proyectosColumn,
          leads: proyectosColumn.leads.filter(lead => (lead as Lead).isProject),
          count: proyectosColumn.leads.filter(lead => (lead as Lead).isProject).length,
          title: 'Proyectos Activos 🚀'
        }];
      }
      return [];
    }
  }

  metrics = {
    conversionRate: 22,
    avgTime: 18,
    wonThisMonth: 8
  };

  openDealRoom(dealRoomId: string): void {
    this.router.navigate(['/deal-room', dealRoomId]);
  }

  getProjectStatusClass(status?: string): string {
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

  getProjectStatusLabel(status?: string): string {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'completed':
        return 'Completado';
      case 'on-hold':
        return 'En Pausa';
      default:
        return '';
    }
  }

  getAllCount(): number {
    return this.allColumns.reduce((sum, col) => sum + col.leads.length, 0);
  }

  getLeadsCount(): number {
    return this.allColumns.reduce((sum, col) =>
      sum + col.leads.filter(lead => !(lead as Lead).isProject).length, 0
    );
  }

  getProjectsCount(): number {
    return this.allColumns.reduce((sum, col) =>
      sum + col.leads.filter(lead => (lead as Lead).isProject).length, 0
    );
  }
}
