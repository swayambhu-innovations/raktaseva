import { Component } from '@angular/core';
import { TotalRequestComponent } from "./charts/total-request/total-request.component";
import { ChartContainerComponent } from "./charts/chart-container/chart-container.component";
import { ApprovedRequestComponent } from "./charts/approved-request/approved-request.component";
import { CommonModule } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { OverallReportComponent } from "./charts/overall-report/overall-report.component";
import { RequestRejectedComponent } from "./charts/request-rejected/request-rejected.component";
import { StatisticsComponent } from "./charts/statistics/statistics.component";
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this
import { AuthService } from '../auth/auth.service';
import { signOut } from 'firebase/auth';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TotalRequestComponent, ChartContainerComponent, ApprovedRequestComponent, OverallReportComponent, RequestRejectedComponent, StatisticsComponent,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [
    provideAnimations()
  ]
})

export class DashboardComponent {
  constructor(private authService:AuthService,){}

  totalRequest: any;
  approved: any;
  rejected: any;
  pending:any

  triggerSignout() {
    this.authService.signout().then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  }
}

