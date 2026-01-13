import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-providercompany',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './providercompany.component.html',
  styleUrls: ['./providercompany.component.scss']
})
export class ProviderCompanyComponent {
  @Input() showNavbar: boolean = true;
  // Logic for provider company view
}
