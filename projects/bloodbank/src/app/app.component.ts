import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BloodInventoryComponent } from "./blood-inventory/blood-inventory.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LoginComponent } from "./auth/login/login.component";
import { NotAdminComponent } from "./auth/not-admin/not-admin.component";
import { DonorDetailComponent } from "./donor-detail/donor-detail.component";
import { BbsidebarComponent } from "./shared/bbsidebar/bbsidebar.component";
import { ReceiverDetailComponent } from "./receiver-detail/receiver-detail.component";
import { AssignDonorDialogComponent } from "./receiver-detail/assign-donor-dialog/assign-donor-dialog.component";
import { CheckupFormDialogComponent } from "./receiver-detail/checkup-form-dialog/checkup-form-dialog.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TotalRequestComponent } from './dashboard/charts/total-request/total-request.component';
import { ApprovedRequestComponent } from './dashboard/charts/approved-request/approved-request.component';
import { ChartContainerComponent } from './dashboard/charts/chart-container/chart-container.component';
import { OverallReportComponent } from './dashboard/charts/overall-report/overall-report.component';
import { StatisticsComponent } from './dashboard/charts/statistics/statistics.component';
import { CommonModule } from '@angular/common';

import { UserPermissionComponent } from "./user-permission/user-permission.component";
import { ConfirmationDialogComponent } from "../../../ama/src/app/user-and-permission/dialog/dialog.component";
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    BloodInventoryComponent,
    SidebarComponent,
    LoginComponent,
    NotAdminComponent,
    BbsidebarComponent,
    DonorDetailComponent,
    ReceiverDetailComponent,
    AssignDonorDialogComponent,
    CheckupFormDialogComponent,
    DashboardComponent, TotalRequestComponent,
    ApprovedRequestComponent, ChartContainerComponent,
    OverallReportComponent, StatisticsComponent, UserPermissionComponent, ConfirmationDialogComponent,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bloodbank';
}
