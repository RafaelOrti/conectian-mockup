import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';

interface ContentItem {
  id: number;
  title: string;
  slug: string;
  type: 'article' | 'guide' | 'video';
  author: { name: string; avatar: string };
  date: string;
  status: 'published' | 'draft' | 'review';
  views: number;
}

@Component({
  selector: 'app-admincontent',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    CardModule,
    ButtonModule,
    TableModule,
    TagModule,
    AvatarModule,
    InputTextModule,
    DropdownModule,
    TooltipModule
  ],
  templateUrl: './admincontent.component.html',
  styleUrls: ['./admincontent.component.scss']
})
export class AdminContentComponent {
  contentItems: ContentItem[] = [
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

  typeOptions = [
    { label: 'Todos los tipos', value: null },
    { label: 'Artículos', value: 'article' },
    { label: 'Guías', value: 'guide' },
    { label: 'Videos', value: 'video' }
  ];

  statusOptions = [
    { label: 'Todos los estados', value: null },
    { label: 'Publicado', value: 'published' },
    { label: 'Borrador', value: 'draft' },
    { label: 'En Revisión', value: 'review' }
  ];

  selectedType: string | null = null;
  selectedStatus: string | null = null;
  globalFilterValue = '';

  getTypeLabel(type: string): string {
    const map: { [key: string]: string } = {
      'article': 'Artículo',
      'guide': 'Guía',
      'video': 'Video'
    };
    return map[type] || type;
  }

  getTypeIcon(type: string): string {
    const map: { [key: string]: string } = {
      'article': 'pi pi-file',
      'guide': 'pi pi-book',
      'video': 'pi pi-video'
    };
    return map[type] || 'pi pi-file';
  }

  getTypeSeverity(type: string): 'info' | 'success' | 'danger' {
    const map: { [key: string]: 'info' | 'success' | 'danger' } = {
      'article': 'info',
      'guide': 'success',
      'video': 'danger'
    };
    return map[type] || 'info';
  }

  getStatusLabel(status: string): string {
    const map: { [key: string]: string } = {
      'published': 'Publicado',
      'draft': 'Borrador',
      'review': 'En Revisión'
    };
    return map[status] || status;
  }

  getStatusSeverity(status: string): 'success' | 'warning' | 'info' {
    const map: { [key: string]: 'success' | 'warning' | 'info' } = {
      'published': 'success',
      'draft': 'warning',
      'review': 'info'
    };
    return map[status] || 'info';
  }

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.globalFilterValue = value;
  }
}
