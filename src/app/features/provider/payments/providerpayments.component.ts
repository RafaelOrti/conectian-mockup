import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-providerpayments',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './providerpayments.component.html',
  styleUrls: ['./providerpayments.component.scss']
})
export class ProviderPaymentsComponent {
  transactions = [
    {
      id: 'TX-8921',
      date: '12 Ene 2026',
      description: 'Pago Hito 1 - Chatbot',
      client: 'Repsol',
      amount: '€5,000.00',
      status: 'completed'
    },
    {
      id: 'TX-8915',
      date: '08 Ene 2026',
      description: 'Consultoría Inicial',
      client: 'BBVA',
      amount: '€2,500.00',
      status: 'completed'
    },
    {
      id: 'TX-8890',
      date: '02 Ene 2026',
      description: 'Pago Mensual - Mantenimiento',
      client: 'Inditex',
      amount: '€1,200.00',
      status: 'pending'
    },
    {
      id: 'TX-8850',
      date: '28 Dic 2025',
      description: 'Implementación Piloto',
      client: 'Mercadona',
      amount: '€3,750.00',
      status: 'completed'
    }
  ];
}
