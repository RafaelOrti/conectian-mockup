import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-admincontent',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './admincontent.component.html',
  styleUrls: ['./admincontent.component.scss']
})
export class AdminContentComponent {
  contentItems = [
    {
      id: 1,
      title: 'Cómo implementar IA en procesos de RRHH',
      slug: '/blog/ia-rrhh-implementation',
      type: 'article',
      author: { name: 'Ana García', avatar: 'AG' },
      date: '12 Ene 2026',
      status: 'published',
      views: 1250
    },
    {
      id: 2,
      title: 'Guía completa de Machine Learning para CEOs',
      slug: '/guides/ml-for-ceos',
      type: 'guide',
      author: { name: 'Carlos Ruiz', avatar: 'CR' },
      date: '10 Ene 2026',
      status: 'published',
      views: 3400
    },
    {
      id: 3,
      title: 'Entrevista con CTO de TechGlobal',
      slug: '/videos/interview-techglobal',
      type: 'video',
      author: { name: 'Laura M.', avatar: 'LM' },
      date: '08 Ene 2026',
      status: 'review',
      views: 0
    },
    {
      id: 4,
      title: 'Tendencias de IA para 2026',
      slug: '/blog/ai-trends-2026',
      type: 'article',
      author: { name: 'Ana García', avatar: 'AG' },
      date: '05 Ene 2026',
      status: 'draft',
      views: 0
    },
    {
      id: 5,
      title: 'Automatización de Facturación con IA',
      slug: '/guides/invoice-automation',
      type: 'guide',
      author: { name: 'Pedro S.', avatar: 'PS' },
      date: '03 Ene 2026',
      status: 'published',
      views: 890
    }
  ];
}
