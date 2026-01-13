import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { BadgeComponent } from '../badge/badge.component';
import { NotificationDropdownComponent, Notification } from '../notification-dropdown/notification-dropdown.component';
import { UserMenuDropdownComponent, UserMenuItem } from '../user-menu-dropdown/user-menu-dropdown.component';

interface NavLink {
  label: string;
  route: string;
  icon: string;
}

/**
 * Navbar Component
 * Top navigation bar with logo, navigation links, notifications, and user menu
 * 
 * Usage:
 * <app-navbar 
 *   [userRole]="'CLIENT'" 
 *   [notificationCount]="3"
 *   [userName]="'Juan Pérez'"
 *   [userAvatar]="avatarUrl"
 * ></app-navbar>
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, BadgeComponent, NotificationDropdownComponent, UserMenuDropdownComponent],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <!-- Logo -->
        <div class="navbar-brand">
          <a [routerLink]="getBaseRoute()" class="navbar-logo">
            <svg class="logo-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Three connected circles forming a triangle -->
              <circle cx="16" cy="8" r="3" fill="currentColor"/>
              <circle cx="8" cy="24" r="3" fill="currentColor"/>
              <circle cx="24" cy="24" r="3" fill="currentColor"/>
              <!-- Connecting lines -->
              <line x1="16" y1="8" x2="8" y2="24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="16" y1="8" x2="24" y2="24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="8" y1="24" x2="24" y2="24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span class="logo-text">Conectian</span>
          </a>
        </div>
        
        <!-- Navigation Links -->
        <div class="navbar-nav">
          <a 
            *ngFor="let link of navLinks"
            [routerLink]="link.route"
            routerLinkActive="active"
            class="nav-link"
          >
            <span class="nav-icon">{{ link.icon }}</span>
            <span class="nav-label">{{ link.label }}</span>
          </a>
        </div>
        
        <!-- Right Section -->
        <div class="navbar-actions">
          <!-- Projects Icon -->
          <a 
            *ngIf="userRole !== 'ADMIN'"
            [routerLink]="getProjectsRoute()" 
            class="navbar-action-btn projects-btn"
            [attr.aria-label]="'Proyectos'"
          >
            <span class="action-icon">📁</span>
            <span 
              *ngIf="projectCount > 0" 
              class="notification-badge"
            >
              {{ projectCount }}
            </span>
          </a>

          <!-- Messages Icon -->
          <a 
            *ngIf="userRole !== 'ADMIN'"
            [routerLink]="getMessagesRoute()" 
            class="navbar-action-btn messages-btn"
            [attr.aria-label]="'Mensajes'"
          >
            <span class="action-icon">💬</span>
            <span 
              *ngIf="messageCount > 0" 
              class="notification-badge"
            >
              {{ messageCount }}
            </span>
          </a>
          
          <!-- Notification Bell -->
          <div class="notification-wrapper" *ngIf="showNotificationBell">
            <button 
              class="navbar-action-btn notification-btn"
              [attr.aria-label]="'Notificaciones'"
              (click)="toggleNotificationDropdown()"
            >
              <span class="action-icon">🔔</span>
              <span 
                *ngIf="notificationCount > 0" 
                class="notification-badge"
              >
                {{ notificationCount }}
              </span>
            </button>
            <app-notification-dropdown
              [notifications]="notifications"
              [isOpen]="isNotificationDropdownOpen"
              [viewAllRoute]="getNotificationsRoute()"
              (close)="closeNotificationDropdown()"
              (notificationClick)="handleNotificationClick($event)"
              (markAllRead)="markAllNotificationsRead()"
            ></app-notification-dropdown>
          </div>
          
          <!-- User Menu -->
          <div class="user-menu-wrapper">
            <div 
              class="navbar-user"
              (click)="toggleUserMenu()"
            >
              <div 
                class="user-avatar"
                [style.background]="userAvatar ? 'url(' + userAvatar + ')' : 'linear-gradient(135deg, #0d86ff 0%, #6b5cf0 100%)'"
                [style.background-size]="userAvatar ? 'cover' : 'auto'"
                [style.background-position]="userAvatar ? 'center' : 'auto'"
              >
                <span *ngIf="!userAvatar" class="user-avatar-initial">{{ userName.charAt(0).toUpperCase() }}</span>
              </div>
              <span class="user-name" *ngIf="showUserName">{{ userName }}</span>
              <span class="user-chevron">▼</span>
            </div>
            <app-user-menu-dropdown
              [isOpen]="isUserMenuOpen"
              [userName]="userName"
              [userAvatar]="userAvatar"
              [userRole]="userRole"
              [menuItems]="getUserMenuItems()"
              [profileRoute]="getProfileRoute()"
              (close)="closeUserMenu()"
              (itemClick)="handleMenuItemClick($event)"
              (logout)="handleLogout()"
            ></app-user-menu-dropdown>
          </div>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() userRole: 'CLIENT' | 'PROVIDER' | 'ADMIN' = 'CLIENT';
  @Input() userName: string = 'Usuario';
  @Input() userAvatar?: string;
  @Input() notificationCount: number = 0;
  @Input() messageCount: number = 0;
  @Input() projectCount: number = 0;
  @Input() showSearch: boolean = false;
  @Input() showUserName: boolean = true;
  @Input() notifications: Notification[] = [];

  isNotificationDropdownOpen: boolean = false;
  isMessagesDropdownOpen: boolean = false;
  isUserMenuOpen: boolean = false;

  navLinks: NavLink[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateNavLinks();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateNavLinks();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userRole']) {
      this.updateNavLinks();
    }
  }

  private updateNavLinks(): void {
    switch (this.userRole) {
      case 'CLIENT':
        this.navLinks = [
          { label: 'Marketplace', route: '/client/marketplace', icon: '🏢' },
          { label: 'Innovación', route: '/client/publish-rfid', icon: '💡' },
          { label: 'Proyectos', route: '/client/projects', icon: '📁' }
        ];
        break;

      case 'PROVIDER':
        this.navLinks = [
          { label: 'Marketplace', route: '/provider/marketplace', icon: '🏢' },
          { label: 'Leads', route: '/provider/leads', icon: '📊' },
          { label: 'Deal Room', route: '/provider/project-management', icon: '🤝' }
        ];
        break;

      case 'ADMIN':
        this.navLinks = [
          { label: 'Dashboard', route: '/admin/dashboard', icon: '🏠' },
          { label: 'Usuarios', route: '/admin/users', icon: '👥' },
          { label: 'Contenido', route: '/admin/content', icon: '📄' },
          { label: 'Finanzas', route: '/admin/finance', icon: '💰' },
          { label: 'Configuración', route: '/admin/config', icon: '⚙️' },
          { label: 'Monitoreo', route: '/admin/monitoring', icon: '📊' }
        ];
        break;

      default:
        this.navLinks = [];
    }
  }

  getBaseRoute(): string {
    switch (this.userRole) {
      case 'CLIENT':
        return '/client/marketplace';
      case 'PROVIDER':
        return '/provider/marketplace';
      case 'ADMIN':
        return '/admin/dashboard';
      default:
        return '/';
    }
  }

  getNotificationsRoute(): string {
    switch (this.userRole) {
      case 'CLIENT':
        return '/client/notifications';
      case 'PROVIDER':
        return '/provider/notifications';
      case 'ADMIN':
        return '/admin/notifications';
      default:
        return '/notifications';
    }
  }

  getActionRoute(): string {
    switch (this.userRole) {
      case 'CLIENT':
        return '/client/project-management';
      case 'PROVIDER':
        return '/provider/project-management';
      case 'ADMIN':
        return '/admin/notifications';
      default:
        return '/notifications';
    }
  }

  getActionLabel(): string {
    switch (this.userRole) {
      case 'CLIENT':
      case 'PROVIDER':
        return 'Proyectos';
      case 'ADMIN':
        return 'Notificaciones';
      default:
        return 'Notificaciones';
    }
  }

  getActionIcon(): string {
    switch (this.userRole) {
      case 'CLIENT':
      case 'PROVIDER':
        return '📁';
      case 'ADMIN':
        return '🔔';
      default:
        return '🔔';
    }
  }

  shouldShowBadge(): boolean {
    // Para CLIENT y PROVIDER, mostrar badge con número de proyectos activos
    // Para ADMIN, mostrar badge de notificaciones
    return true;
  }

  getBadgeCount(): number {
    // Por ahora retornamos notificationCount, pero esto debería ser
    // el número de proyectos activos para CLIENT/PROVIDER
    return this.notificationCount;
  }

  get showNotificationBell(): boolean {
    return true; // Always show notification bell
  }

  getMessagesRoute(): string {
    // Redirigir al chat del Deal Room (Demo ID: deal-2)
    return '/deal-room/deal-2';
  }

  toggleNotificationDropdown(): void {
    this.isNotificationDropdownOpen = !this.isNotificationDropdownOpen;
    if (this.isNotificationDropdownOpen) {
      this.isUserMenuOpen = false;
      this.isMessagesDropdownOpen = false;
    }
  }

  closeNotificationDropdown(): void {
    this.isNotificationDropdownOpen = false;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    if (this.isUserMenuOpen) {
      this.isNotificationDropdownOpen = false;
    }
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  handleNotificationClick(notification: Notification): void {
    // Navigate to notification route if available
    if (notification.route) {
      // Router navigation will be handled by the dropdown component
    }
  }

  markAllNotificationsRead(): void {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
    this.notificationCount = 0;
  }

  getUserMenuItems(): UserMenuItem[] {
    const baseItems: UserMenuItem[] = [];

    if (this.userRole === 'CLIENT') {
      baseItems.push(
        { label: 'Marketplace', route: '/client/marketplace', icon: '🏢' },
        { label: 'Explorar Ideas', route: '/client/innovation-center', icon: '💡' },
        { label: 'Deal Room', route: '/client/projects', icon: '🤝' },
        { label: 'Ecosistema Conectian', route: '/client/ecosystem', icon: '🌐' },
        { label: 'Referidos y Networking', route: '/client/referrals', icon: '🌟' },
        { label: 'Pagos', route: '/client/payments', icon: '💳' },
        { label: 'Mi Cuenta', route: '/client/profile-hub', icon: '👤' }
      );
    } else if (this.userRole === 'PROVIDER') {
      baseItems.push(
        { label: 'Marketplace', route: '/provider/marketplace', icon: '🏢' },
        { label: 'Mis Casos', route: '/provider/cases', icon: '📁' },
        { label: 'Deal Room', route: '/provider/project-management', icon: '🤝' },
        { label: 'Leads', route: '/provider/leads', icon: '📊' },
        { label: 'Ecosistema Conectian', route: '/provider/ecosystem', icon: '🌐' },
        { label: 'Referidos y Networking', route: '/provider/referrals', icon: '🌟' },
        { label: 'Pagos', route: '/provider/payments', icon: '💳' },
        { label: 'Mi Cuenta', route: '/provider/profile-hub', icon: '👤' }
      );
    } else if (this.userRole === 'ADMIN') {
      baseItems.push(
        { label: 'Configuración', route: '/admin/config', icon: '⚙️' },
        { label: 'Mi Perfil', route: '/admin/profile', icon: '👤' }
      );
    }

    return baseItems;
  }

  getProfileRoute(): string {
    switch (this.userRole) {
      case 'CLIENT':
        return '/client/profile-hub';
      case 'PROVIDER':
        return '/provider/profile-hub';
      case 'ADMIN':
        return '/admin/profile';
      default:
        return '/profile';
    }
  }

  getProjectsRoute(): string {
    switch (this.userRole) {
      case 'CLIENT':
        return '/client/projects';
      case 'PROVIDER':
        return '/provider/project-management';
      default:
        return '/projects';
    }
  }

  handleMenuItemClick(item: UserMenuItem): void {
    // Navigation is handled by routerLink in the dropdown
  }

  handleLogout(): void {
    // Emit logout event or handle logout logic
    console.log('Logout clicked');
  }
}
