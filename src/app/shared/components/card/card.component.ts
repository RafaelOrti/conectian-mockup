import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Premium Card Component
 * Container with refined glassmorphism effect and professional styling
 * 
 * Usage:
 * <app-card>
 *   <h3>Title</h3>
 *   <p>Content</p>
 * </app-card>
 * 
 * <app-card hover="true" padding="large" variant="gradient">
 *   Content with large padding, hover effect, and gradient accent
 * </app-card>
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="card"
      [ngClass]="{
        'card-hover': hover,
        'card-padding-sm': padding === 'small',
        'card-padding-lg': padding === 'large',
        'card-variant-gradient': variant === 'gradient',
        'card-variant-bordered': variant === 'bordered',
        'card-variant-elevated': variant === 'elevated'
      }"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      /* Base styles inherited from global.scss */
      position: relative;
      overflow: hidden;
      
      /* Enhanced glassmorphism */
      background: rgba(30, 39, 54, 0.75);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      padding: 1.5rem;
      
      /* Sophisticated shadow */
      box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.1),
        0 2px 4px rgba(0, 0, 0, 0.06),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
      
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &-hover {
        cursor: pointer;
        
        &:hover {
          transform: translateY(-4px);
          border-color: rgba(13, 134, 255, 0.3);
          box-shadow: 
            0 12px 24px rgba(13, 134, 255, 0.15),
            0 4px 8px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        &:active {
          transform: translateY(-2px);
        }
      }
      
      &-padding-sm {
        padding: 1rem;
      }
      
      &-padding-lg {
        padding: 2rem;
      }
      
      &-variant-gradient {
        background: linear-gradient(135deg, 
          rgba(13, 134, 255, 0.08) 0%, 
          rgba(107, 92, 240, 0.08) 100%
        );
        border: 1.5px solid rgba(13, 134, 255, 0.2);
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #0d86ff 0%, #6b5cf0 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        &:hover::before {
          opacity: 1;
        }
      }
      
      &-variant-bordered {
        border: 2px solid rgba(255, 255, 255, 0.15);
        background: rgba(30, 39, 54, 0.6);
      }
      
      &-variant-elevated {
        box-shadow: 
          0 8px 16px rgba(0, 0, 0, 0.15),
          0 4px 8px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
      }
    }
  `]
})
export class CardComponent {
  @Input() hover: boolean = false;
  @Input() padding: 'small' | 'normal' | 'large' = 'normal';
  @Input() variant: 'default' | 'gradient' | 'bordered' | 'elevated' = 'default';
}
