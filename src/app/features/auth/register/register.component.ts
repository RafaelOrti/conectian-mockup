import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface RegistrationData {
  accountType: 'client' | 'provider' | null;
  email: string;
  password: string;
  companyDomain: string;
  companyData: {
    name: string;
    logo: string;
    sector: string;
    employees: string;
    location: string;
  } | null;
  preferences: {
    challenges: string[];
    budget: string;
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StepsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    CheckboxModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  items: MenuItem[] = [];
  activeIndex: number = 0;
  loading: boolean = false;

  registrationData: RegistrationData = {
    accountType: null,
    email: '',
    password: '',
    companyDomain: '',
    companyData: null,
    preferences: {
      challenges: [],
      budget: ''
    }
  };

  // Step 3: Mock API autocomplete data
  mockCompanyData: any = {
    'repsol.com': {
      name: 'Repsol S.A.',
      logo: '⛽',
      sector: 'Energía',
      employees: '24,000+',
      location: 'Madrid, España'
    },
    'telefonica.com': {
      name: 'Telefónica S.A.',
      logo: '📱',
      sector: 'Telecomunicaciones',
      employees: '100,000+',
      location: 'Madrid, España'
    },
    'bbva.com': {
      name: 'BBVA',
      logo: '🏦',
      sector: 'Banca',
      employees: '120,000+',
      location: 'Bilbao, España'
    }
  };

  challengeOptions = [
    'Reducir fraude',
    'Automatizar ventas',
    'Optimizar logística',
    'Mejorar servicio al cliente',
    'Predecir demanda',
    'Análisis de datos'
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      { label: 'Tipo de Cuenta', icon: 'pi pi-user' },
      { label: 'Datos Básicos', icon: 'pi pi-id-card' },
      { label: 'Empresa', icon: 'pi pi-building' },
      { label: 'Confirmación', icon: 'pi pi-check' },
      { label: 'Preferencias', icon: 'pi pi-cog' }
    ];
  }

  selectAccountType(type: 'client' | 'provider'): void {
    this.registrationData.accountType = type;
    this.nextStep();
  }

  nextStep(): void {
    // Validar Step 1 antes de avanzar
    if (this.activeIndex === 1 && !this.isStep1Valid()) {
      return;
    }
    
    if (this.activeIndex < this.items.length - 1) {
      this.activeIndex++;
    }
  }

  previousStep(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  isStep1Valid(): boolean {
    const email = this.registrationData.email?.trim() || '';
    const password = this.registrationData.password?.trim() || '';
    
    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    const isValidPassword = password.length >= 6; // Mínimo 6 caracteres
    
    return isValidEmail && isValidPassword;
  }

  // Step 3: Autocomplete company data (mock)
  autocompleteCompany(): void {
    this.loading = true;

    setTimeout(() => {
      const domain = this.registrationData.companyDomain.toLowerCase();
      const mockData = this.mockCompanyData[domain];

      if (mockData) {
        this.registrationData.companyData = mockData;
      } else {
        // Default data for unknown domains
        this.registrationData.companyData = {
          name: 'Empresa S.L.',
          logo: '🏢',
          sector: 'General',
          employees: 'N/A',
          location: 'España'
        };
      }

      this.loading = false;
    }, 1500);
  }

  toggleChallenge(challenge: string): void {
    const index = this.registrationData.preferences.challenges.indexOf(challenge);
    if (index > -1) {
      this.registrationData.preferences.challenges.splice(index, 1);
    } else {
      this.registrationData.preferences.challenges.push(challenge);
    }
  }

  onSubmit(): void {
    this.loading = true;

    setTimeout(() => {
      console.log('Registration data:', this.registrationData);

      // Navigate based on account type
      if (this.registrationData.accountType === 'client') {
        this.router.navigate(['/client/marketplace']);
      } else {
        this.router.navigate(['/provider/dashboard']);
      }
    }, 2000);
  }

  get progressPercentage(): number {
    return ((this.activeIndex + 1) / this.items.length) * 100;
  }
}
