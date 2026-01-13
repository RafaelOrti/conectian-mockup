import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

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
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  currentStep: number = 1;
  totalSteps: number = 5;
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

  selectAccountType(type: 'client' | 'provider'): void {
    this.registrationData.accountType = type;
    this.nextStep();
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
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
    return (this.currentStep / this.totalSteps) * 100;
  }
}
