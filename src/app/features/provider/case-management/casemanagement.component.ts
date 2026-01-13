import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-casemanagement',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './casemanagement.component.html',
  styleUrls: ['./casemanagement.component.scss']
})
export class CaseManagementComponent {
  constructor(private router: Router) { }

  createCase() {
    this.router.navigate(['/provider/publish-case']);
  }
}
