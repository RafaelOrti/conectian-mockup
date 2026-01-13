import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-clientreferrals',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './clientreferrals.component.html',
  styleUrls: ['./clientreferrals.component.scss']
})
export class ClientReferralsComponent {
  referrals = [
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
}
