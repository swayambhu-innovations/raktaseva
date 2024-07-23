import { Component } from '@angular/core';
import { HeaderWithBackComponent } from '../shared/header-with-back/header-with-back/header-with-back.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [HeaderWithBackComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

}
