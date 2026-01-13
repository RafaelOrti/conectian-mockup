import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { UseCaseFormComponent, UseCaseForm } from '../../../shared/components/use-case-form/use-case-form.component';

@Component({
  selector: 'app-provider-publish-case',
  standalone: true,
  imports: [CommonModule, NavbarComponent, UseCaseFormComponent],
  template: `
    <div class="publish-case-page">
      <app-navbar 
        [userRole]="'PROVIDER'"
        [userName]="'María López'"
        [notificationCount]="2"
      ></app-navbar>
      
      <div class="container">
        <app-use-case-form
          title="Publicar Caso de Uso"
          storageKey="providerUseCaseDraft"
          (formSubmit)="onFormSubmit($event)"
        ></app-use-case-form>
      </div>
    </div>
  `,
  styleUrls: ['./providerpublishcase.component.scss']
})
export class ProviderPublishCaseComponent {
  constructor(private router: Router) {}

  onFormSubmit(formData: UseCaseForm): void {
    console.log('Submitting use case:', formData);
    // TODO: Submit to backend
    this.router.navigate(['/provider/cases']);
  }
}
