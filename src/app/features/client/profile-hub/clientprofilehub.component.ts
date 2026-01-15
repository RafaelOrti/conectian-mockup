import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

interface Tab {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-client-profile-hub',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './clientprofilehub.component.html',
  styleUrls: ['./clientprofilehub.component.scss']
})
export class ClientProfileHubComponent {
  activeTab: number = 0;

  tabs: Tab[] = [
    { icon: '👤', label: 'Mi Perfil' },
    { icon: '🏢', label: 'Mi Empresa' },
    { icon: '🏆', label: 'Badges y Recompensas' },
    { icon: '💳', label: 'Pagos' }
  ];
}
