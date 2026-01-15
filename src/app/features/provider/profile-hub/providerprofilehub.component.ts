import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ProviderProfileComponent } from '../profile/providerprofile.component';
import { ProviderCompanyComponent } from '../company/providercompany.component';
import { ProviderBadgesComponent } from '../badges/providerbadges.component';
import { ProviderPaymentsComponent } from '../payments/providerpayments.component';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-provider-profile-hub',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent, 
    ProviderProfileComponent, 
    ProviderCompanyComponent, 
    ProviderBadgesComponent, 
    ProviderPaymentsComponent,
    TabViewModule,
    CardModule,
    AvatarModule,
    BadgeModule
  ],
  templateUrl: './providerprofilehub.component.html',
  styleUrls: ['./providerprofilehub.component.scss']
})
export class ProviderProfileHubComponent {
  activeIndex: number = 0;

  userStats = {
    completionRate: 85,
    badges: 12,
    rating: 4.8,
    projects: 24
  };
}
