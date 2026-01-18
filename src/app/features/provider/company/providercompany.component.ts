import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';

interface TeamMember {
  initials: string;
  name: string;
  role: string;
  email: string;
  status: 'active' | 'away' | 'pending';
}

interface Department {
  name: string;
  memberCount: number;
  members: TeamMember[];
}

@Component({
  selector: 'app-providercompany',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    CardModule,
    ButtonModule,
    AvatarModule,
    TagModule,
    ChipModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    DividerModule
  ],
  providers: [MessageService],
  templateUrl: './providercompany.component.html',
  styleUrls: ['./providercompany.component.scss']
})
export class ProviderCompanyComponent {
  @Input() showNavbar: boolean = true;

  companyInfo = {
    name: 'Nexus Solutions',
    industry: 'AI & Machine Learning',
    location: 'Barcelona, España',
    employees: 32,
    website: 'nexussolutions.ai',
    initials: 'NS'
  };

  departments: Department[] = [
    {
      name: 'Dirección',
      memberCount: 2,
      members: [
        { initials: 'JM', name: 'Jorge Martín', role: 'CEO & Founder', email: 'jorge@nexussolutions.ai', status: 'active' },
        { initials: 'PG', name: 'Paula García', role: 'CTO', email: 'paula@nexussolutions.ai', status: 'active' }
      ]
    },
    {
      name: 'IA y Desarrollo',
      memberCount: 18,
      members: [
        { initials: 'DR', name: 'Diego Rodríguez', role: 'Lead AI Engineer', email: 'diego@nexussolutions.ai', status: 'active' },
        { initials: 'CM', name: 'Clara Moreno', role: 'ML Specialist', email: 'clara@nexussolutions.ai', status: 'active' },
        { initials: 'AF', name: 'Andrés Fernández', role: 'Backend Developer', email: 'andres@nexussolutions.ai', status: 'away' }
      ]
    },
    {
      name: 'Consultoría y Ventas',
      memberCount: 12,
      members: [
        { initials: 'SL', name: 'Sofía López', role: 'Chief Sales Officer', email: 'sofia@nexussolutions.ai', status: 'active' },
        { initials: 'MV', name: 'Miguel Vega', role: 'Solution Architect', email: 'miguel@nexussolutions.ai', status: 'pending' }
      ]
    }
  ];

  showInviteDialog = false;

  get departmentOptions() {
    return this.departments.map(d => ({ label: d.name, value: d.name }));
  }

  constructor(private messageService: MessageService) {}

  inviteMember(): void {
    this.showInviteDialog = true;
  }

  editProfile(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Editar Perfil',
      detail: 'Abriendo editor de perfil de empresa...'
    });
  }

  addTeamMember(): void {
    this.showInviteDialog = true;
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'info' {
    const map: { [key: string]: 'success' | 'warning' | 'info' } = {
      'active': 'success',
      'away': 'warning',
      'pending': 'info'
    };
    return map[status] || 'info';
  }

  getStatusLabel(status: string): string {
    const map: { [key: string]: string } = {
      'active': 'ACTIVO',
      'away': 'AUSENTE',
      'pending': 'PENDIENTE'
    };
    return map[status] || status.toUpperCase();
  }
}
