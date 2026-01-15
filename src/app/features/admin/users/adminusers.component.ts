import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';

interface User {
  id: string;
  email: string;
  company?: string;
  plan: string;
  planPrice?: string;
  active: boolean;
  lastActive: string;
  joined: string;
  type: 'ceo' | 'provider';
  status?: 'pending' | 'paused' | 'active';
  actions?: number;
  leads?: number;
  dealRooms?: number;
  rating?: number;
}

@Component({
  selector: 'app-adminusers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    CardModule,
    ButtonModule,
    TagModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    TabViewModule,
    BadgeModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.scss']
})
export class AdminUsersComponent implements OnInit {
  activeTab: number = 0;
  searchQuery: string = '';
  selectedStatus: any = { label: 'Todos', value: 'all' };
  
  statusOptions = [
    { label: 'Todos', value: 'all' },
    { label: 'Activos', value: 'active' },
    { label: 'Inactivos', value: 'inactive' },
    { label: 'Pendientes', value: 'pending' }
  ];

  // CEOs Data
  ceos: User[] = [];
  filteredCEOs: User[] = [];
  ceoStats = {
    total: 234,
    free: 205,
    pro: 29,
    active: 187
  };

  // Providers Data
  providers: User[] = [];
  filteredProviders: User[] = [];
  providerStats = {
    total: 50,
    active: 40,
    pending: 2,
    paused: 8,
    mrr: 9950
  };

  // Pending approvals
  pendingApprovals: User[] = [];

  // Selected user for detail view
  selectedUser: User | null = null;
  selectedUsers: User[] = [];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadCEOs();
    this.loadProviders();
    this.loadPendingApprovals();
  }

  loadCEOs(): void {
    this.ceos = [
      {
        id: '1',
        email: 'juan@techretail.com',
        company: 'TechRetail',
        plan: 'PRO IA',
        planPrice: '€99/mes',
        active: true,
        lastActive: 'hace 5h',
        joined: '15 Dic 2025',
        type: 'ceo',
        actions: 145,
        dealRooms: 2
      },
      {
        id: '2',
        email: 'ana@fashion.com',
        company: 'Fashion Co',
        plan: 'Free',
        active: true,
        lastActive: 'hace 2d',
        joined: '18 Dic 2025',
        type: 'ceo'
      },
      {
        id: '3',
        email: 'pedro@legal.com',
        company: 'Legal Services',
        plan: 'Free',
        active: false,
        lastActive: 'hace 30d',
        joined: '1 Nov 2025',
        type: 'ceo'
      }
    ];
    this.filteredCEOs = [...this.ceos];
  }

  loadProviders(): void {
    this.providers = [
      {
        id: '1',
        email: 'info@retailai.com',
        company: 'RetailAI',
        plan: 'PRO',
        planPrice: '€298/mes',
        active: true,
        lastActive: 'hace 2h',
        joined: '10 Nov 2025',
        type: 'provider',
        status: 'active',
        leads: 48,
        rating: 4.8
      },
      {
        id: '2',
        email: 'contact@mlexpert.com',
        company: 'MLExpert',
        plan: 'Base',
        planPrice: '€199/mes',
        active: false,
        lastActive: 'N/A',
        joined: '20 Dic 2025',
        type: 'provider',
        status: 'pending',
        leads: 0
      },
      {
        id: '3',
        email: 'hello@dataco.com',
        company: 'DataCo',
        plan: 'Base',
        planPrice: '€199/mes',
        active: false,
        lastActive: 'hace 5d',
        joined: '5 Dic 2025',
        type: 'provider',
        status: 'paused',
        leads: 12
      }
    ];
    this.filteredProviders = [...this.providers];
  }

  loadPendingApprovals(): void {
    this.pendingApprovals = this.providers.filter(p => p.status === 'pending');
  }

  onGlobalFilter(table: any, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  editUser(user: User): void {
    this.messageService.add({ 
      severity: 'info', 
      summary: 'Editar Usuario', 
      detail: `Abriendo editor para ${user.email}` 
    });
  }

  suspendUser(user: User): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de suspender a ${user.email}?`,
      header: 'Confirmar Suspensión',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Usuario Suspendido', 
          detail: `${user.email} ha sido suspendido` 
        });
      }
    });
  }

  deleteUser(user: User): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de eliminar a ${user.email}? Esta acción no se puede deshacer.`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Usuario Eliminado', 
          detail: `${user.email} ha sido eliminado` 
        });
      }
    });
  }

  approveProvider(user: User): void {
    user.status = 'active';
    user.active = true;
    this.loadPendingApprovals();
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Proveedor Aprobado', 
      detail: `${user.email} ha sido aprobado` 
    });
  }

  rejectProvider(user: User): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de rechazar a ${user.email}?`,
      header: 'Confirmar Rechazo',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        // Remove from pending
        this.pendingApprovals = this.pendingApprovals.filter(p => p.id !== user.id);
        this.messageService.add({ 
          severity: 'info', 
          summary: 'Proveedor Rechazado', 
          detail: `${user.email} ha sido rechazado` 
        });
      }
    });
  }

  inviteUser(type: 'ceo' | 'provider'): void {
    this.messageService.add({ 
      severity: 'info', 
      summary: 'Invitar Usuario', 
      detail: `Abriendo formulario para invitar ${type === 'ceo' ? 'CEO' : 'Proveedor'}` 
    });
  }

  exportCSV(): void {
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Exportar CSV', 
      detail: 'Generando archivo CSV...' 
    });
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warning' | 'danger' {
    const map: { [key: string]: 'success' | 'info' | 'warning' | 'danger' } = {
      'active': 'success',
      'pending': 'warning',
      'paused': 'secondary' as 'info',
      'inactive': 'danger'
    };
    return map[status] || 'info';
  }

  getPlanSeverity(plan: string): 'success' | 'info' | 'warning' | 'danger' {
    if (plan.includes('PRO')) return 'success';
    if (plan.includes('Base')) return 'info';
    return 'secondary' as 'info';
  }
}
