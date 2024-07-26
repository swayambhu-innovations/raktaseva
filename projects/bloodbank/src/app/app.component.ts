import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BloodInventoryComponent } from "./blood-inventory/blood-inventory.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LoginComponent } from "./auth/login/login.component";
import { NotAdminComponent } from "./auth/not-admin/not-admin.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BloodInventoryComponent, SidebarComponent, LoginComponent, NotAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bloodbank';
}
