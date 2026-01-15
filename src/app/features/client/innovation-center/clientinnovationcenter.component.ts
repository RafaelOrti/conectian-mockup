import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-clientinnovationcenter',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    CardModule,
    ButtonModule,
    ProgressBarModule,
    TagModule
  ],
  templateUrl: './clientinnovationcenter.component.html',
  styleUrls: ['./clientinnovationcenter.component.scss']
})
export class ClientInnovationCenterComponent {
  @Input() showNavbar: boolean = true;
  initiatives = [
    {
      title: 'Automatización de Atención al Cliente',
      category: 'IA Generativa',
      description: 'Implementación de chatbot avanzado para reducir tickets de soporte nivel 1.',
      progress: 75,
      status: 'active',
      partner: 'BotSolutions AI'
    },
    {
      title: 'Predicción de Demanda',
      category: 'Machine Learning',
      description: 'Modelo predictivo para optimizar stock en almacenes regionales.',
      progress: 40,
      status: 'warning',
      partner: 'DataPredict'
    },
    {
      title: 'Control de Calidad por Visión',
      category: 'Computer Vision',
      description: 'Sistema de detección de defectos en línea de producción.',
      progress: 90,
      status: 'active',
      partner: 'VisionTech'
    }
  ];
}
