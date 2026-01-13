#!/usr/bin/env node
/**
 * Batch Component Generator Script
 * Generates all remaining Angular components with base structure
 * Run: node generate-components.js
 */

const fs = require('fs');
const path = require('path');

// Component definitions
const components = [
  //CLIENT
  { name: 'CaseDetailComponent', path: 'client/case-detail', route: 'case/:id' },
  { name: 'ProviderProfileComponent', path: 'client/provider-profile', route: 'provider/:id' },
  { name: 'PublishRfidComponent', path: 'client/publish-rfid', route: 'publish-rfid' },
  { name: 'ClientInnovationCenterComponent', path: 'client/innovation-center', route: 'innovation-center' },
  { name: 'ClientNotificationsComponent', path: 'client/notifications', route: 'notifications' },
  
  // PROVIDER
  { name: 'ProviderDashboardComponent', path: 'provider/dashboard', route: 'dashboard' },
  { name: 'CompanyMarketplaceComponent', path: 'provider/company-marketplace', route: 'marketplace' },
  { name: 'CaseManagementComponent', path: 'provider/case-management', route: 'cases' },
  { name: 'ProviderInnovationCenterComponent', path: 'provider/innovation-center', route: 'innovation-center' },
  { name: 'LeadsCrmComponent', path: 'provider/leads-crm', route: 'leads' },
  { name: 'ProviderNotificationsComponent', path: 'provider/notifications', route: 'notifications' },
  
  // DEAL ROOM
  { name: 'DealRoomComponent', path: 'deal-room', route: ':id' },
  
  // ADMIN
  { name: 'AdminDashboardComponent', path: 'admin/dashboard', route: 'dashboard' },
  { name: 'AdminUsersComponent', path: 'admin/users', route: 'users' },
  { name: 'AdminContentComponent', path: 'admin/content', route: 'content' },
  { name: 'AdminFinanceComponent', path: 'admin/finance', route: 'finance' },
  { name: 'AdminConfigComponent', path: 'admin/config', route: 'config' },
  { name: 'AdminMonitoringComponent', path: 'admin/monitoring', route: 'monitoring' },
];

// Template generator
function generateComponentTS(name) {
  return `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-${name.toLowerCase().replace('component', '')}',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent],
  templateUrl: './${name.toLowerCase().replace('component', '')}.component.html',
  styleUrls: ['./${name.toLowerCase().replace('component', '')}.component.scss']
})
export class ${name} {
  // TODO: Implement component logic
}
`;
}

function generateComponentHTML(name) {
  const title = name.replace('Component', '').replace(/([A-Z])/g, ' $1').trim();
  return `<div>
  <app-navbar></app-navbar>
  
  <div class="container">
    <app-card>
      <h1>🚧 ${title}</h1>
      <p class="text-secondary">Vista en construcción - Funcionalidad próximamente</p>
      
      <div class="mt-8">
        <app-button variant="primary">Acción Principal</app-button>
      </div>
    </app-card>
  </div>
</div>
`;
}

function generateComponentSCSS() {
  return `@import '../../../../styles/variables';

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: $spacing-8;
}
`;
}

// Generate files
components.forEach(comp => {
  const basePath = `src/app/features/${comp.path}`;
  const fileName = comp.name.toLowerCase().replace('component', '');
  
  // Create TypeScript
  const tsPath = path.join(basePath, `${fileName}.component.ts`);
  fs.writeFileSync(tsPath, generateComponentTS(comp.name));
  
  // Create HTML
  const htmlPath = path.join(basePath, `${fileName}.component.html`);
  fs.writeFileSync(htmlPath, generateComponentHTML(comp.name));
  
  // Create SCSS
  const scssPath = path.join(basePath, `${fileName}.component.scss`);
  fs.writeFileSync(scssPath, generateComponentSCSS());
  
  console.log(`✓ Generated ${comp.name}`);
});

console.log('\n✅ All components generated successfully!');
