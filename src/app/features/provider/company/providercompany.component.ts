import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'active' | 'away' | 'pending';
  department: string;
  skills?: string[];
}

@Component({
  selector: 'app-providercompany',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent,
    CardModule,
    ButtonModule,
    AvatarModule,
    ChipModule,
    TagModule,
    TooltipModule,
    DialogModule,
    InputTextModule
  ],
  templateUrl: './providercompany.component.html',
  styleUrls: ['./providercompany.component.scss']
})
export class ProviderCompanyComponent {
  @Input() showNavbar: boolean = true;

  companyInfo = {
    name: 'TechSolutions AI',
    industry: 'Desarrollo de IA & Consultoría',
    location: 'Barcelona, España',
    website: 'techsolutions-ai.com',
    totalMembers: 12
  };

  teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'David Ruiz',
      role: 'Lead AI Engineer',
      email: 'david@techsolutions-ai.com',
      avatar: 'DR',
      status: 'active',
      department: 'technical',
      skills: ['Python', 'TensorFlow', 'MLOps']
    },
    {
      id: '2',
      name: 'Elena López',
      role: 'Data Scientist',
      email: 'elena@techsolutions-ai.com',
      avatar: 'EL',
      status: 'active',
      department: 'technical',
      skills: ['R', 'Statistics', 'ML']
    },
    {
      id: '3',
      name: 'Marta Pérez',
      role: 'Business Development',
      email: 'marta@techsolutions-ai.com',
      avatar: 'MP',
      status: 'active',
      department: 'business',
      skills: ['Sales', 'Strategy']
    }
  ];

  showInviteDialog: boolean = false;

  getTechnicalTeam(): TeamMember[] {
    return this.teamMembers.filter(m => m.department === 'technical');
  }

  getBusinessTeam(): TeamMember[] {
    return this.teamMembers.filter(m => m.department === 'business');
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'info' {
    const severities: { [key: string]: 'success' | 'warning' | 'info' } = {
      'active': 'success',
      'away': 'warning',
      'pending': 'info'
    };
    return severities[status] || 'info';
  }

  openInviteDialog(): void {
    this.showInviteDialog = true;
  }
}
