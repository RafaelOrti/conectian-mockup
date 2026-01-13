import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-clientbadges',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './clientbadges.component.html',
  styleUrls: ['./clientbadges.component.scss']
})
export class ClientBadgesComponent {
  @Input() showNavbar: boolean = true;
  // Logic for badges
}
