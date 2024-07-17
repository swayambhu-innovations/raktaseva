import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CancelledComponent } from "./modules/cancelled/cancelled.component";
import { UserAndPermissionComponent } from "./user-and-permission/user-and-permission.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CancelledComponent, UserAndPermissionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ama';
}
