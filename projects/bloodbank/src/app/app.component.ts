import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DonorDetailComponent } from "./donor-detail/donor-detail.component";
import { SidebarComponent } from "../../../ama/src/app/sidebar/sidebar.component";
import { BbsidebarComponent } from "./shared/bbsidebar/bbsidebar.component";
import { ReceiverDetailComponent } from "./receiver-detail/receiver-detail.component";
import { AssignDonorDialogComponent } from "./receiver-detail/assign-donor-dialog/assign-donor-dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BbsidebarComponent, DonorDetailComponent, ReceiverDetailComponent, AssignDonorDialogComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bloodbank';
}
