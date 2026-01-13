import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-provider-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent],
  template: `
    <div [class.no-navbar]="!showNavbar" style="padding-top: 80px; min-height: 100vh;">
      <app-navbar *ngIf="showNavbar" [userRole]="'PROVIDER'" [userName]="'María González'" [notificationCount]="5"></app-navbar>
      <div class="container" style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
        <app-card>
          <h1>👤 Mi Perfil</h1>
          <p class="text-secondary">Vista en construcción</p>
        </app-card>
      </div>
    </div>
  `,
  styles: [`
    .no-navbar {
      padding-top: 0 !important;
      min-height: auto !important;
    }
  `]
})
export class ProviderProfileComponent {
  @Input() showNavbar: boolean = true;
}
