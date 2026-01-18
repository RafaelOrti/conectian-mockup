import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

interface ConfigSection {
  id: string;
  label: string;
  icon: string;
}

interface PlatformConfig {
  platformName: string;
  supportEmail: string;
  seoDescription: string;
  allowNewRegistrations: boolean;
  maintenanceMode: boolean;
  betaFeatures: boolean;
  defaultLanguage: string;
  timezone: string;
  currency: string;
}

@Component({
  selector: 'app-adminconfig',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './adminconfig.component.html',
  styleUrls: ['./adminconfig.component.scss']
})
export class AdminConfigComponent implements OnInit {
  activeSection: string = 'general';
  hasChanges: boolean = false;
  
  sections: ConfigSection[] = [
    { id: 'general', label: 'General', icon: '🏢' },
    { id: 'notifications', label: 'Notificaciones', icon: '🔔' },
    { id: 'security', label: 'Seguridad', icon: '🔐' },
    { id: 'payments', label: 'Pagos', icon: '💳' },
    { id: 'integrations', label: 'Integraciones', icon: '🔌' },
    { id: 'email', label: 'Email Templates', icon: '📧' }
  ];

  config: PlatformConfig = {
    platformName: 'Conectian AI Marketplace',
    supportEmail: 'support@conectian.com',
    seoDescription: 'La plataforma líder para conectar empresas con soluciones de Inteligencia Artificial.',
    allowNewRegistrations: true,
    maintenanceMode: false,
    betaFeatures: true,
    defaultLanguage: 'es',
    timezone: 'madrid',
    currency: 'eur'
  };

  originalConfig: PlatformConfig = { ...this.config };

  ngOnInit() {
    this.originalConfig = JSON.parse(JSON.stringify(this.config));
  }

  setActiveSection(sectionId: string) {
    this.activeSection = sectionId;
    console.log('Sección activa:', sectionId);
  }

  onConfigChange() {
    this.hasChanges = JSON.stringify(this.config) !== JSON.stringify(this.originalConfig);
  }

  saveChanges() {
    console.log('Guardando cambios:', this.config);
    this.originalConfig = JSON.parse(JSON.stringify(this.config));
    this.hasChanges = false;
    
    // TODO: Implementar llamada al servicio para guardar en backend
    alert('✅ Configuración guardada exitosamente');
  }

  resetChanges() {
    this.config = JSON.parse(JSON.stringify(this.originalConfig));
    this.hasChanges = false;
  }

  onToggleChange(field: keyof PlatformConfig, event: Event) {
    const target = event.target as HTMLInputElement;
    (this.config as any)[field] = target.checked;
    this.onConfigChange();
    console.log(`${field} cambiado a:`, target.checked);
  }
}
