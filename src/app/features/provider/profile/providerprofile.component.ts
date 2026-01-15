import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AvatarModule } from 'primeng/avatar';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-provider-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    AvatarModule,
    TabViewModule,
    TooltipModule,
    FileUploadModule,
    PasswordModule,
    InputSwitchModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './providerprofile.component.html',
  styleUrls: ['./providerprofile.component.scss']
})
export class ProviderProfileComponent {
  @Input() showNavbar: boolean = true;

  activeTabIndex: number = 0;

  profile = {
    firstName: 'María',
    lastName: 'González',
    fullName: 'María González',
    role: 'CEO & Founder',
    email: 'maria.gonzalez@techsolutions.ai',
    phone: '+34 666 777 888',
    bio: 'Experta en IA y consultoría tecnológica. Ayudando a empresas a transformarse digitalmente.',
    company: 'TechSolutions AI',
    sector: 'Inteligencia Artificial',
    website: 'https://techsolutions-ai.com',
    location: 'Barcelona, España',
    avatar: 'MG',
    projectsCount: 24,
    reviewsCount: 18
  };

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  emailNotifications: boolean = true;
  pushNotifications: boolean = true;
  weeklyReport: boolean = true;
  marketingEmails: boolean = false;

  constructor(private messageService: MessageService) {}

  saveProfile(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Perfil Actualizado',
      detail: 'Los cambios se han guardado correctamente.'
    });
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Las contraseñas no coinciden.'
      });
      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Contraseña Actualizada',
      detail: 'Tu contraseña ha sido cambiada exitosamente.'
    });

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  saveNotificationSettings(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Preferencias Guardadas',
      detail: 'Tus preferencias de notificaciones se han actualizado.'
    });
  }

  onAvatarUpload(event: any): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Imagen Subida',
      detail: 'Tu avatar ha sido actualizado.'
    });
  }
}
