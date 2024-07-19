import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cancelled',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './cancelled.component.html',
  styleUrl: './cancelled.component.scss'
})
export class CancelledComponent {
  isOpen = false;

  openModal() {
      this.isOpen = true;
  }

  closeModal() {
      this.isOpen = false;
  }
}


