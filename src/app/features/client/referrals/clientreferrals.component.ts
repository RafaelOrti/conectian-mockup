import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';

interface Referral {
  name: string;
  initials: string;
  company: string;
  date: string;
  status: 'completed' | 'registered' | 'pending';
  reward: string | null;
}

@Component({
  selector: 'app-clientreferrals',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    CardModule,
    ButtonModule,
    TableModule,
    TagModule,
    AvatarModule,
    InputTextModule,
    ToastModule,
    DividerModule
  ],
  providers: [MessageService],
  templateUrl: './clientreferrals.component.html',
  styleUrls: ['./clientreferrals.component.scss']
})
export class ClientReferralsComponent {
  referralLink = 'https://conectian.com/ref/carlos-m-8291';
  
  stats = {
    invitesSent: 12,
    accepted: 5,
    creditsEarned: 250
  };

  referrals: Referral[] = [
    {
      name: 'Laura Gómez',
      initials: 'LG',
      company: 'TechSolutions SL',
      date: '10 Ene 2026',
      status: 'completed',
      reward: '€50'
    },
    {
      name: 'Roberto Díaz',
      initials: 'RD',
      company: 'Innova Retail',
      date: '05 Ene 2026',
      status: 'registered',
      reward: null
    },
    {
      name: 'Marta Ruiz',
      initials: 'MR',
      company: 'Consulting Group',
      date: '02 Ene 2026',
      status: 'pending',
      reward: null
    },
    {
      name: 'Javier S.',
      initials: 'JS',
      company: 'Logística Express',
      date: '28 Dic 2025',
      status: 'completed',
      reward: '€50'
    }
  ];

  constructor(private messageService: MessageService) {}

  copyLink(): void {
    navigator.clipboard.writeText(this.referralLink);
    this.messageService.add({
      severity: 'success',
      summary: 'Enlace Copiado',
      detail: 'El enlace de referido se ha copiado al portapapeles'
    });
  }

  shareOnLinkedIn(): void {
    const url = encodeURIComponent(this.referralLink);
    const text = encodeURIComponent('¡Únete a Conectian y descubre las mejores soluciones de IA!');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`, '_blank');
  }

  shareOnTwitter(): void {
    const url = encodeURIComponent(this.referralLink);
    const text = encodeURIComponent('Descubre Conectian, la plataforma líder para conectar empresas con soluciones de IA');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  }

  shareViaEmail(): void {
    const subject = encodeURIComponent('Te invito a Conectian');
    const body = encodeURIComponent(`¡Hola!\n\nTe invito a unirte a Conectian, la plataforma que conecta empresas con las mejores soluciones de Inteligencia Artificial.\n\nÚsate mi enlace: ${this.referralLink}\n\n¡Nos vemos dentro!`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  inviteContact(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Invitar Contacto',
      detail: 'Abriendo formulario de invitación...'
    });
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warning' {
    const map: { [key: string]: 'success' | 'info' | 'warning' } = {
      'completed': 'success',
      'registered': 'info',
      'pending': 'warning'
    };
    return map[status] || 'info';
  }

  getStatusLabel(status: string): string {
    const map: { [key: string]: string } = {
      'completed': 'COMPLETADO',
      'registered': 'REGISTRADO',
      'pending': 'PENDIENTE'
    };
    return map[status] || status.toUpperCase();
  }
}
