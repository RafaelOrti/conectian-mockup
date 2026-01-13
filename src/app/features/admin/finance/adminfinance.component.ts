import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface Transaction {
  id: string;
  date: string;
  user: string;
  type: 'subscription' | 'commission' | 'refund';
  typeLabel: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  statusLabel: string;
}

interface AtRiskUser {
  email: string;
  plan: string;
  riskLevel: 'high' | 'medium' | 'low';
  daysInactive: number;
}

@Component({
  selector: 'app-adminfinance',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './adminfinance.component.html',
  styleUrls: ['./adminfinance.component.scss']
})
export class AdminFinanceComponent implements OnInit {
  selectedPeriod: string = '30d';

  metrics = {
    mrr: 24850,
    mrrGrowth: 12.5,
    arr: 298200,
    arrGrowth: 18.2,
    payingCustomers: 89,
    newCustomersThisMonth: 12,
    avgLtv: 1245,
    cac: 85
  };

  revenueBreakdown = {
    ceoPro: 2871, // 29 CEOs × €99
    providerPro: 11920, // 40 providers × €298
    providerBase: 7960, // 40 providers base × €199
    commissions: 2099
  };

  churnMetrics = {
    retentionRate: 94.5,
    churnRate: 5.5,
    churnedThisMonth: 3,
    lostRevenue: 596
  };

  atRiskUsers: AtRiskUser[] = [
    { email: 'pedro@legal.com', plan: 'Free', riskLevel: 'high', daysInactive: 30 },
    { email: 'maria@tech.io', plan: 'PRO IA', riskLevel: 'medium', daysInactive: 14 },
    { email: 'hello@dataco.com', plan: 'Base', riskLevel: 'medium', daysInactive: 12 }
  ];

  recentTransactions: Transaction[] = [
    {
      id: 'TX001',
      date: '2026-01-13',
      user: 'juan@techretail.com',
      type: 'subscription',
      typeLabel: 'Suscripción',
      description: 'Renovación PRO IA mensual',
      amount: 99,
      status: 'completed',
      statusLabel: 'Completado'
    },
    {
      id: 'TX002',
      date: '2026-01-13',
      user: 'info@retailai.com',
      type: 'subscription',
      typeLabel: 'Suscripción',
      description: 'Upgrade a PRO Provider',
      amount: 298,
      status: 'completed',
      statusLabel: 'Completado'
    },
    {
      id: 'TX003',
      date: '2026-01-12',
      user: 'contact@nexus.ai',
      type: 'commission',
      typeLabel: 'Comisión',
      description: 'Comisión deal room #DR-2024-045',
      amount: 450,
      status: 'completed',
      statusLabel: 'Completado'
    },
    {
      id: 'TX004',
      date: '2026-01-12',
      user: 'ana@fashion.com',
      type: 'subscription',
      typeLabel: 'Suscripción',
      description: 'Nueva suscripción Free',
      amount: 0,
      status: 'completed',
      statusLabel: 'Completado'
    },
    {
      id: 'TX005',
      date: '2026-01-11',
      user: 'old@customer.com',
      type: 'refund',
      typeLabel: 'Reembolso',
      description: 'Reembolso proporcional cancelación',
      amount: -65,
      status: 'completed',
      statusLabel: 'Completado'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
