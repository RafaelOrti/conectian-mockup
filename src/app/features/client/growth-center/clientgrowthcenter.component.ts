import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-clientgrowthcenter',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './clientgrowthcenter.component.html',
  styleUrls: ['./clientgrowthcenter.component.scss']
})
export class ClientGrowthCenterComponent {
  @Input() showNavbar: boolean = true;
  // Logic for growth center
}
