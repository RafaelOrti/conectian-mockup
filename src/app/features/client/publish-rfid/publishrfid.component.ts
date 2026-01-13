import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { UseCaseFormComponent, UseCaseForm } from '../../../shared/components/use-case-form/use-case-form.component';

@Component({
  selector: 'app-publishrfid',
  standalone: true,
  imports: [CommonModule, NavbarComponent, UseCaseFormComponent],
  template: `
    <div class="publish-rfid-page">
      <app-navbar 
        [userRole]="'CLIENT'"
        [userName]="'Carlos Martínez'"
        [notificationCount]="3"
      ></app-navbar>
      
      <div class="container">
        <app-use-case-form
          title="Añadir Caso de Uso"
          storageKey="useCaseDraft"
          (formSubmit)="onFormSubmit($event)"
        ></app-use-case-form>
      </div>
    </div>
  `,
  styleUrls: ['./publishrfid.component.scss']
})
export class PublishRfidComponent {
  constructor(private router: Router) {}

  onFormSubmit(formData: UseCaseForm): void {
    console.log('Submitting form:', formData);
    // TODO: Submit to backend
    this.router.navigate(['/client/marketplace']);
  }
}
