import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { ClientProfileComponent } from '../profile/clientprofile.component';
import { ClientCompanyComponent } from '../company/clientcompany.component';
import { ClientBadgesComponent } from '../badges/clientbadges.component';
import { ClientPaymentsComponent } from '../payments/clientpayments.component';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-client-profile-hub',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent, 
    ClientProfileComponent, 
    ClientCompanyComponent, 
    ClientBadgesComponent, 
    ClientPaymentsComponent,
    TabViewModule,
    CardModule,
    AvatarModule,
    BadgeModule
  ],
  templateUrl: './clientprofilehub.component.html',
  styleUrls: ['./clientprofilehub.component.scss']
})
export class ClientProfileHubComponent {
  activeIndex: number = 0;

  userStats = {
    completionRate: 85,
    badges: 12,
    rating: 4.8,
    projects: 24
  };
}
