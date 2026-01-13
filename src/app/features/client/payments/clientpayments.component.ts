import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-clientpayments',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './clientpayments.component.html',
  styleUrls: ['./clientpayments.component.scss']
})
export class ClientPaymentsComponent {
  invoices = [
    {
      id: 'INV-2025-001',
      date: '01 Ene 2025',
      concept: 'Suscripción Enterprise - Enero',
      amount: '€499.00',
      status: 'paid'
    },
    {
      id: 'INV-2024-128',
      date: '01 Dic 2024',
      concept: 'Suscripción Enterprise - Diciembre',
      amount: '€499.00',
      status: 'paid'
    },
    {
      id: 'INV-2024-115',
      date: '15 Nov 2024',
      concept: 'Consultoría Implementación IA',
      amount: '€1,250.00',
      status: 'paid'
    },
    {
      id: 'INV-2024-110',
      date: '01 Nov 2024',
      concept: 'Suscripción Enterprise - Noviembre',
      amount: '€499.00',
      status: 'paid'
    }
  ];
}
