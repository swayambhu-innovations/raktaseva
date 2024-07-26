import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blood-inventory',
  standalone: true,
  imports: [SidebarComponent,CommonModule],
  templateUrl: './blood-inventory.component.html',
  styleUrl: './blood-inventory.component.scss'
})
export class BloodInventoryComponent {
pendingSummary: any;
bloodGroups = [
  { name: 'A+', units: 10 },
  { name: 'B+', units: 10 },
  { name: 'AB+', units: 10 },
  { name: 'O+', units: 10 },
  { name: 'A-', units: 10 },
  { name: 'B-', units: 10 },
  { name: 'AB-', units: 10 },
  { name: 'O-', units: 10 }
];

}
