import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientgrowthcenter',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    CardModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule
  ],
  templateUrl: './clientgrowthcenter.component.html',
  styleUrls: ['./clientgrowthcenter.component.scss']
})
export class ClientGrowthCenterComponent {
  @Input() showNavbar: boolean = true;

  mapOptions: any[] = [
    { label: 'Global', value: 'global' },
    { label: 'Regional', value: 'regional' }
  ];

  selectedMapOption: string = 'global';
}


