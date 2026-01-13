import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Badge Component
 * Displays status badges, tags, and labels
 * 
 * Usage:
 * <app-badge type="success">Verificado</app-badge>
 * <app-badge type="warning" icon="⏰">Urgente</app-badge>
 */
@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      class="badge badge-{{ type }}"
      [ngClass]="customClass"
    >
      <span *ngIf="icon" class="badge-icon">{{ icon }}</span>
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      
      .badge-icon {
        font-size: 0.875rem;
      }
    }
  `]
})
export class BadgeComponent {
  @Input() type: 'success' | 'warning' | 'danger' | 'info' | 'purple' = 'info';
  @Input() icon?: string;
  @Input() customClass?: string;
}
