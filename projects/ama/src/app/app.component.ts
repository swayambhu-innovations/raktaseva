import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CancelledComponent } from "./modules/cancelled/cancelled.component";
import { PendingComponent } from "./modules/pending/pending.component";
import { UserAndPermissionComponent } from "./user-and-permission/user-and-permission.component";
import { LoginComponent } from "./auth/login/login.component";
import { ApprovedComponent } from "./modules/approved/approved.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TotalRequestComponent } from "./dashboard/charts/total-request/total-request.component";
import { ApprovedRequestComponent } from "./dashboard/charts/approved-request/approved-request.component";
import { ChartContainerComponent } from "./dashboard/charts/chart-container/chart-container.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { OverallReportComponent } from "./dashboard/charts/overall-report/overall-report.component";
import { StatisticsComponent } from "./dashboard/charts/statistics/statistics.component";
import { EditProfileComponent } from "../../../raktseva/src/app/edit-profile/edit-profile.component";
import { NotAdminComponent } from "./auth/not-admin/not-admin.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
// import { MailgunComponent } from "./mailgun/mailgun.component";
import { ConfirmationDialogComponent } from './user-and-permission/dialog/dialog.component';
import { DonorReadyDonationComponent } from "./modules/donor-ready-donation/donor-ready-donation.component";
import { ImageContainerComponent } from "./modules/image-container/image-container.component";
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
// import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CancelledComponent, UserAndPermissionComponent, PendingComponent, LoginComponent, ApprovedComponent, DashboardComponent, TotalRequestComponent, ApprovedRequestComponent, ChartContainerComponent, OverallReportComponent, StatisticsComponent, ConfirmationDialogComponent, EditProfileComponent, NotAdminComponent, SidebarComponent, DonorReadyDonationComponent, ImageContainerComponent,HttpClientModule,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ama';
}
