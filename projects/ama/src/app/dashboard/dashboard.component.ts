import { Component, OnInit } from '@angular/core';
import { TotalRequestComponent } from './charts/total-request/total-request.component';
import { ChartContainerComponent } from './charts/chart-container/chart-container.component';
import { ApprovedRequestComponent } from './charts/approved-request/approved-request.component';
import { CommonModule } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { OverallReportComponent } from './charts/overall-report/overall-report.component';
import { RequestRejectedComponent } from './charts/request-rejected/request-rejected.component';
import { StatisticsComponent } from './charts/statistics/statistics.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this
import { AuthService } from '../auth/auth.service';
import { signOut } from 'firebase/auth';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { collection, getDocs } from '@firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    TotalRequestComponent,
    ChartContainerComponent,
    ApprovedRequestComponent,
    OverallReportComponent,
    RequestRejectedComponent,
    StatisticsComponent,
    SidebarComponent,
    LoaderComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [provideAnimations()],
})
export class DashboardComponent implements OnInit {
  totalRequest: number = 0;
  approved: number = 0;
  rejected: number = 0;
  pending: number = 0;
  loading:boolean=true;

  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router
  ) {}

  handleNotification($event: any) {
    throw new Error('Method not implemented.');
  }

  triggerSignout() {
    console.log('hello');
    this.authService
      .signout()
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  }

  async ngOnInit(): Promise<void> {
    setTimeout(()=>{
      this.loading=false;
     },500);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let totalRequest = 0;
    let approvedCount = 0;
    let pendingCount = 0;
    let rejectedCount = 0;

    const patientSnapshot = await getDocs(
      collection(this.firestore, 'requirement')
    );
    const patientDocs = patientSnapshot.docs;

    for (const patient of patientDocs) {
      const patientData = patient.data();
      // const timestamp = patientData['timestamp'];
      // if (timestamp) {
      // const dateAt = new Date(timestamp.seconds * 1000); // Convert Firestore timestamp to JS Date
      // dateAt.setHours(0, 0, 0, 0); // Set to the start of the day for comparison

      // if (dateAt.getTime() === today.getTime()) {
      if (patientData['status'] === 'approved') {
        approvedCount++;
      } else if (patientData['status'] === 'pending') {
        pendingCount++;
      } else if (patientData['status'] === 'rejected') {
        rejectedCount++;
      }
      totalRequest++;
    }
    // }
    // }

    this.totalRequest = totalRequest;
    this.approved = approvedCount;
    this.rejected = rejectedCount;
    this.pending = pendingCount;

    console.log('Total Requests:', this.totalRequest);
    console.log('Approved:', this.approved);
    console.log('Rejected:', this.rejected);
    console.log('Pending:', this.pending);
  }

  //Routing
  userpermission() {
    this.router.navigate(['userpermission']);
  }
  dashboard() {
    this.router.navigate(['dashboard']);
  }
  pendingpage() {
    this.router.navigate(['pending']);
  }
  approvepage() {
    this.router.navigate(['approve']);
  }
  cancelpage() {
    this.router.navigate(['cancel']);
  }
  readydonor() {
    this.router.navigate(['readydonor']);
  }
}
