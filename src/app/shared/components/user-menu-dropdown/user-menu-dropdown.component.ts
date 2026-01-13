import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface UserMenuItem {
  label: string;
  route: string;
  icon: string;
  badge?: number;
}

@Component({
  selector: 'app-user-menu-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="user-menu-wrapper" *ngIf="isOpen">
      <div class="user-menu">
        <div class="user-menu-header">
          <div class="user-info">
            <div 
              class="user-avatar-large"
              [style.background]="userAvatar ? 'url(' + userAvatar + ')' : 'linear-gradient(135deg, #0d86ff 0%, #6b5cf0 100%)'"
              [style.background-size]="userAvatar ? 'cover' : 'auto'"
              [style.background-position]="userAvatar ? 'center' : 'auto'"
            >
              <span *ngIf="!userAvatar" class="user-avatar-initial">
                {{ userName.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div class="user-details">
              <div class="user-name-large">{{ userName }}</div>
              <div class="user-role">{{ userRoleLabel }}</div>
            </div>
          </div>
        </div>
        
        <div class="user-menu-divider"></div>
        
        <div class="user-menu-items">
          <a 
            *ngFor="let item of menuItems"
            [routerLink]="item.route"
            class="user-menu-item"
            (click)="handleItemClick(item)"
          >
            <span class="menu-item-icon">{{ item.icon }}</span>
            <span class="menu-item-label">{{ item.label }}</span>
            <span *ngIf="item.badge && item.badge > 0" class="menu-item-badge">
              {{ item.badge }}
            </span>
          </a>
        </div>
        
        <div class="user-menu-divider"></div>
        
        <div class="user-menu-footer">
          <button class="logout-btn" (click)="handleLogout()">
            <span class="menu-item-icon">🚪</span>
            <span class="menu-item-label">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./user-menu-dropdown.component.scss']
})
export class UserMenuDropdownComponent {
  @Input() isOpen: boolean = false;
  @Input() userName: string = 'Usuario';
  @Input() userAvatar?: string;
  @Input() userRole: 'CLIENT' | 'PROVIDER' | 'ADMIN' = 'CLIENT';
  @Input() menuItems: UserMenuItem[] = [];
  @Input() profileRoute: string = '/profile';
  @Output() close = new EventEmitter<void>();
  @Output() itemClick = new EventEmitter<UserMenuItem>();
  @Output() logout = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu-wrapper') && 
        !target.closest('.navbar-user')) {
      this.closeDropdown();
    }
  }

  get userRoleLabel(): string {
    const labels: { [key: string]: string } = {
      'CLIENT': 'Cliente',
      'PROVIDER': 'Proveedor',
      'ADMIN': 'Administrador'
    };
    return labels[this.userRole] || 'Usuario';
  }

  handleItemClick(item: UserMenuItem): void {
    this.itemClick.emit(item);
    this.closeDropdown();
  }

  handleLogout(): void {
    this.logout.emit();
    this.closeDropdown();
  }

  closeDropdown(): void {
    this.close.emit();
  }
}

