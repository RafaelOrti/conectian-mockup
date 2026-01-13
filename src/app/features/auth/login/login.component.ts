import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

/**
 * Login Component
 * Página de inicio de sesión para clientes y proveedores
 * 
 * Features:
 * - Glassmorphism card design
 * - Client/Provider tabs
 * - Email and password inputs
 * - Forgot password link
 * - Gradient primary button
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  activeTab: 'client' | 'provider' = 'client';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) { }

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';

    // TODO: Implementar lógica de autenticación real con backend
    setTimeout(() => {
      if (this.email && this.password) {
        // Navegar al marketplace/dashboard según el rol
        if (this.activeTab === 'client') {
          this.router.navigate(['/client/marketplace']);
        } else {
          this.router.navigate(['/provider/dashboard']);
        }
      } else {
        this.errorMessage = 'Por favor, ingresa tu email y contraseña';
      }
      this.loading = false;
    }, 1500);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  setActiveTab(tab: 'client' | 'provider'): void {
    this.activeTab = tab;
  }
}
