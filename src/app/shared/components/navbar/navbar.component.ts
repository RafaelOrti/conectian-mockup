import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
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
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationDropdownComponent, UserMenuDropdownComponent],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <!-- Logo -->
        <div class="navbar-brand">
          <a [routerLink]="getBaseRoute()" class="navbar-logo">
            <svg class="logo-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="8" r="3" fill="currentColor"/>
              <circle cx="8" cy="24" r="3" fill="currentColor"/>
              <circle cx="24" cy="24" r="3" fill="currentColor"/>
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
            [attr.aria-label]="'Deal Room'"
          >
            <span class="action-icon">🤝</span>
              <span 
                *ngIf="displayProjectCount > 0" 
                class="notification-badge"
              >
                {{ displayProjectCount }}
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
                *ngIf="displayMessageCount > 0" 
                class="notification-badge"
              >
                {{ displayMessageCount }}
              </span>
          </a>
          
          <!-- Notification Bell -->
          <div class="notification-wrapper" *ngIf="showNotificationBell">
            <button 
              class="navbar-action-btn notification-btn"
              [attr.aria-label]="'Notificaciones'"
              [attr.aria-expanded]="isNotificationDropdownOpen"
              (click)="toggleNotificationDropdown($event)"
            >
              <span class="action-icon">🔔</span>
              <span 
                *ngIf="displayNotificationCount > 0" 
                class="notification-badge"
              >
                {{ displayNotificationCount }}
              </span>
            </button>
            <app-notification-dropdown
              [notifications]="displayNotifications"
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
              (click)="toggleUserMenu($event)"
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
export class NavbarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() userRole: 'CLIENT' | 'PROVIDER' | 'ADMIN' = 'CLIENT';
  @Input() userName: string = 'Usuario';
  @Input() userAvatar?: string;
  @Input() notificationCount: number = 0;
  @Input() messageCount: number = 0;
  @Input() projectCount: number = 0;
  @Input() showSearch: boolean = false;
  @Input() showUserName: boolean = true;
  @Input() notifications: Notification[] = [];

  @Output() notificationClick = new EventEmitter<Notification>();
  @Output() menuItemClick = new EventEmitter<UserMenuItem>();
  @Output() logoutClick = new EventEmitter<void>();

  isNotificationDropdownOpen: boolean = false;
  isMessagesDropdownOpen: boolean = false;
  isUserMenuOpen: boolean = false;

  navLinks: NavLink[] = [];
  
  // Mantener estado interno de los contadores para que no cambien al navegar
  private internalNotificationCount: number = 0;
  private internalMessageCount: number = 0;
  private internalProjectCount: number = 0;
  private generatedNotifications: Notification[] = [];
  
  // Getters que usan el estado interno
  get displayNotificationCount(): number {
    // Si hay notifications array, calcular desde ahí, sino usar el estado interno
    if (this.notifications && this.notifications.length > 0) {
      return this.notifications.filter(n => !n.read).length;
    }
    return this.internalNotificationCount;
  }

  get displayMessageCount(): number {
    return this.internalMessageCount;
  }

  get displayProjectCount(): number {
    return this.internalProjectCount;
  }

  // Getter para las notificaciones que se muestran en el dropdown
  get displayNotifications(): Notification[] {
    // Si hay notificaciones en el array, usarlas
    if (this.notifications && this.notifications.length > 0) {
      return this.notifications;
    }
    
    // Si no hay array pero hay contador, usar o generar notificaciones de ejemplo
    if (this.displayNotificationCount > 0) {
      // Si ya generamos notificaciones y el contador coincide, usarlas
      if (this.generatedNotifications.length === this.displayNotificationCount) {
        return this.generatedNotifications;
      }
      // Generar nuevas notificaciones
      this.generatedNotifications = this.generateSampleNotifications();
      return this.generatedNotifications;
    }
    
    // Si el contador es 0, limpiar las notificaciones generadas
    this.generatedNotifications = [];
    return [];
  }

  // Generar notificaciones de ejemplo basadas en el contador
  private generateSampleNotifications(): Notification[] {
    const sampleNotifications: Notification[] = [];
    const notificationTypes: Array<'message' | 'proposal' | 'rfp' | 'invitation' | 'project' | 'status'> = 
      ['message', 'proposal', 'rfp', 'invitation', 'project', 'status'];
    
    const messages = [
      { type: 'message', title: 'Nuevo mensaje', message: 'Tienes un nuevo mensaje en tu Deal Room' },
      { type: 'proposal', title: 'Propuesta recibida', message: 'Has recibido una nueva propuesta' },
      { type: 'rfp', title: 'Nueva oportunidad', message: 'Hay una nueva RFP disponible para ti' },
      { type: 'invitation', title: 'Invitación recibida', message: 'Has sido invitado a un proyecto' },
      { type: 'project', title: 'Actualización de proyecto', message: 'Tu proyecto ha sido actualizado' },
      { type: 'status', title: 'Cambio de estado', message: 'El estado de tu proyecto ha cambiado' }
    ];

    for (let i = 0; i < this.displayNotificationCount; i++) {
      const messageIndex = i % messages.length;
      const message = messages[messageIndex];
      sampleNotifications.push({
        id: `sample-${i}`,
        type: message.type as any,
        title: message.title,
        message: message.message,
        time: this.getRelativeTime(i),
        read: false,
        route: this.getNotificationRoute(message.type)
      });
    }

    return sampleNotifications;
  }

  private getRelativeTime(index: number): string {
    const times = [
      'Hace unos minutos',
      'Hace 15 minutos',
      'Hace 1 hora',
      'Hace 2 horas',
      'Hace 3 horas',
      'Ayer',
      'Hace 2 días'
    ];
    return times[Math.min(index, times.length - 1)];
  }

  private getNotificationRoute(type: string): string {
    switch (type) {
      case 'message':
        return this.getMessagesRoute();
      case 'proposal':
      case 'rfp':
        return this.userRole === 'CLIENT' ? '/client/marketplace' : '/provider/leads';
      case 'project':
        return this.getProjectsRoute();
      default:
        return this.getNotificationsRoute();
    }
  }
  
  private destroy$ = new Subject<void>();
  private boundHandleClickOutside: (event: Event) => void;

  constructor(private router: Router) {
    // Bind del método una vez para poder removerlo correctamente
    this.boundHandleClickOutside = this.handleClickOutside.bind(this);
  }

  ngOnInit(): void {
    this.updateNavLinks();
    
    // Inicializar contadores internos con los valores iniciales
    this.internalNotificationCount = this.notificationCount;
    this.internalMessageCount = this.messageCount;
    this.internalProjectCount = this.projectCount;
    
    // Cerrar dropdowns al navegar
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.closeAllDropdowns();
        this.updateNavLinks();
        // NO actualizar contadores al navegar, mantener los valores actuales
      });
    
    // Cerrar dropdowns al hacer clic fuera
    this.setupClickOutsideListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.removeClickOutsideListener();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userRole']) {
      this.updateNavLinks();
    }
    
    // Si cambian las notifications, recalcular el contador desde el array (prioritario)
    if (changes['notifications']) {
      if (this.notifications && this.notifications.length > 0) {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        this.internalNotificationCount = unreadCount;
        // Limpiar notificaciones generadas si hay notificaciones reales
        this.generatedNotifications = [];
      } else if (changes['notifications'].previousValue && this.notifications.length === 0) {
        // Si el array pasa a estar vacío, mantener el contador actual
        // No resetear a 0 automáticamente
      }
    }
    
    // Solo actualizar contadores si es la primera vez o si el valor aumenta (nuevas notificaciones)
    // Esto evita que los contadores cambien al navegar entre páginas con valores diferentes
    if (changes['notificationCount']) {
      const newCount = changes['notificationCount'].currentValue;
      if (changes['notificationCount'].firstChange) {
        // Primera inicialización
        this.internalNotificationCount = newCount;
        // Generar notificaciones si es necesario
        if (newCount > 0 && (!this.notifications || this.notifications.length === 0)) {
          this.generatedNotifications = this.generateSampleNotifications();
        }
      } else {
        // Solo actualizar si el nuevo valor es mayor (nuevas notificaciones llegaron)
        if (newCount > this.internalNotificationCount) {
          this.internalNotificationCount = newCount;
          // Regenerar notificaciones si no hay array real
          if (!this.notifications || this.notifications.length === 0) {
            this.generatedNotifications = this.generateSampleNotifications();
          }
        }
      }
    }
    
    if (changes['messageCount']) {
      const newCount = changes['messageCount'].currentValue;
      if (changes['messageCount'].firstChange) {
        this.internalMessageCount = newCount;
      } else {
        if (newCount > this.internalMessageCount) {
          this.internalMessageCount = newCount;
        }
      }
    }
    
    if (changes['projectCount']) {
      const newCount = changes['projectCount'].currentValue;
      if (changes['projectCount'].firstChange) {
        this.internalProjectCount = newCount;
      } else {
        if (newCount > this.internalProjectCount) {
          this.internalProjectCount = newCount;
        }
      }
    }
  }

  private updateNavLinks(): void {
    switch (this.userRole) {
      case 'CLIENT':
        this.navLinks = [
          { label: 'Marketplace', route: '/client/marketplace', icon: '🏢' },
          { label: 'Innovación', route: '/client/publish-rfid', icon: '💡' },
          { label: 'Deal Room', route: '/client/projects', icon: '🤝' }
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

  get showNotificationBell(): boolean {
    return true;
  }

  private closeAllDropdowns(): void {
    this.isNotificationDropdownOpen = false;
    this.isMessagesDropdownOpen = false;
    this.isUserMenuOpen = false;
  }

  private setupClickOutsideListener(): void {
    // Usar setTimeout para evitar cerrar inmediatamente después de abrir
    setTimeout(() => {
      document.addEventListener('click', this.boundHandleClickOutside);
    }, 0);
  }

  private removeClickOutsideListener(): void {
    document.removeEventListener('click', this.boundHandleClickOutside);
  }

  private handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const navbarElement = target.closest('.navbar');
    
    if (!navbarElement) {
      this.closeAllDropdowns();
      return;
    }

    // Si el clic no es en los elementos de dropdown, cerrarlos
    const isNotificationClick = target.closest('.notification-wrapper');
    const isUserMenuClick = target.closest('.user-menu-wrapper');
    const isMessagesClick = target.closest('.messages-wrapper');
    
    if (!isNotificationClick && this.isNotificationDropdownOpen) {
      this.isNotificationDropdownOpen = false;
    }
    
    if (!isUserMenuClick && this.isUserMenuOpen) {
      this.isUserMenuOpen = false;
    }
    
    if (!isMessagesClick && this.isMessagesDropdownOpen) {
      this.isMessagesDropdownOpen = false;
    }
  }

  getMessagesRoute(): string {
    if (this.userRole === 'CLIENT') {
      return '/client/deal-room/deal-2';
    } else if (this.userRole === 'PROVIDER') {
      return '/provider/deal-room/deal-2';
    }
    return '/deal-room/deal-2';
  }

  toggleNotificationDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isNotificationDropdownOpen = !this.isNotificationDropdownOpen;
    if (this.isNotificationDropdownOpen) {
      this.isUserMenuOpen = false;
      this.isMessagesDropdownOpen = false;
    }
  }

  closeNotificationDropdown(): void {
    this.isNotificationDropdownOpen = false;
  }

  toggleUserMenu(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isUserMenuOpen = !this.isUserMenuOpen;
    if (this.isUserMenuOpen) {
      this.isNotificationDropdownOpen = false;
      this.isMessagesDropdownOpen = false;
    }
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  handleNotificationClick(notification: Notification): void {
    this.closeNotificationDropdown();
    this.notificationClick.emit(notification);
    
    // Si la notificación tiene una ruta, navegar a ella
    if (notification.route) {
      this.router.navigate([notification.route]);
    }
  }

  markAllNotificationsRead(): void {
    // Si hay notificaciones reales, marcarlas como leídas
    if (this.notifications && this.notifications.length > 0) {
      this.notifications = this.notifications.map(n => ({ ...n, read: true }));
    }
    // Marcar las notificaciones generadas como leídas también
    if (this.generatedNotifications.length > 0) {
      this.generatedNotifications = this.generatedNotifications.map(n => ({ ...n, read: true }));
    }
    // Resetear el contador interno
    this.internalNotificationCount = 0;
  }

  getUserMenuItems(): UserMenuItem[] {
    const baseItems: UserMenuItem[] = [];

    if (this.userRole === 'CLIENT') {
      baseItems.push(
        { label: 'Ecosistema Conectian', route: '/client/ecosystem', icon: '🌐' },
        { label: 'Referidos y Networking', route: '/client/referrals', icon: '🌟' },
        { label: 'Mi Cuenta', route: '/client/profile-hub', icon: '👤' }
      );
    } else if (this.userRole === 'PROVIDER') {
      baseItems.push(
        { label: 'Ecosistema Conectian', route: '/provider/ecosystem', icon: '🌐' },
        { label: 'Referidos y Networking', route: '/provider/referrals', icon: '🌟' },
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
    this.closeUserMenu();
    this.menuItemClick.emit(item);
    
    // Si el item tiene una ruta, navegar a ella
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  handleLogout(): void {
    this.closeUserMenu();
    this.logoutClick.emit();
  }
}
