import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Notification {
  id: string;
  type: 'message' | 'proposal' | 'rfp' | 'invitation' | 'project' | 'status';
  title: string;
  message: string;
  time: string;
  read: boolean;
  route?: string;
  icon?: string;
}

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="notification-dropdown-wrapper" *ngIf="isOpen">
      <div class="notification-dropdown">
        <div class="notification-header">
          <h3>Notificaciones</h3>
          <button 
            class="mark-all-read-btn"
            (click)="markAllAsRead()"
            *ngIf="unreadCount > 0"
          >
            Marcar todo como leído
          </button>
        </div>
        
        <div class="notification-list">
          <div 
            *ngFor="let notification of notifications"
            class="notification-item"
            [class.unread]="!notification.read"
            (click)="handleNotificationClick(notification)"
          >
            <div class="notification-icon">
              <span>{{ getNotificationIcon(notification.type) }}</span>
            </div>
            <div class="notification-content">
              <div class="notification-title">{{ notification.title }}</div>
              <div class="notification-message">{{ notification.message }}</div>
              <div class="notification-time">{{ notification.time }}</div>
            </div>
            <div class="notification-indicator" *ngIf="!notification.read"></div>
          </div>
          
          <div *ngIf="notifications.length === 0" class="no-notifications">
            <span class="no-notifications-icon">🔔</span>
            <p>No tienes notificaciones</p>
          </div>
        </div>
        
        <div class="notification-footer">
          <a [routerLink]="viewAllRoute" class="view-all-link">
            Ver todas las notificaciones →
          </a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./notification-dropdown.component.scss']
})
export class NotificationDropdownComponent {
  @Input() notifications: Notification[] = [];
  @Input() isOpen: boolean = false;
  @Input() viewAllRoute: string = '/notifications';
  @Output() close = new EventEmitter<void>();
  @Output() notificationClick = new EventEmitter<Notification>();
  @Output() markAllRead = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-dropdown-wrapper') && 
        !target.closest('.navbar-action-btn')) {
      this.closeDropdown();
    }
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getNotificationIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'message': '💬',
      'proposal': '📄',
      'rfp': '📋',
      'invitation': '✉️',
      'project': '📁',
      'status': '✅'
    };
    return icons[type] || '🔔';
  }

  handleNotificationClick(notification: Notification): void {
    this.notificationClick.emit(notification);
    this.closeDropdown();
  }

  markAllAsRead(): void {
    this.markAllRead.emit();
  }

  closeDropdown(): void {
    this.close.emit();
  }
}

