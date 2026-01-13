import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';

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

@Component({
  selector: 'app-deal-room',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, CardComponent, ButtonComponent, BadgeComponent],
  templateUrl: './dealroom.component.html',
  styleUrls: ['./dealroom.component.scss']
})
export class DealRoomComponent implements OnInit {
  dealId: string = '';
  activeTab: number = 1;
  today: Date = new Date();
  showROICalculator: boolean = false;
  showSupportModal: boolean = false;
  showUnifiedQuestions: boolean = false;
  showAchievementModal: boolean = false;
  achievementData = {
    title: '',
    description: '',
    image: '🚀'
  };

  dealInfo = {
    title: 'Proyecto: Chatbot para E-commerce',
    client: 'Repsol',
    provider: 'Nexus Solutions',
    status: 'active'
  };

  // Tab 1: Chat
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

  // Tab 4: Milestones with approvals
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
    timeline: '8 semanas'
  };

  // ROI Calculator
  roiCalculation: ROICalculation = {
    initialInvestment: 25000,
    monthlySavings: 5000,
    timeHorizon: 12,
    roi: 0,
    paybackPeriod: 0,
    totalSavings: 0
  };

  // Support
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

  newTicket = {
    title: '',
    category: 'general' as SupportTicket['category'],
    priority: 'medium' as SupportTicket['priority'],
    description: ''
  };

  // Unified Questions
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

  // Tab 2: Teams
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

  // Tab 3: Documents
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

  // Tab 5: Legal Documents
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

  // Tab 6: Reviews
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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dealId = this.route.snapshot.paramMap.get('id') || '';
    this.calculateROI();
  }

  setActiveTab(tab: number): void {
    this.activeTab = tab;
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({
        sender: 'client',
        senderName: 'Carlos (Repsol)',
        content: this.newMessage,
        timestamp: 'Ahora'
      });
      this.newMessage = '';
    }
  }

  acceptProposal(): void {
    console.log('Proposal accepted');
  }

  rejectProposal(): void {
    console.log('Proposal rejected');
  }

  uploadDocument(): void {
    console.log('Upload document');
  }

  downloadDocument(docId: string): void {
    console.log('Download document:', docId);
  }

  viewDocument(docId: string): void {
    console.log('View document:', docId);
  }

  viewLegalDocument(docId: string): void {
    console.log('View legal document:', docId);
  }

  signDocument(docId: string): void {
    console.log('Sign document:', docId);
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

  // ROI Calculator
  toggleROICalculator(): void {
    this.setActiveTab(8);
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
  }

  // Support
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
    }
  }

  getPriorityColor(priority: string): string {
    const colors: { [key: string]: string } = {
      'urgent': '#f4444a',
      'high': '#f96908',
      'medium': '#0d86ff',
      'low': '#18b981'
    };
    return colors[priority] || '#718096';
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'open': '#f96908',
      'in-progress': '#0d86ff',
      'resolved': '#18b981'
    };
    return colors[status] || '#718096';
  }

  // Unified Questions
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

  // PDF Generation
  generatePDFReport(): void {
    // This would typically use a library like jsPDF or pdfmake
    console.log('Generating PDF report...');
    // TODO: Implement PDF generation with all deal room data
    alert('Generando informe PDF... Esta funcionalidad se implementará con jsPDF o pdfmake.');
  }

  // Milestone approvals
  getPendingApprovalsCount(milestone: Milestone): number {
    if (!milestone.pendingApprovals) return 0;
    return milestone.pendingApprovals.filter(a => a.status === 'pending').length;
  }

  getApprovedCount(milestone: Milestone): number {
    if (!milestone.pendingApprovals) return 0;
    return milestone.pendingApprovals.filter(a => a.status === 'approved').length;
  }

  // Support ticket counts
  getOpenTicketsCount(): number {
    return this.supportTickets.filter(t => t.status === 'open').length;
  }

  getInProgressTicketsCount(): number {
    return this.supportTickets.filter(t => t.status === 'in-progress').length;
  }

  getResolvedTicketsCount(): number {
    return this.supportTickets.filter(t => t.status === 'resolved').length;
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

  // Social Proof Engineering
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
    // In a real app, this would open the LinkedIn share dialog with a generated image or post
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
    this.showAchievementModal = false;
  }
}
