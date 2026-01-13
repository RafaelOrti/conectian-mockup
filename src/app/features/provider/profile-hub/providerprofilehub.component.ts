import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ProviderProfileComponent } from '../profile/providerprofile.component';
import { ProviderCompanyComponent } from '../company/providercompany.component';
import { ProviderBadgesComponent } from '../badges/providerbadges.component';

@Component({
  selector: 'app-provider-profile-hub',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ProviderProfileComponent, ProviderCompanyComponent, ProviderBadgesComponent],
  templateUrl: './providerprofilehub.component.html',
  styleUrls: ['./providerprofilehub.component.scss']
})
export class ProviderProfileHubComponent {
  activeTab: 'profile' | 'company' | 'badges' = 'profile';

  setActiveTab(tab: 'profile' | 'company' | 'badges') {
    this.activeTab = tab;
  }
}
