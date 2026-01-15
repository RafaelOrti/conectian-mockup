import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

interface Message {
  sender: 'client' | 'provider';
  senderName: string;
  content: string;
  timestamp: string;
  attachment?: string;
}

interface Milestone {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'pending' | 'awaiting-approval';
  date: string;
  progress?: number;
  documents?: number;
  pendingApprovals?: PendingApproval[];
}

interface PendingApproval {
  personName: string;
  role: string;
  company: 'client' | 'provider';
  status: 'pending' | 'approved' | 'rejected';
}

interface ROICalculation {
  initialInvestment: number;
  monthlySavings: number;
  timeHorizon: number; // months
  roi: number;
  paybackPeriod: number; // months
  totalSavings: number;
}

interface SupportTicket {
  id: string;
  title: string;
  category: 'technical' | 'legal' | 'billing' | 'general';
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  lastUpdate: string;
}

interface UnifiedQuestion {
  id: string;
  category: 'legal' | 'nda' | 'documents' | 'billing' | 'technical';
  question: string;
  answer: string;
  relatedDocuments?: string[];
}

import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TimelineModule } from 'primeng/timeline';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { SliderModule } from 'primeng/slider';
import { ChartModule } from 'primeng/chart';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-provider-deal-room',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    TabViewModule,
    CardModule,
    ButtonModule,
    TagModule,
    AvatarModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    TimelineModule,
    FileUploadModule,
    ProgressBarModule,
    AccordionModule,
    TooltipModule,
    ToastModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule,
    ConfirmDialogModule,
    ScrollPanelModule,
    DividerModule,
    ChipModule,
    SliderModule,
    ChartModule,
    SplitterModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './provider-deal-room.component.html',
  styleUrls: ['./provider-deal-room.component.scss']
})
export class ProviderDealRoomComponent implements OnInit {
  userRole: 'provider' = 'provider';
  dealId: string = '';
  activeTab: number = 0;
  today: Date = new Date();

  // Modals state
  showROICalculator: boolean = false;
  showSupportModal: boolean = false;
  showUnifiedQuestions: boolean = false;
  showAchievementModal: boolean = false;
  showMeetingModal: boolean = false;
  showProposalModal: boolean = false;
  showUploadModal: boolean = false;
  showDocumentModal: boolean = false;

  // Data for modals
  achievementData = {
    title: '',
    description: '',
    image: '🚀'
  };

  meetingData = {
    title: '',
    date: null,
    duration: 30,
    participants: [] as string[]
  };

  selectedDocument: any = null;

  dealInfo = {
    title: 'Proyecto: Chatbot para E-commerce',
    client: 'Repsol',
    provider: 'Nexus Solutions',
    status: 'active'
  };

  messages: Message[] = [
    {
      sender: 'provider',
      senderName: 'Nexus Solutions',
      content: 'Hemos preparado la propuesta inicial. Por favor, revise el PDF adjunto.',
      timestamp: 'Hace 30 min',
      attachment: 'Propuesta_Chatbot_E-commerce_v1.pdf'
    },
    {
      sender: 'client',
      senderName: 'Carlos (Repsol)',
      content: 'Perfecto, revisaré el documento en breve.',
      timestamp: 'Hace 15 min'
    }
  ];
  newMessage: string = '';

  milestones: Milestone[] = [
    {
      id: 1,
      title: 'Kick-off Meeting',
      status: 'completed',
      date: '15 Nov 2025',
      pendingApprovals: []
    },
    {
      id: 2,
      title: 'Análisis de Requisitos',
      status: 'completed',
      date: '22 Nov 2025',
      documents: 3,
      pendingApprovals: []
    },
    {
      id: 3,
      title: 'Desarrollo Prototipo',
      status: 'awaiting-approval',
      date: 'Target: 10 Dic 2025',
      progress: 60,
      pendingApprovals: [
        { personName: 'Carlos Martínez', role: 'Project Manager', company: 'client', status: 'approved' },
        { personName: 'Ana García', role: 'Technical Lead', company: 'client', status: 'pending' },
        { personName: 'María López', role: 'Project Manager', company: 'provider', status: 'approved' }
      ]
    },
    {
      id: 4,
      title: 'Testing & QA',
      status: 'pending',
      date: '20 Dic 2025',
      pendingApprovals: []
    },
    {
      id: 5,
      title: 'Deployment',
      status: 'pending',
      date: '5 Ene 2026',
      pendingApprovals: []
    }
  ];

  proposal = {
    title: 'Propuesta: Chatbot Inteligente',
    value: 25000,
    timeline: '8 semanas',
    description: 'Desarrollo e implementación de un chatbot basado en IA para atención al cliente en e-commerce, con integración a CRM y pasarela de pagos.',
    deliverables: [
      'Documento de Especificación de Requisitos',
      'Prototipo Funcional',
      'Código Fuente Documentado',
      'Manual de Usuario y Administración',
      'Sesión de Capacitación'
    ]
  };

  roiCalculation: ROICalculation = {
    initialInvestment: 25000,
    monthlySavings: 5000,
    timeHorizon: 12,
    roi: 0,
    paybackPeriod: 0,
    totalSavings: 0
  };

  // Chart data for ROI
  roiChartData: any;
  roiChartOptions: any;

  supportTickets: SupportTicket[] = [
    {
      id: 'TICK-001',
      title: 'Pregunta sobre integración de APIs',
      category: 'technical',
      status: 'open',
      priority: 'medium',
      createdAt: '2024-01-20',
      lastUpdate: '2024-01-20'
    },
    {
      id: 'TICK-002',
      title: 'Clarificación sobre términos del contrato',
      category: 'legal',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2024-01-18',
      lastUpdate: '2024-01-21'
    }
  ];

  selectedTickets: SupportTicket[] = [];
  globalFilterValue: string = '';
  
  categoryOptions = [
    { label: 'Técnico', value: 'technical' },
    { label: 'Legal', value: 'legal' },
    { label: 'Facturación', value: 'billing' },
    { label: 'General', value: 'general' }
  ];

  priorityOptions = [
    { label: 'Baja', value: 'low' },
    { label: 'Media', value: 'medium' },
    { label: 'Alta', value: 'high' },
    { label: 'Urgente', value: 'urgent' }
  ];

  statusOptions = [
    { label: 'Abierto', value: 'open' },
    { label: 'En Progreso', value: 'in-progress' },
    { label: 'Resuelto', value: 'resolved' }
  ];

  newTicket = {
    title: '',
    category: 'general' as SupportTicket['category'],
    priority: 'medium' as SupportTicket['priority'],
    description: ''
  };

  unifiedQuestions: UnifiedQuestion[] = [
    {
      id: 'Q1',
      category: 'legal',
      question: '¿Cuáles son los términos de pago del proyecto?',
      answer: 'El pago se realiza en 3 cuotas: 40% al inicio, 40% a la mitad del proyecto, y 20% al finalizar. Todos los pagos están sujetos a la aprobación de hitos correspondientes.',
      relatedDocuments: ['Contrato de Servicios', 'Anexo Técnico']
    },
    {
      id: 'Q2',
      category: 'nda',
      question: '¿Qué información está cubierta por el NDA?',
      answer: 'El NDA cubre toda la información técnica, comercial y estratégica compartida entre las partes durante la duración del proyecto y 2 años después de su finalización.',
      relatedDocuments: ['Acuerdo de Confidencialidad (NDA)']
    },
    {
      id: 'Q3',
      category: 'documents',
      question: '¿Dónde puedo encontrar todos los documentos del proyecto?',
      answer: 'Todos los documentos están disponibles en la pestaña "Documentos". Puedes filtrar por tipo, fecha o etiquetas. Los documentos legales están en la pestaña "Legal & NDA".',
      relatedDocuments: []
    },
    {
      id: 'Q4',
      category: 'billing',
      question: '¿Cómo se facturan los cambios de alcance?',
      answer: 'Los cambios de alcance deben ser aprobados por ambas partes y se facturan según el tiempo adicional requerido. Se genera una orden de cambio que debe ser firmada antes de implementar.',
      relatedDocuments: ['Contrato de Servicios']
    },
    {
      id: 'Q5',
      category: 'technical',
      question: '¿Qué hacer si encuentro un problema técnico?',
      answer: 'Puedes crear un ticket de soporte desde la sección de Soporte o contactar directamente al Project Manager asignado. Los problemas urgentes se priorizan automáticamente.',
      relatedDocuments: []
    }
  ];

  clientTeam = [
    { name: 'Carlos Martínez', role: 'Project Manager', status: 'active' },
    { name: 'Ana García', role: 'Technical Lead', status: 'active' },
    { name: 'Luis Fernández', role: 'Business Analyst', status: 'inactive' }
  ];

  providerTeam = [
    { name: 'María López', role: 'Project Manager', status: 'active' },
    { name: 'Juan Pérez', role: 'Senior Developer', status: 'active' },
    { name: 'Sofia Rodríguez', role: 'UX Designer', status: 'active' },
    { name: 'David Torres', role: 'QA Engineer', status: 'active' }
  ];

  documents = [
    {
      id: '1',
      name: 'Propuesta_Chatbot_E-commerce_v1.pdf',
      type: 'pdf',
      uploadedBy: 'Nexus Solutions',
      uploadDate: '15 Nov 2025',
      tags: ['Propuesta', 'Comercial']
    },
    {
      id: '2',
      name: 'Requisitos_Funcionales.docx',
      type: 'doc',
      uploadedBy: 'Repsol',
      uploadDate: '18 Nov 2025',
      tags: ['Requisitos', 'Funcional']
    },
    {
      id: '3',
      name: 'Arquitectura_Tecnica.pdf',
      type: 'pdf',
      uploadedBy: 'Nexus Solutions',
      uploadDate: '20 Nov 2025',
      tags: ['Técnico', 'Arquitectura']
    },
    {
      id: '4',
      name: 'Cronograma_Proyecto.xlsx',
      type: 'xls',
      uploadedBy: 'Repsol',
      uploadDate: '22 Nov 2025',
      tags: ['Planificación', 'Cronograma']
    }
  ];

  legalDocuments = [
    {
      id: '1',
      title: 'Acuerdo de Confidencialidad (NDA)',
      description: 'Acuerdo de no divulgación entre las partes para proteger información confidencial del proyecto.',
      status: 'signed',
      version: '1.0',
      lastUpdate: '10 Nov 2025'
    },
    {
      id: '2',
      title: 'Contrato de Servicios',
      description: 'Contrato principal que establece los términos y condiciones del proyecto.',
      status: 'pending',
      version: '2.1',
      lastUpdate: '25 Nov 2025'
    },
    {
      id: '3',
      title: 'Anexo Técnico',
      description: 'Especificaciones técnicas detalladas del proyecto.',
      status: 'draft',
      version: '1.3',
      lastUpdate: '28 Nov 2025'
    }
  ];

  reviews = [
    {
      id: '1',
      reviewer: 'Carlos Martínez',
      rating: 5,
      comment: 'Excelente trabajo en la fase inicial. El equipo de Nexus Solutions ha demostrado gran profesionalidad y conocimiento técnico.',
      date: '20 Nov 2025',
      tags: ['Profesional', 'Técnico']
    },
    {
      id: '2',
      reviewer: 'María López',
      rating: 5,
      comment: 'Muy buena comunicación y colaboración con el equipo de Repsol. El proyecto avanza según lo planificado.',
      date: '22 Nov 2025',
      tags: ['Comunicación', 'Colaboración']
    }
  ];

  get averageRating(): number {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / this.reviews.length) * 10) / 10;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.dealId = this.route.snapshot.paramMap.get('id') || '';
    this.calculateROI();
    this.initROIChart();
  }

  initROIChart(): void {
    this.updateROIChart();
  }

  updateROIChart(): void {
    const labels = [];
    const investmentData = [];
    const savingsData = [];
    const netData = [];

    for (let i = 0; i <= this.roiCalculation.timeHorizon; i += 3) {
      labels.push(`Mes ${i}`);
      investmentData.push(-this.roiCalculation.initialInvestment);
      savingsData.push(this.roiCalculation.monthlySavings * i);
      netData.push((this.roiCalculation.monthlySavings * i) - this.roiCalculation.initialInvestment);
    }

    this.roiChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Inversión',
          data: investmentData,
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderColor: 'rgba(239, 68, 68, 1)',
          borderWidth: 2,
          fill: false
        },
        {
          label: 'Ahorros Acumulados',
          data: savingsData,
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
          fill: true
        },
        {
          label: 'Valor Neto',
          data: netData,
          backgroundColor: 'rgba(13, 134, 255, 0.2)',
          borderColor: 'rgba(13, 134, 255, 1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4
        }
      ]
    };

    this.roiChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#a0aec0'
          },
          position: 'top'
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context: any) {
              return context.dataset.label + ': €' + context.parsed.y.toLocaleString('es-ES');
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#a0aec0'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          }
        },
        y: {
          ticks: {
            color: '#a0aec0',
            callback: function(value: any) {
              return '€' + value.toLocaleString('es-ES');
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          }
        }
      }
    };
  }

  setActiveTab(tab: number): void {
    this.activeTab = tab;
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({
        sender: 'provider',
        senderName: 'Nexus Solutions',
        content: this.newMessage,
        timestamp: 'Ahora'
      });
      this.newMessage = '';
      setTimeout(() => {
        this.messageService.add({ severity: 'info', summary: 'Nuevo Mensaje', detail: 'El cliente ha respondido.' });
      }, 2000);
    }
  }

  openMeetingModal(): void {
    this.showMeetingModal = true;
  }

  scheduleMeeting(): void {
    if (this.meetingData.title && this.meetingData.date) {
      this.messageService.add({ severity: 'success', summary: 'Reunión Agendada', detail: `Reunión "${this.meetingData.title}" programada con éxito.` });
      this.showMeetingModal = false;
      this.meetingData = { title: '', date: null, duration: 30, participants: [] };
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Datos Incompletos', detail: 'Por favor complete el título y la fecha.' });
    }
  }

  openProposalDetails(): void {
    this.showProposalModal = true;
  }

  uploadDocument(): void {
    this.showUploadModal = true;
  }

  onUpload(event: any): void {
    this.messageService.add({ severity: 'success', summary: 'Documento Subido', detail: 'El documento se ha subido correctamente.' });
    this.showUploadModal = false;
    this.documents.unshift({
      id: String(this.documents.length + 1),
      name: event.files[0].name,
      type: 'pdf',
      uploadedBy: 'Yo',
      uploadDate: new Date().toLocaleDateString(),
      tags: ['Nuevo']
    });
  }

  downloadDocument(docId: string): void {
    this.messageService.add({ severity: 'success', summary: 'Descargando', detail: 'La descarga ha comenzado.' });
  }

  viewDocument(docId: string): void {
    const doc = this.documents.find(d => d.id === docId);
    if (doc) {
      this.selectedDocument = doc;
      this.showDocumentModal = true;
    }
  }

  viewLegalDocument(docId: string): void {
    this.messageService.add({ severity: 'info', summary: 'Documento Legal', detail: 'Abriendo visor de documentos legales...' });
  }

  signDocument(docId: string): void {
    this.confirmationService.confirm({
      message: '¿Confirmas la firma digital de este documento?',
      header: 'Firma Digital',
      icon: 'pi pi-pencil',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Firmado', detail: 'Documento firmado digitalmente.' });
      }
    });
  }

  getStars(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('✨');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }
    return stars;
  }

  toggleROICalculator(): void {
    this.setActiveTab(7);
  }

  calculateROI(): void {
    const { initialInvestment, monthlySavings, timeHorizon } = this.roiCalculation;
    const totalSavings = monthlySavings * timeHorizon;
    const netProfit = totalSavings - initialInvestment;
    const roi = (netProfit / initialInvestment) * 100;
    const paybackPeriod = initialInvestment / monthlySavings;

    this.roiCalculation.roi = Math.round(roi * 100) / 100;
    this.roiCalculation.paybackPeriod = Math.round(paybackPeriod * 10) / 10;
    this.roiCalculation.totalSavings = totalSavings;
    this.updateROIChart();
  }

  downloadROIReport(): void {
    this.messageService.add({ severity: 'success', summary: 'Informe ROI', detail: 'Generando informe de ROI...' });
  }

  toggleSupportModal(): void {
    this.showSupportModal = !this.showSupportModal;
  }

  createSupportTicket(): void {
    if (this.newTicket.title && this.newTicket.description) {
      const ticket: SupportTicket = {
        id: `TICK-${String(this.supportTickets.length + 1).padStart(3, '0')}`,
        title: this.newTicket.title,
        category: this.newTicket.category,
        status: 'open',
        priority: this.newTicket.priority,
        createdAt: new Date().toISOString().split('T')[0],
        lastUpdate: new Date().toISOString().split('T')[0]
      };
      this.supportTickets.unshift(ticket);
      this.newTicket = { title: '', category: 'general', priority: 'medium', description: '' };
      this.showSupportModal = false;
      this.messageService.add({ severity: 'success', summary: 'Ticket Creado', detail: 'Tu ticket de soporte ha sido creado.' });
    }
  }

  getPriorityColor(priority: string): string {
    const colors: { [key: string]: string } = {
      'urgent': 'danger',
      'high': 'warning',
      'medium': 'info',
      'low': 'success'
    };
    return colors[priority] || 'info';
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'open': 'warning',
      'in-progress': 'info',
      'resolved': 'success'
    };
    return colors[status] || 'info';
  }

  toggleUnifiedQuestions(): void {
    this.showUnifiedQuestions = !this.showUnifiedQuestions;
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'legal': '⚖️',
      'nda': '🔒',
      'documents': '📄',
      'billing': '💰',
      'technical': '🔧'
    };
    return icons[category] || '❓';
  }

  generatePDFReport(): void {
    this.messageService.add({ severity: 'info', summary: 'Generando PDF', detail: 'El informe completo se está generando...' });
  }

  getPendingApprovalsCount(milestone: Milestone): number {
    if (!milestone.pendingApprovals) return 0;
    return milestone.pendingApprovals.filter(a => a.status === 'pending').length;
  }

  getApprovedCount(milestone: Milestone): number {
    if (!milestone.pendingApprovals) return 0;
    return milestone.pendingApprovals.filter(a => a.status === 'approved').length;
  }

  getOpenTicketsCount(): number {
    return this.supportTickets.filter(t => t.status === 'open').length;
  }

  getInProgressTicketsCount(): number {
    return this.supportTickets.filter(t => t.status === 'in-progress').length;
  }

  getResolvedTicketsCount(): number {
    return this.supportTickets.filter(t => t.status === 'resolved').length;
  }

  viewTicket(ticket: SupportTicket): void {
    this.messageService.add({ 
      severity: 'info', 
      summary: 'Ver Ticket', 
      detail: `Abriendo detalles del ticket ${ticket.id}...` 
    });
    // TODO: Open ticket detail modal
  }

  editTicket(ticket: SupportTicket): void {
    this.newTicket = {
      title: ticket.title,
      category: ticket.category,
      priority: ticket.priority,
      description: '' // TODO: Load description from ticket
    };
    this.showSupportModal = true;
    this.messageService.add({ 
      severity: 'info', 
      summary: 'Editar Ticket', 
      detail: `Editando ticket ${ticket.id}...` 
    });
  }

  getCategoryLabel(category: string): string {
    const option = this.categoryOptions.find(opt => opt.value === category);
    return option ? option.label : category;
  }

  getPriorityLabel(priority: string): string {
    const option = this.priorityOptions.find(opt => opt.value === priority);
    return option ? option.label : priority;
  }

  getStatusLabel(status: string): string {
    const option = this.statusOptions.find(opt => opt.value === status);
    return option ? option.label : status;
  }

  calculateTotalProgress(): number {
    if (this.milestones.length === 0) return 0;
    let total = 0;
    this.milestones.forEach(m => {
      if (m.status === 'completed') total += 100;
      else if (m.status === 'in-progress') total += (m.progress || 50);
      else if (m.status === 'awaiting-approval') total += 90;
    });
    return Math.round(total / this.milestones.length);
  }

  openAchievementModal(milestone?: Milestone): void {
    if (milestone) {
      this.achievementData = {
        title: `¡Hito Alcanzado: ${milestone.title}!`,
        description: `Estamos avanzando con éxito en el proyecto "${this.dealInfo.title}" junto a ${this.dealInfo.provider === 'Nexus Solutions' ? this.dealInfo.client : this.dealInfo.provider}. #Innovación #IA #Conectian`,
        image: '🎯'
      };
    } else {
      const progress = this.calculateTotalProgress();
      this.achievementData = {
        title: `¡Proyecto al ${progress}%!`,
        description: `Orgullosos del progreso en "${this.dealInfo.title}". La colaboración entre ${this.dealInfo.client} y ${this.dealInfo.provider} está dando frutos increíbles. #DigitalTransformation #Success`,
        image: '🚀'
      };
    }
    this.showAchievementModal = true;
  }

  closeAchievementModal(): void {
    this.showAchievementModal = false;
  }

  shareOnLinkedIn(): void {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
    this.showAchievementModal = false;
    this.messageService.add({ severity: 'success', summary: 'Compartido', detail: 'Redirigiendo a LinkedIn...' });
  }

  getCompletedMilestonesCount(): number {
    return this.milestones.filter(m => m.status === 'completed').length;
  }

  getPendingMilestonesCount(): number {
    return this.milestones.filter(m => m.status !== 'completed').length;
  }
}
