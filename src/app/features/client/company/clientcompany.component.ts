import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-clientcompany',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './clientcompany.component.html',
  styleUrls: ['./clientcompany.component.scss']
})
export class ClientCompanyComponent {
  @Input() showNavbar: boolean = true;
  // Logic for company view
}
