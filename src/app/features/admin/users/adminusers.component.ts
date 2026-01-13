import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

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
  imports: [CommonModule, FormsModule, NavbarComponent, CardComponent, ButtonComponent, BadgeComponent],
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.scss']
})
export class AdminUsersComponent implements OnInit {
  activeTab: 'ceos' | 'providers' | 'pending' = 'ceos';
  searchQuery: string = '';
  selectedStatus: 'all' | 'active' | 'inactive' | 'pending' = 'all';

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

  // Selected user for detail view
  selectedUser: User | null = null;
  selectedUsers: string[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadCEOs();
    this.loadProviders();
  }

  loadCEOs(): void {
    // TODO: Load from API
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
    // TODO: Load from API
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

  filterUsers(): void {
    if (this.activeTab === 'ceos') {
      this.filteredCEOs = this.ceos.filter(user => {
        const matchesSearch = !this.searchQuery ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (user.company && user.company.toLowerCase().includes(this.searchQuery.toLowerCase()));
        const matchesStatus = this.selectedStatus === 'all' ||
          (this.selectedStatus === 'active' && user.active) ||
          (this.selectedStatus === 'inactive' && !user.active);
        return matchesSearch && matchesStatus;
      });
    } else {
      this.filteredProviders = this.providers.filter(user => {
        const matchesSearch = !this.searchQuery ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (user.company && user.company.toLowerCase().includes(this.searchQuery.toLowerCase()));
        const matchesStatus = this.selectedStatus === 'all' ||
          (this.selectedStatus === 'active' && user.active) ||
          (this.selectedStatus === 'pending' && user.status === 'pending') ||
          (this.selectedStatus === 'inactive' && user.status === 'paused');
        return matchesSearch && matchesStatus;
      });
    }
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  toggleUserSelection(userId: string): void {
    const index = this.selectedUsers.indexOf(userId);
    if (index > -1) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(userId);
    }
  }

  bulkAction(action: string): void {
    console.log('Bulk action:', action, 'on users:', this.selectedUsers);
    // TODO: Implement bulk actions
  }

  editUser(user: User): void {
    console.log('Edit user:', user);
    // TODO: Open edit modal
  }

  suspendUser(user: User): void {
    console.log('Suspend user:', user);
    // TODO: Implement suspend
  }

  deleteUser(user: User): void {
    if (confirm(`¿Estás seguro de eliminar a ${user.email}?`)) {
      console.log('Delete user:', user);
      // TODO: Implement delete
    }
  }

  approveProvider(user: User): void {
    console.log('Approve provider:', user);
    user.status = 'active';
    user.active = true;
    // TODO: Call API
  }

  rejectProvider(user: User): void {
    console.log('Reject provider:', user);
    // TODO: Implement reject
  }

  inviteUser(type: 'ceo' | 'provider'): void {
    console.log('Invite', type);
    // TODO: Open invite modal
  }

  exportCSV(): void {
    console.log('Export CSV');
    // TODO: Implement CSV export
  }

  toggleSelectAll(): void {
    if (this.areAllSelected()) {
      this.selectedUsers = [];
    } else {
      this.selectedUsers = this.filteredCEOs.map(u => u.id);
    }
  }

  areAllSelected(): boolean {
    return this.selectedUsers.length === this.filteredCEOs.length && this.filteredCEOs.length > 0;
  }
}
