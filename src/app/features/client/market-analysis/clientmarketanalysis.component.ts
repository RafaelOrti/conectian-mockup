import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-clientmarketanalysis',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './clientmarketanalysis.component.html',
  styleUrls: ['./clientmarketanalysis.component.scss']
})
export class ClientMarketAnalysisComponent {
  @Input() showNavbar: boolean = true;
  // Logic for market analysis
}
