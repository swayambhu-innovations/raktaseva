import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientDetailsComponent } from "./patient-details/patient-details.component";

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [CommonModule, PatientDetailsComponent],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.scss'
})
export class PendingComponent {
  isOpen = false;

  openModal() {
      this.isOpen = true;
  }

  closeModal() {
      this.isOpen = false;
  }
}




