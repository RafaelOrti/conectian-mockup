import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ClientProfileComponent } from '../profile/clientprofile.component';
import { ClientCompanyComponent } from '../company/clientcompany.component';
import { ClientBadgesComponent } from '../badges/clientbadges.component';
import { ClientPaymentsComponent } from '../payments/clientpayments.component';

@Component({
  selector: 'app-client-profile-hub',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ClientProfileComponent, ClientCompanyComponent, ClientBadgesComponent, ClientPaymentsComponent],
  templateUrl: './clientprofilehub.component.html',
  styleUrls: ['./clientprofilehub.component.scss']
})
export class ClientProfileHubComponent {
  activeTab: 'profile' | 'company' | 'badges' | 'payments' = 'profile';

  setActiveTab(tab: 'profile' | 'company' | 'badges' | 'payments') {
    this.activeTab = tab;
  }
}
