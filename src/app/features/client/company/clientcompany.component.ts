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
  selector: 'app-clientcompany',
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
  templateUrl: './clientcompany.component.html',
  styleUrls: ['./clientcompany.component.scss']
})
export class ClientCompanyComponent {
  @Input() showNavbar: boolean = true;

  companyInfo = {
    name: 'TechSolutions SL',
    industry: 'Tecnología y Software',
    location: 'Madrid, España',
    employees: 45,
    website: 'techsolutions.com',
    initials: 'TS'
  };

  departments: Department[] = [
    {
      name: 'Dirección',
      memberCount: 3,
      members: [
        { initials: 'CM', name: 'Carlos Martínez', role: 'CEO & Founder', email: 'carlos@techsolutions.com', status: 'active' },
        { initials: 'AL', name: 'Ana López', role: 'CTO', email: 'ana@techsolutions.com', status: 'active' }
      ]
    },
    {
      name: 'Tecnología e Innovación',
      memberCount: 12,
      members: [
        { initials: 'JR', name: 'Javier Ruiz', role: 'Lead Developer', email: 'javier@techsolutions.com', status: 'active' },
        { initials: 'MS', name: 'María Sánchez', role: 'AI Engineer', email: 'maria@techsolutions.com', status: 'active' },
        { initials: 'DP', name: 'David Pérez', role: 'Frontend Dev', email: 'david@techsolutions.com', status: 'away' }
      ]
    },
    {
      name: 'Ventas y Marketing',
      memberCount: 8,
      members: [
        { initials: 'LG', name: 'Lucía García', role: 'Head of Sales', email: 'lucia@techsolutions.com', status: 'active' },
        { initials: 'RT', name: 'Roberto Torres', role: 'Account Manager', email: 'roberto@techsolutions.com', status: 'pending' }
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
