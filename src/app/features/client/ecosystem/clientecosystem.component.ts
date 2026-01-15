import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ClientInnovationCenterComponent } from '../innovation-center/clientinnovationcenter.component';
import { ClientGrowthCenterComponent } from '../growth-center/clientgrowthcenter.component';
import { ClientMarketAnalysisComponent } from '../market-analysis/clientmarketanalysis.component';

import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-client-ecosystem',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ClientInnovationCenterComponent,
    ClientGrowthCenterComponent,
    ClientMarketAnalysisComponent,
    TabViewModule
  ],
  templateUrl: './clientecosystem.component.html',
  styleUrls: ['./clientecosystem.component.scss']
})
export class ClientEcosystemComponent {
  // PrimeNG TabView handles state internally
}
