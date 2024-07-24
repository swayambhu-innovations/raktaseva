import { Component } from '@angular/core';
import { HeaderWithBackComponent } from "../shared/header-with-back/header-with-back/header-with-back.component";

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [HeaderWithBackComponent],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent {

}
