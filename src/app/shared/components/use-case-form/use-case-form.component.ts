import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { ButtonComponent } from '../button/button.component';

export interface UseCaseForm {
  // PASO 1: LA SOLUCIÓN
  title: string;
  shortDescription: string;
  detailedDescription: string;
  applicationType: string;
  sectors: string[];
  clientSize: string[];
  offerFormat: string[];
  maturity: string;

  // PASO 2: MODELO DE NEGOCIO
  technicalModality: string[];
  priceMin: number | null;
  priceMax: number | null;
  pricePeriod: string;
  supportedLanguages: string[];

  // PASO 3: EL MOTOR
  aiType: string;
  humanIntervention: string;
  techStack: string[];
  nativeIntegrations: string[];
  integrationTime: string;

  // PASO 4: CONFIANZA Y SEGURIDAD
  dataLocation: string;
  dataSecurity: string[];
  compliance: string[];
  certifications: string[];
}

@Component({
  selector: 'app-use-case-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent],
  templateUrl: './use-case-form.component.html',
  styleUrls: ['./use-case-form.component.scss']
})
export class UseCaseFormComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Publicar Caso de Uso';
  @Input() storageKey: string = 'useCaseDraft';
  @Input() initialData?: Partial<UseCaseForm>;
  @Output() formSubmit = new EventEmitter<UseCaseForm>();
  @Output() draftSaved = new EventEmitter<UseCaseForm>();

  currentStep: number = 1;
  totalSteps: number = 4;
  autoSaveInterval: any;

  formData: UseCaseForm = {
    title: '',
    shortDescription: '',
    detailedDescription: '',
    applicationType: '',
    sectors: [],
    clientSize: [],
    offerFormat: [],
    maturity: 'MVP',
    technicalModality: [],
    priceMin: null,
    priceMax: null,
    pricePeriod: 'año',
    supportedLanguages: [],
    aiType: '',
    humanIntervention: '',
    techStack: [],
    nativeIntegrations: [],
    integrationTime: '',
    dataLocation: '',
    dataSecurity: [],
    compliance: [],
    certifications: []
  };

  // Opciones disponibles
  applicationTypes = [
    { value: 'chatbot', label: 'Chatbot' },
    { value: 'vision', label: 'Visión Artificial' },
    { value: 'automation', label: 'Automatización' },
    { value: 'prediction', label: 'Predicción' },
    { value: 'content-generation', label: 'Generación de Contenido' }
  ];

  sectors = [
    'Retail', 'Banca', 'Salud', 'Manufactura', 'Logística',
    'Educación', 'Turismo', 'Energía', 'Telecomunicaciones',
    'Transversal/Todos'
  ];

  clientSizes = [
    { value: 'startup', label: 'Startup' },
    { value: 'pyme', label: 'Pyme' },
    { value: 'enterprise', label: 'Corporate/Enterprise' }
  ];

  offerFormats = [
    { value: 'saas', label: 'Software (SaaS)' },
    { value: 'consulting', label: 'Consultoría/Servicios' },
    { value: 'training', label: 'Formación' }
  ];

  maturityLevels = [
    { value: 'MVP', label: 'MVP' },
    { value: 'Beta', label: 'Beta' },
    { value: 'validated', label: 'Validado' }
  ];

  technicalModalities = [
    { value: 'saas', label: 'SaaS (Nube)' },
    { value: 'on-premise', label: 'On-premise (Local)' },
    { value: 'hybrid', label: 'Híbrido' }
  ];

  pricePeriods = [
    { value: 'año', label: 'Año' },
    { value: 'mes', label: 'Mes' }
  ];

  languages = [
    'Español', 'Inglés', 'Francés', 'Alemán', 'Italiano',
    'Portugués', 'Catalán', 'Euskera', 'Gallego'
  ];

  aiTypes = [
    { value: 'open-source', label: 'Open Source (Abierta)' },
    { value: 'proprietary', label: 'Propietaria/Cerrada' },
    { value: 'hybrid', label: 'Híbrida' }
  ];

  humanInterventions = [
    { value: 'automatic', label: '100% Automático' },
    { value: 'supervised', label: 'Human-in-the-loop (Supervisado)' },
    { value: 'copilot', label: 'Copiloto (Asiste al humano)' }
  ];

  integrationTimes = [
    { value: '<1week', label: '< 1 semana' },
    { value: '1-3months', label: '1-3 meses' },
    { value: '>3months', label: '> 3 meses' }
  ];

  dataLocations = [
    { value: 'eu', label: 'Unión Europea (Frankfurt/Dublín)' },
    { value: 'us', label: 'EEUU' },
    { value: 'on-premise', label: 'On-premise del cliente' }
  ];

  dataSecurityOptions = [
    { value: 'encryption-rest', label: 'Encriptación en reposo' },
    { value: 'encryption-transit', label: 'Encriptación en tránsito' },
    { value: 'sso', label: 'SSO' },
    { value: 'anonymization', label: 'Anonimización' }
  ];

  complianceOptions = [
    { value: 'gdpr', label: 'GDPR (Europa)' },
    { value: 'ai-act', label: 'AI Act' },
    { value: 'hipaa', label: 'HIPAA (Salud)' },
    { value: 'soc2', label: 'SOC2' }
  ];

  certificationsOptions = [
    { value: 'iso27001', label: 'ISO 27001' },
    { value: 'ens', label: 'Esquema Nacional de Seguridad (ENS)' }
  ];

  techStackInput: string = '';
  nativeIntegrationsInput: string = '';

  ngOnInit(): void {
    if (this.initialData) {
      this.formData = { ...this.formData, ...this.initialData };
    }
    this.loadDraft();
    this.autoSaveInterval = setInterval(() => {
      this.saveDraft();
    }, 30000);
  }

  ngOnDestroy(): void {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
  }

  saveDraft(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.formData));
    this.draftSaved.emit(this.formData);
  }

  loadDraft(): void {
    const draft = localStorage.getItem(this.storageKey);
    if (draft) {
      try {
        this.formData = { ...this.formData, ...JSON.parse(draft) };
      } catch (e) {
        console.error('Error loading draft:', e);
      }
    }
  }

  clearDraft(): void {
    localStorage.removeItem(this.storageKey);
  }

  nextStep(): void {
    if (this.validateCurrentStep() && this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.saveDraft();
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStep = step;
    }
  }

  validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.validateStep1();
      case 2:
        return this.validateStep2();
      case 3:
        return this.validateStep3();
      case 4:
        return this.validateStep4();
      default:
        return false;
    }
  }

  validateStep1(): boolean {
    return !!(
      this.formData.title &&
      this.formData.shortDescription &&
      this.formData.applicationType &&
      this.formData.sectors.length > 0 &&
      this.formData.technicalModality.length > 0
    );
  }

  validateStep2(): boolean {
    return true;
  }

  validateStep3(): boolean {
    return true;
  }

  validateStep4(): boolean {
    return true;
  }

  toggleArray(array: string[], value: string): void {
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(value);
    }
    this.saveDraft();
  }

  addTechStackTag(): void {
    if (this.techStackInput.trim() && !this.formData.techStack.includes(this.techStackInput.trim())) {
      this.formData.techStack.push(this.techStackInput.trim());
      this.techStackInput = '';
      this.saveDraft();
    }
  }

  removeTechStackTag(tag: string): void {
    this.formData.techStack = this.formData.techStack.filter(t => t !== tag);
    this.saveDraft();
  }

  addIntegrationTag(): void {
    if (this.nativeIntegrationsInput.trim() && !this.formData.nativeIntegrations.includes(this.nativeIntegrationsInput.trim())) {
      this.formData.nativeIntegrations.push(this.nativeIntegrationsInput.trim());
      this.nativeIntegrationsInput = '';
      this.saveDraft();
    }
  }

  removeIntegrationTag(tag: string): void {
    this.formData.nativeIntegrations = this.formData.nativeIntegrations.filter(t => t !== tag);
    this.saveDraft();
  }

  submitForm(): void {
    if (this.validateCurrentStep()) {
      this.formSubmit.emit(this.formData);
      this.clearDraft();
    }
  }

  getProgress(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  getStepTitle(): string {
    const titles = {
      1: 'LA SOLUCIÓN',
      2: 'MODELO DE NEGOCIO',
      3: 'EL MOTOR',
      4: 'CONFIANZA Y SEGURIDAD'
    };
    return titles[this.currentStep as keyof typeof titles] || '';
  }

  getStepLabel(step: number): string {
    const labels = {
      1: 'La Solución',
      2: 'Modelo Negocio',
      3: 'El Motor',
      4: 'Confianza'
    };
    return labels[step as keyof typeof labels] || '';
  }
}

