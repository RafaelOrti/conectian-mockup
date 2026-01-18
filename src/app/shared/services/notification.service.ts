import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NotificationCounts {
  notifications: number;
  messages: number;
  projects: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Estado inicial de los contadores
  private countsSubject = new BehaviorSubject<NotificationCounts>({
    notifications: 0,
    messages: 0,
    projects: 0
  });

  // Observable público para que los componentes se suscriban
  public counts$: Observable<NotificationCounts> = this.countsSubject.asObservable();

  constructor() {
    // Inicializar con valores por defecto según el rol
    this.initializeDefaultCounts();
  }

  /**
   * Inicializa los contadores con valores por defecto
   * En producción, estos valores vendrían del backend
   */
  private initializeDefaultCounts(): void {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('/client/')) {
      this.countsSubject.next({
        notifications: 4,
        messages: 3,
        projects: 5
      });
    } else if (currentPath.includes('/provider/')) {
      this.countsSubject.next({
        notifications: 6,
        messages: 4,
        projects: 7
      });
    } else if (currentPath.includes('/admin/')) {
      this.countsSubject.next({
        notifications: 5,
        messages: 0,
        projects: 0
      });
    }
  }

  /**
   * Obtiene los contadores actuales de forma síncrona
   */
  getCurrentCounts(): NotificationCounts {
    return this.countsSubject.value;
  }

  /**
   * Actualiza todos los contadores
   */
  updateCounts(counts: Partial<NotificationCounts>): void {
    const currentCounts = this.countsSubject.value;
    this.countsSubject.next({
      ...currentCounts,
      ...counts
    });
  }

  /**
   * Actualiza solo el contador de notificaciones
   */
  updateNotificationCount(count: number): void {
    const currentCounts = this.countsSubject.value;
    this.countsSubject.next({
      ...currentCounts,
      notifications: count
    });
  }

  /**
   * Actualiza solo el contador de mensajes
   */
  updateMessageCount(count: number): void {
    const currentCounts = this.countsSubject.value;
    this.countsSubject.next({
      ...currentCounts,
      messages: count
    });
  }

  /**
   * Actualiza solo el contador de proyectos
   */
  updateProjectCount(count: number): void {
    const currentCounts = this.countsSubject.value;
    this.countsSubject.next({
      ...currentCounts,
      projects: count
    });
  }

  /**
   * Incrementa el contador de notificaciones
   */
  incrementNotifications(amount: number = 1): void {
    const currentCounts = this.countsSubject.value;
    this.countsSubject.next({
      ...currentCounts,
      notifications: currentCounts.notifications + amount
    });
  }

  /**
   * Decrementa el contador de notificaciones
   */
  decrementNotifications(amount: number = 1): void {
    const currentCounts = this.countsSubject.value;
    this.countsSubject.next({
      ...currentCounts,
      notifications: Math.max(0, currentCounts.notifications - amount)
    });
  }

  /**
   * Incrementa el contador de mensajes
   */
  incrementMessages(amount: number = 1): void {
    const currentCounts = this.countsSubject.value;
    this.countsSubject.next({
      ...currentCounts,
      messages: currentCounts.messages + amount
    });
  }

  /**
   * Decrementa el contador de mensajes
   */
  decrementMessages(amount: number = 1): void {
    const currentCounts = this.countsSubject.value;
    this.countsSubject.next({
      ...currentCounts,
      messages: Math.max(0, currentCounts.messages - amount)
    });
  }

  /**
   * Resetea todos los contadores a 0
   */
  resetCounts(): void {
    this.countsSubject.next({
      notifications: 0,
      messages: 0,
      projects: 0
    });
  }

  /**
   * Marca una notificación como leída (decrementa el contador)
   */
  markNotificationAsRead(): void {
    this.decrementNotifications();
  }

  /**
   * Marca un mensaje como leído (decrementa el contador)
   */
  markMessageAsRead(): void {
    this.decrementMessages();
  }
}

