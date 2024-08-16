import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-salutation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salutation.component.html',
  styleUrl: './salutation.component.scss'
})
export class SalutationComponent {
  progressSteps = ['Step 1', 'Step 2', 'Step 3'];
  currentStep = 2;  

}
