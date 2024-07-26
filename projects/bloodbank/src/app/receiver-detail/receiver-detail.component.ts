import { Component, OnDestroy } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, query, where } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { BbsidebarComponent } from '../shared/bbsidebar/bbsidebar.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AssignDonorDialogComponent } from './assign-donor-dialog/assign-donor-dialog.component';

@Component({
  selector: 'app-receiver-detail',
  standalone: true,
  imports: [BbsidebarComponent,CommonModule],
  templateUrl: './receiver-detail.component.html',
  styleUrl: './receiver-detail.component.scss'
})
export class ReceiverDetailComponent implements OnDestroy {
  patient: any[] = [];
  private patientSubscription: Subscription | null = null;

  constructor(private firestore: Firestore,public dialog: MatDialog) {
    this.listenToPatientChanges();
  }

  listenToPatientChanges() {
    const q = query(collection(this.firestore, 'requirement'));

    this.patientSubscription = collectionData(q, { idField: 'id' }).subscribe(
      (patientList: any) => {
        this.patient = patientList.map((data: any) => ({
          patientname: data.patientname,
          aadharnumber: data.aadharnumber,
          bloodcount: data.bloodcount,
          assigneddonor: data.assigneddonor,
          fulfilled:data.fulfilled
        }));
        console.log(this.patient);
      }
    );
  }

  ngOnDestroy() {
    if (this.patientSubscription) {
      this.patientSubscription.unsubscribe();
    }
  }

  openAssignDonorDialog(): void {
    const dialogRef = this.dialog.open(AssignDonorDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Assigned Donor:', result);
      // Handle the result here
    });
  }
}
