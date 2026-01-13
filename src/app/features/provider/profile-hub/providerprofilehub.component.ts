import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ProviderProfileComponent } from '../profile/providerprofile.component';
import { ProviderCompanyComponent } from '../company/providercompany.component';
import { ProviderBadgesComponent } from '../badges/providerbadges.component';
import { ProviderPaymentsComponent } from '../payments/providerpayments.component';

@Component({
  selector: 'app-provider-profile-hub',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ProviderProfileComponent, ProviderCompanyComponent, ProviderBadgesComponent, ProviderPaymentsComponent],
  templateUrl: './providerprofilehub.component.html',
  styleUrls: ['./providerprofilehub.component.scss']
})
export class ProviderProfileHubComponent {
  activeTab: 'profile' | 'company' | 'badges' | 'payments' = 'profile';

  setActiveTab(tab: 'profile' | 'company' | 'badges' | 'payments') {
    this.activeTab = tab;
  }
}
