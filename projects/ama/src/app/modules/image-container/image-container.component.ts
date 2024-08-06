import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent {
  @Input() center: boolean = false;
  @Input() title: string = '';
  @Input() imageSrc: string = '';
  @Input() width: number = 200; 
  @Input() height: number = 200; 
}

