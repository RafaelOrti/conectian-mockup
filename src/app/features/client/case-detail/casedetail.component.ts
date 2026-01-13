import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-case-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent, BadgeComponent],
  templateUrl: './casedetail.component.html',
  styleUrls: ['./casedetail.component.scss']
})
export class CaseDetailComponent implements OnInit {
  caseId: string = '';

  caseData = {
    title: 'Reducción del Fraude Transaccional en 25%',
    relevanceScore: 92,
    provider: {
      id: '1',
      name: 'IA-Segura Corp',
      logo: '🔐',
      verified: true,
      rating: 4.8,
      projects: 32
    },
    challenge: `El banco enfrentaba un aumento del 40% en transacciones fraudulentas en los últimos 18 meses, 
    con pérdidas estimadas de €2.5M anuales. Los sistemas de detección basados en reglas generaban 
    un alto número de falsos positivos (65%), afectando la experiencia del cliente.`,
    solution: `Implementamos un modelo de Machine Learning basado en XGBoost con:
    • Análisis en tiempo real de 150+ variables
    • Detección de patrones anómalos con 99.2% de precisión
    • Integración con sistemas legacy vía API REST
    • Dashboard de monitoreo 24/7 para el equipo de fraude`,
    results: [
      { label: 'ROI', value: '300%', icon: '💰', color: 'green' },
      { label: 'Reducción de fraude', value: '25%', icon: '🛡️', color: 'blue' },
      { label: 'Falsos positivos', value: '-45%', icon: '✅', color: 'purple' },
      { label: 'Tiempo de detección', value: '<2s', icon: '⚡', color: 'orange' }
    ],
    timeline: '3 meses',
    teamSize: '5 Analistas de Datos',
    industry: 'Banca/Fintech',
    techStack: ['Python', 'XGBoost', 'TensorFlow', 'AWS', 'Docker', 'PostgreSQL'],
    chartData: {
      before: [4.2, 4.5, 4.8, 5.1],
      after: [5.1, 4.2, 3.5, 3.8]
    }
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.caseId = this.route.snapshot.paramMap.get('id') || '';
  }

  startConversation(): void {
    console.log('Iniciar conversación con proveedor');
    // TODO: Navigate to deal room or open chat
  }

  viewProviderProfile(): void {
    console.log('Ver perfil del proveedor:', this.caseData.provider.id);
    // TODO: Navigate to provider profile
  }
}
