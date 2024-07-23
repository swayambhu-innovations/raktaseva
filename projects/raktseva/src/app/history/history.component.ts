import { Component } from '@angular/core';
import { HeaderWithBackComponent } from "../shared/header-with-back/header-with-back/header-with-back.component";
import { BottomNavbarComponent } from "../shared/bottom-navbar/bottom-navbar.component";

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [HeaderWithBackComponent, BottomNavbarComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

}
