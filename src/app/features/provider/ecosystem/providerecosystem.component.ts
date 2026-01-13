import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ProviderInnovationCenterComponent } from '../innovation-center/providerinnovationcenter.component';
import { GrowthCenterComponent } from '../growth-center/growthcenter.component';
import { MarketAnalysisComponent } from '../market-analysis/marketanalysis.component';

@Component({
  selector: 'app-provider-ecosystem',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ProviderInnovationCenterComponent, GrowthCenterComponent, MarketAnalysisComponent],
  templateUrl: './providerecosystem.component.html',
  styleUrls: ['./providerecosystem.component.scss']
})
export class ProviderEcosystemComponent {
  activeTab: 'innovation' | 'growth' | 'market' = 'innovation';

  setActiveTab(tab: 'innovation' | 'growth' | 'market') {
    this.activeTab = tab;
  }
}
