import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { FormsModule } from '@angular/forms';

interface Provider {
  id: number;
  name: string;
  company: string;
  specialty: string;
  status: string;
  rating: number;
  projects: number;
}

@Component({
  selector: 'app-primeng-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    TableModule,
    TagModule,
    InputTextModule,
    DropdownModule,
    AvatarModule,
    ProgressBarModule,
    ChartModule,
    TooltipModule,
    BadgeModule
  ],
  template: `
    <div class="demo-container">
      <h1>🚀 PrimeNG Demo - Conectian</h1>
      <p class="subtitle">Demostración de componentes PrimeNG integrados con el theme de Conectian</p>
      
      <!-- Cards Section -->
      <section class="section">
        <h2>Cards y Botones</h2>
        <div class="cards-grid">
          <p-card header="Proyectos Activos" subheader="Dashboard">
            <div class="card-content">
              <div class="stat-value">24</div>
              <p-progressBar [value]="75"></p-progressBar>
              <p class="stat-label">75% completado</p>
            </div>
            <ng-template pTemplate="footer">
              <p-button label="Ver Detalles" icon="pi pi-eye" styleClass="p-button-text"></p-button>
            </ng-template>
          </p-card>
          
          <p-card header="Proveedores" subheader="Marketplace">
            <div class="card-content">
              <div class="stat-value">156</div>
              <p-progressBar [value]="85" styleClass="success-bar"></p-progressBar>
              <p class="stat-label">85% activos</p>
            </div>
            <ng-template pTemplate="footer">
              <p-button label="Explorar" icon="pi pi-search" styleClass="p-button-text"></p-button>
            </ng-template>
          </p-card>
          
          <p-card header="IA Casos de Uso" subheader="Innovación">
            <div class="card-content">
              <div class="stat-value">48</div>
              <p-progressBar [value]="60"></p-progressBar>
              <p class="stat-label">60% implementados</p>
            </div>
            <ng-template pTemplate="footer">
              <p-button label="Crear Nuevo" icon="pi pi-plus" styleClass="p-button-text"></p-button>
            </ng-template>
          </p-card>
        </div>
      </section>
      
      <!-- Buttons Section -->
      <section class="section">
        <h2>Tipos de Botones</h2>
        <div class="buttons-row">
          <p-button label="Primary" icon="pi pi-check"></p-button>
          <p-button label="Secondary" icon="pi pi-bookmark" styleClass="p-button-secondary"></p-button>
          <p-button label="Success" icon="pi pi-check-circle" styleClass="p-button-success"></p-button>
          <p-button label="Warning" icon="pi pi-exclamation-triangle" styleClass="p-button-warning"></p-button>
          <p-button label="Danger" icon="pi pi-times" styleClass="p-button-danger"></p-button>
          <p-button label="Outlined" icon="pi pi-external-link" styleClass="p-button-outlined"></p-button>
          <p-button label="Text" icon="pi pi-link" styleClass="p-button-text"></p-button>
        </div>
      </section>
      
      <!-- Table Section -->
      <section class="section">
        <h2>Tabla de Proveedores</h2>
        <p-table [value]="providers" [tableStyle]="{'min-width': '60rem'}"
                 [paginator]="true" [rows]="5" [rowsPerPageOptions]="[5, 10, 25]"
                 [globalFilterFields]="['name', 'company', 'specialty']">
          <ng-template pTemplate="header">
            <tr>
              <th pSortableColumn="name">Proveedor <p-sortIcon field="name"></p-sortIcon></th>
              <th pSortableColumn="company">Empresa <p-sortIcon field="company"></p-sortIcon></th>
              <th>Especialidad</th>
              <th pSortableColumn="rating">Rating <p-sortIcon field="rating"></p-sortIcon></th>
              <th>Estado</th>
              <th pSortableColumn="projects">Proyectos <p-sortIcon field="projects"></p-sortIcon></th>
              <th>Acciones</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-provider>
            <tr>
              <td>
                <div class="provider-cell">
                  <p-avatar [label]="provider.name.charAt(0)" shape="circle" size="normal"></p-avatar>
                  <span>{{ provider.name }}</span>
                </div>
              </td>
              <td>{{ provider.company }}</td>
              <td><p-tag [value]="provider.specialty" severity="info"></p-tag></td>
              <td>
                <span class="rating">
                  <i class="pi pi-star-fill" style="color: #FFD700;"></i>
                  {{ provider.rating }}
                </span>
              </td>
              <td>
                <p-tag [value]="provider.status" 
                       [severity]="provider.status === 'Active' ? 'success' : 
                                   provider.status === 'Pending' ? 'warning' : 'danger'">
                </p-tag>
              </td>
              <td>{{ provider.projects }}</td>
              <td>
                <p-button icon="pi pi-eye" styleClass="p-button-rounded p-button-text" pTooltip="Ver"></p-button>
                <p-button icon="pi pi-pencil" styleClass="p-button-rounded p-button-text" pTooltip="Editar"></p-button>
                <p-button icon="pi pi-trash" styleClass="p-button-rounded p-button-text p-button-danger" pTooltip="Eliminar"></p-button>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </section>
      
      <!-- Chart Section -->
      <section class="section">
        <h2>Gráfico de Rendimiento</h2>
        <div class="chart-container">
          <p-chart type="line" [data]="chartData" [options]="chartOptions"></p-chart>
        </div>
      </section>
      
      <!-- Form Section -->
      <section class="section">
        <h2>Formulario de Contacto</h2>
        <div class="form-grid">
          <div class="field">
            <label for="name">Nombre</label>
            <input id="name" type="text" pInputText placeholder="Tu nombre"/>
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input id="email" type="email" pInputText placeholder="tu@email.com"/>
          </div>
          <div class="field">
            <label for="category">Categoría</label>
            <p-dropdown [options]="categories" placeholder="Selecciona una categoría" optionLabel="name"></p-dropdown>
          </div>
          <div class="field full-width">
            <p-button label="Enviar" icon="pi pi-send"></p-button>
            <p-button label="Cancelar" icon="pi pi-times" styleClass="p-button-secondary"></p-button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #0d86ff 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .subtitle {
      color: #a0aec0;
      font-size: 1.125rem;
      margin-bottom: 2rem;
    }
    
    .section {
      margin-bottom: 3rem;
    }
    
    .section h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      color: white;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 0.5rem;
    }
    
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .card-content {
      text-align: center;
    }
    
    .stat-value {
      font-size: 3rem;
      font-weight: 700;
      color: white;
      margin-bottom: 1rem;
    }
    
    .stat-label {
      color: #a0aec0;
      margin-top: 0.5rem;
    }
    
    .buttons-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
    }
    
    .provider-cell {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .chart-container {
      background: rgba(30, 39, 54, 0.7);
      border-radius: 1rem;
      padding: 1.5rem;
      border: 1px solid rgba(255,255,255,0.1);
    }
    
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      background: rgba(30, 39, 54, 0.7);
      border-radius: 1rem;
      padding: 2rem;
      border: 1px solid rgba(255,255,255,0.1);
    }
    
    .field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .field label {
      color: #a0aec0;
      font-weight: 500;
    }
    
    .field.full-width {
      grid-column: 1 / -1;
      flex-direction: row;
      gap: 1rem;
      justify-content: flex-start;
    }
    
    ::ng-deep .success-bar .p-progressbar-value {
      background: linear-gradient(135deg, #18b981 0%, #10b981 100%);
    }
  `]
})
export class PrimengDemoComponent {
  providers: Provider[] = [
    { id: 1, name: 'Juan García', company: 'TechAI Solutions', specialty: 'Machine Learning', status: 'Active', rating: 4.8, projects: 15 },
    { id: 2, name: 'María López', company: 'DataPro', specialty: 'Data Science', status: 'Active', rating: 4.9, projects: 23 },
    { id: 3, name: 'Carlos Ruiz', company: 'AI Labs', specialty: 'NLP', status: 'Pending', rating: 4.5, projects: 8 },
    { id: 4, name: 'Ana Martínez', company: 'CloudML', specialty: 'Computer Vision', status: 'Active', rating: 4.7, projects: 12 },
    { id: 5, name: 'Pedro Sánchez', company: 'DeepMind ES', specialty: 'Robotics', status: 'Inactive', rating: 4.2, projects: 5 },
    { id: 6, name: 'Laura Fernández', company: 'Neural Corp', specialty: 'Deep Learning', status: 'Active', rating: 4.9, projects: 31 },
    { id: 7, name: 'Miguel Torres', company: 'AI Factory', specialty: 'AutoML', status: 'Active', rating: 4.6, projects: 18 },
  ];

  categories = [
    { name: 'Consultoría', code: 'CONS' },
    { name: 'Desarrollo', code: 'DEV' },
    { name: 'Formación', code: 'TRAIN' },
    { name: 'Soporte', code: 'SUPPORT' }
  ];

  chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Proyectos Completados',
        data: [12, 19, 15, 25, 22, 30, 28],
        fill: true,
        backgroundColor: 'rgba(13, 134, 255, 0.1)',
        borderColor: '#0d86ff',
        tension: 0.4
      },
      {
        label: 'Nuevos Clientes',
        data: [8, 11, 13, 15, 17, 20, 24],
        fill: true,
        backgroundColor: 'rgba(107, 92, 240, 0.1)',
        borderColor: '#6b5cf0',
        tension: 0.4
      }
    ]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#a0aec0'
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255,255,255,0.05)'
        },
        ticks: {
          color: '#a0aec0'
        }
      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.05)'
        },
        ticks: {
          color: '#a0aec0'
        }
      }
    }
  };
}
