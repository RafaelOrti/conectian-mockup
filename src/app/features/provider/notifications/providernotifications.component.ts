import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

interface Notification {
  id: string;
  type: 'deal-room' | 'lead' | 'message' | 'case-accepted' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  icon: string;
}

@Component({
  selector: 'app-providernotifications',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent, BadgeComponent],
  templateUrl: './providernotifications.component.html',
  styleUrls: ['./providernotifications.component.scss']
})
export class ProviderNotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  unreadCount: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    // TODO: Load from backend API
    this.notifications = [
      {
        id: '1',
        type: 'lead',
        title: 'Nuevo lead recibido',
        message: 'Repsol ha mostrado interés en tu caso de uso "Chatbot para E-commerce"',
        timestamp: 'Hace 10 minutos',
        read: false,
        actionUrl: '/provider/leads',
        icon: '🎯'
      },
      {
        id: '2',
        type: 'deal-room',
        title: 'Nuevo mensaje en Deal Room',
        message: 'Carlos Martínez (Repsol) ha respondido en el proyecto "Chatbot para E-commerce"',
        timestamp: 'Hace 30 minutos',
        read: false,
        actionUrl: '/deal-room/deal-1',
        icon: '💬'
      },
      {
        id: '3',
        type: 'case-accepted',
        title: 'Caso de uso aceptado',
        message: 'BBVA ha aceptado tu caso de uso "Sistema de Detección de Fraude". Se ha creado un Deal Room.',
        timestamp: 'Hace 2 horas',
        read: false,
        actionUrl: '/deal-room/deal-2',
        icon: '✅'
      },
      {
        id: '4',
        type: 'message',
        title: 'Nueva consulta de cliente',
        message: 'Inditex ha enviado una consulta sobre tu caso de uso "Optimización de Logística"',
        timestamp: 'Hace 4 horas',
        read: true,
        actionUrl: '/provider/leads',
        icon: '📧'
      },
      {
        id: '5',
        type: 'deal-room',
        title: 'Documento revisado',
        message: 'Repsol ha revisado el documento "Propuesta_Chatbot_E-commerce_v1.pdf"',
        timestamp: 'Ayer',
        read: true,
        actionUrl: '/deal-room/deal-1',
        icon: '👁️'
      },
      {
        id: '6',
        type: 'system',
        title: 'Caso de uso publicado',
        message: 'Tu caso de uso "Sistema de Detección de Fraude" ha sido publicado exitosamente',
        timestamp: 'Hace 2 días',
        read: true,
        icon: '📢'
      },
      {
        id: '7',
        type: 'lead',
        title: 'Lead actualizado',
        message: 'El lead de Repsol ha cambiado de estado a "En Negociación"',
        timestamp: 'Hace 3 días',
        read: true,
        actionUrl: '/provider/leads',
        icon: '🔄'
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
