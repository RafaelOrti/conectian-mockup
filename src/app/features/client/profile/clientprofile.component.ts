import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

interface UserProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
  company: string;
  sector: string;
  website: string;
  location: string;
  avatar: string;
  projectsCount: number;
  reviewsCount: number;
}

@Component({
  selector: 'app-clientprofile',
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
    ChipModule,
    TabViewModule,
    TooltipModule,
    FileUploadModule,
    PasswordModule,
    InputSwitchModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './clientprofile.component.html',
  styleUrls: ['./clientprofile.component.scss']
})
export class ClientProfileComponent {
  @Input() showNavbar: boolean = true;

  activeTabIndex: number = 0;

  profile: UserProfile = {
    firstName: 'Carlos',
    lastName: 'Martínez',
    fullName: 'Carlos Martínez',
    role: 'Director de Innovación',
    email: 'carlos.martinez@techsolutions.com',
    phone: '+34 600 123 456',
    bio: 'Apasionado por la tecnología y la innovación. Buscando soluciones de IA para optimizar procesos empresariales.',
    company: 'TechSolutions SL',
    sector: 'Tecnología',
    website: 'https://techsolutions.com',
    location: 'Madrid, España',
    avatar: 'CM',
    projectsCount: 12,
    reviewsCount: 5
  };

  // Security Settings
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  // Notification Settings
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
