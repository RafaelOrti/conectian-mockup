import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

interface Notification {
  id: string;
  type: 'deal-room' | 'proposal' | 'message' | 'milestone' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  icon: string;
}

@Component({
  selector: 'app-clientnotifications',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent, BadgeComponent],
  templateUrl: './clientnotifications.component.html',
  styleUrls: ['./clientnotifications.component.scss']
})
export class ClientNotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  unreadCount: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    // TODO: Load from backend API
    this.notifications = [
      {
        id: '1',
        type: 'deal-room',
        title: 'Nuevo mensaje en Deal Room',
        message: 'Nexus Solutions ha enviado un mensaje en el proyecto "Chatbot para E-commerce"',
        timestamp: 'Hace 5 minutos',
        read: false,
        actionUrl: '/client/deal-room/deal-1',
        icon: '💬'
      },
      {
        id: '2',
        type: 'proposal',
        title: 'Propuesta actualizada',
        message: 'DataLogic AI ha actualizado la propuesta para "Sistema de Detección de Fraude"',
        timestamp: 'Hace 1 hora',
        read: false,
        actionUrl: '/client/deal-room/deal-2',
        icon: '📄'
      },
      {
        id: '3',
        type: 'milestone',
        title: 'Hito completado',
        message: 'El hito "Análisis de Requisitos" ha sido completado en el proyecto "Chatbot para E-commerce"',
        timestamp: 'Hace 2 horas',
        read: false,
        actionUrl: '/client/deal-room/deal-1',
        icon: '✅'
      },
      {
        id: '4',
        type: 'message',
        title: 'Nuevo mensaje de proveedor',
        message: 'Optimizer AI ha respondido a tu consulta sobre "Optimización de Logística"',
        timestamp: 'Hace 3 horas',
        read: true,
        actionUrl: '/provider/1',
        icon: '📧'
      },
      {
        id: '5',
        type: 'deal-room',
        title: 'Documento compartido',
        message: 'Nexus Solutions ha compartido un nuevo documento en el Deal Room',
        timestamp: 'Ayer',
        read: true,
        actionUrl: '/client/deal-room/deal-1',
        icon: '📎'
      },
      {
        id: '6',
        type: 'system',
        title: 'Bienvenido a CONECTIAN',
        message: 'Tu cuenta ha sido verificada. ¡Comienza a explorar casos de uso!',
        timestamp: 'Hace 2 días',
        read: true,
        icon: '🎉'
      },
      {
        id: '7',
        type: 'proposal',
        title: 'Nueva propuesta recibida',
        message: 'DataLogic AI ha enviado una propuesta para tu caso de uso "Sistema de Detección de Fraude"',
        timestamp: 'Hace 3 días',
        read: true,
        actionUrl: '/client/deal-room/deal-2',
        icon: '💰'
      }
    ];

    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }

  markAsRead(notification: Notification): void {
    if (!notification.read) {
      notification.read = true;
      this.unreadCount--;
      // TODO: Update in backend
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => {
      if (!n.read) {
        n.read = true;
      }
    });
    this.unreadCount = 0;
    // TODO: Update in backend
  }

  handleNotificationClick(notification: Notification): void {
    this.markAsRead(notification);
    if (notification.actionUrl) {
      this.router.navigate([notification.actionUrl]);
    }
  }

  deleteNotification(notification: Notification, event: Event): void {
    event.stopPropagation();
    this.notifications = this.notifications.filter(n => n.id !== notification.id);
    if (!notification.read) {
      this.unreadCount--;
    }
    // TODO: Delete from backend
  }

  getNotificationClass(notification: Notification): string {
    return notification.read ? 'notification-read' : 'notification-unread';
  }
}
