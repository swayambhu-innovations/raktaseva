import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CancelledComponent } from "./modules/cancelled/cancelled.component";
import { PendingComponent } from "./modules/pending/pending.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CancelledComponent, PendingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ama';
}
