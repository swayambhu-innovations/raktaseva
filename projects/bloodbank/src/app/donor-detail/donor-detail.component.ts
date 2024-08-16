import { Component, OnDestroy } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, query, where } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { BbsidebarComponent } from '../shared/bbsidebar/bbsidebar.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-donor-detail',
  standalone: true,
  imports: [BbsidebarComponent, CommonModule, SidebarComponent, LoaderComponent],
  templateUrl: './donor-detail.component.html',
  styleUrl: './donor-detail.component.scss',
})
export class DonorDetailComponent implements OnDestroy {
  donor: any[] = [];
  loading: boolean = true;
  private donorSubscription: Subscription | null = null;

  constructor(private firestore: Firestore) {
    this.listenToDonorChanges();
  }
  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000); // Loading for 3 seconds
  }

  listenToDonorChanges() {
    const q = query(collection(this.firestore, 'checkup-form'));

    this.donorSubscription = collectionData(q, { idField: 'id' }).subscribe(
      (donorList: any) => {
        this.donor = donorList.map((data: any) => ({
          donorname: data.donorname,
          gender: data.gender,
          lastdonation: this.formatDate(data.lastdonation),
          medicalcondition: data.medicalcondition,
          unitdonated: data.unitdonated,
          bloodgroup: data.bloodgroup,
          age: data.age,
        }));
        console.log(this.donor);
      }
    );
  }

  formatDate(timestamp: any): string {
    if (!timestamp) {
      return 'Invalid date'; // Handle empty or null date strings
    }

    // Check if the input is a Firestore Timestamp object
    if (
      timestamp.seconds !== undefined &&
      timestamp.nanoseconds !== undefined
    ) {
      const date = new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
      );

      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      console.error('Invalid date format:', timestamp); // Log the invalid date format
      return 'Invalid date';
    }

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  ngOnDestroy() {
    if (this.donorSubscription) {
      this.donorSubscription.unsubscribe();
    }
  }
}
