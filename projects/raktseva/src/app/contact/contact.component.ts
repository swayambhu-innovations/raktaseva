import { Component } from '@angular/core';
import { HeaderWithBackComponent } from "../shared/header-with-back/header-with-back/header-with-back.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderWithBackComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
