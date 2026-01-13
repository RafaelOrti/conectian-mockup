import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Premium Button Component
 * Professional button with multiple variants and states
 * 
 * Usage:
 * <app-button variant="primary" (clickEvent)="handleClick()">
 *   Action
 * </app-button>
 * 
 * <app-button variant="secondary" icon="⚙️" [loading]="isLoading">
 *   Settings
 * </app-button>
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="btn btn-{{ variant }}"
      [class.btn-size-sm]="size === 'small'"
      [class.btn-size-lg]="size === 'large'"
      [class.btn-block]="block"
      [disabled]="disabled || loading"
      [ngClass]="customClass"
      (click)="handleClick($event)"
      [type]="type"
    >
      <span *ngIf="loading" class="btn-spinner">
        <svg class="spinner-icon" viewBox="0 0 24 24" fill="none">
          <circle class="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/>
          <path class="spinner-path" d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </span>
      <span *ngIf="icon && !loading" class="btn-icon">{{ icon }}</span>
      <span class="btn-content">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [`
    .btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      
      padding: 0.5rem 1rem;
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.5;
      text-align: center;
      text-decoration: none;
      white-space: nowrap;
      vertical-align: middle;
      user-select: none;
      
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }
      
      &:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px rgba(13, 134, 255, 0.3);
      }
      
      /* Spinner */
      &-spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        
        .spinner-icon {
          width: 1.25rem;
          height: 1.25rem;
          animation: spin 1s linear infinite;
        }
        
        .spinner-track {
          opacity: 0.25;
        }
        
        .spinner-path {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
          animation: dash 1.5s ease-in-out infinite;
        }
      }
      
      &-icon {
        font-size: 1.125rem;
        line-height: 1;
      }
      
      &-content {
        display: flex;
        align-items: center;
      }
      
      /* Variants */
      &-primary {
        background: linear-gradient(135deg, #0d86ff 0%, #6b5cf0 100%);
        color: white;
        box-shadow: 
          0 4px 12px rgba(13, 134, 255, 0.3),
          0 2px 4px rgba(0, 0, 0, 0.1);
        
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 
            0 8px 20px rgba(13, 134, 255, 0.4),
            0 4px 8px rgba(0, 0, 0, 0.15);
        }
        
        &:active:not(:disabled) {
          transform: translateY(0);
        }
      }
      
      &-secondary {
        background: transparent;
        color: #6b5cf0;
        border: 2px solid #6b5cf0;
        box-shadow: 0 2px 4px rgba(107, 92, 240, 0.1);
        
        &:hover:not(:disabled) {
          background: rgba(107, 92, 240, 0.12);
          border-color: rgba(107, 92, 240, 0.6);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(107, 92, 240, 0.2);
        }
        
        &:active:not(:disabled) {
          transform: translateY(0);
        }
      }
      
      &-success {
        background: linear-gradient(135deg, #18b981 0%, darken(#18b981, 10%) 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(24, 185, 129, 0.3);
        
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(24, 185, 129, 0.4);
        }
        
        &:active:not(:disabled) {
          transform: translateY(0);
        }
      }
      
      &-danger {
        background: linear-gradient(135deg, #f4444a 0%, darken(#f4444a, 10%) 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(244, 68, 74, 0.3);
        
        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(244, 68, 74, 0.4);
        }
        
        &:active:not(:disabled) {
          transform: translateY(0);
        }
      }
      
      &-ghost {
        background: transparent;
        color: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.15);
        
        &:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.25);
        }
      }
      
      /* Sizes */
      &-size-sm {
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        
        .btn-icon {
          font-size: 1rem;
        }
      }
      
      &-size-lg {
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
        
        .btn-icon {
          font-size: 1.25rem;
        }
      }
      
      &-block {
        width: 100%;
      }
    }
    
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    
    @keyframes dash {
      0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -35px;
      }
      100% {
        stroke-dasharray: 90, 200;
        stroke-dashoffset: -124px;
      }
    }
  `]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' = 'primary';
  @Input() size: 'small' | 'normal' | 'large' = 'normal';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() block: boolean = false;
  @Input() icon?: string;
  @Input() customClass?: string;

  @Output() clickEvent = new EventEmitter<MouseEvent>();

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clickEvent.emit(event);
    }
  }
}
