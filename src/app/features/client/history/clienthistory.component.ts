import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-client-history',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent],
  template: `
    <div>
      <app-navbar [userRole]="'CLIENT'"></app-navbar>
      <div class="container">
        <app-card>
          <h1>📋 Historial</h1>
          <p class="text-secondary">Vista en construcción</p>
        </app-card>
      </div>
    </div>
  `
})
export class ClientHistoryComponent {}




