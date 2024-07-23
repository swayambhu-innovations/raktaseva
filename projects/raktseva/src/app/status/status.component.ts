import { Component } from '@angular/core';
import { HeaderWithBackComponent } from "../shared/header-with-back/header-with-back/header-with-back.component";

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [HeaderWithBackComponent,HeaderWithBackComponent],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {

}
