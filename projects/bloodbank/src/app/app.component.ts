import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BloodInventoryComponent } from "./blood-inventory/blood-inventory.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LoginComponent } from "./auth/login/login.component";
import { NotAdminComponent } from "./auth/not-admin/not-admin.component";
import { DonorDetailComponent } from "./donor-detail/donor-detail.component";
import { SidebarComponent } from "../../../ama/src/app/sidebar/sidebar.component";
import { BbsidebarComponent } from "./shared/bbsidebar/bbsidebar.component";
import { ReceiverDetailComponent } from "./receiver-detail/receiver-detail.component";
import { AssignDonorDialogComponent } from "./receiver-detail/assign-donor-dialog/assign-donor-dialog.component";
import { CheckupFormDialogComponent } from "./receiver-detail/checkup-form-dialog/checkup-form-dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BloodInventoryComponent, SidebarComponent, LoginComponent, NotAdminComponent, BbsidebarComponent, DonorDetailComponent, ReceiverDetailComponent, AssignDonorDialogComponent, CheckupFormDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bloodbank';
}
