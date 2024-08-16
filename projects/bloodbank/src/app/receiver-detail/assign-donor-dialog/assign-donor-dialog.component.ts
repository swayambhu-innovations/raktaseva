import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

interface Donor {
  name: string;
  aadharnumber: string;
  gender: string;
  phone: string;
  bloodgroup: string;
}

@Component({
  selector: 'app-assign-donor-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatDialogModule, MatFormFieldModule, FormsModule],
  templateUrl: './assign-donor-dialog.component.html',
  styleUrls: ['./assign-donor-dialog.component.scss'],
})
export class AssignDonorDialogComponent implements OnInit, OnDestroy {
  userData: any[] = [];
  private userDataSubscription: Subscription | null = null;
  number: string = '';
  acceptedDonor: Donor[] = [];  // Declare the acceptedDonor array
  

  constructor(
    private router: Router,
    private firestore: Firestore,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('loginFormData');
    if (storedUserData) {
      const storedData = JSON.parse(storedUserData);
      this.number = storedData.mobileNumber;
    }
    console.log('Phone Number:', this.number);
    this.userdata();
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  async userdata() {
    // Initialize the acceptedDonor array
    this.acceptedDonor = [];

    // Step 1: Get the selectedPatientId from local storage
    const selectedPatientId = localStorage.getItem('selectedPatientId');

    if (selectedPatientId) {
      try {
        // Step 2: Query the 'requirement' collection to find the document
        const requirementRef = collection(this.firestore, 'requirement');
        const q = query(requirementRef, where('id', '==', selectedPatientId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const documentId = querySnapshot.docs[0].id;

          // Step 3: Access the 'donor-acknowledge' sub-collection within the matched document
          const donorAcknowledgementsRef = collection(this.firestore, `requirement/${documentId}/donor-acknowledge`);
          const donorAcknowledgementsSnapshot = await getDocs(donorAcknowledgementsRef);

          // Extract IDs from donor acknowledgement data
          const ids = donorAcknowledgementsSnapshot.docs.map(doc => doc.id);

          if (ids.length > 0) {
            // Step 4: Query the 'survey' collection with the IDs
            const surveyRef = collection(this.firestore, 'survey');
            const surveyQueries = ids.map(id => query(surveyRef, where('id', '==', id)));
            
            // Fetch all documents matching the IDs
            const surveySnapshots = await Promise.all(surveyQueries.map(q => getDocs(q)));

            // Step 5: Handle the data from the 'survey' collection
            surveySnapshots.forEach(snap => {
              snap.forEach(doc => {
                const surveyData = doc.data();
                // Store required fields in acceptedDonor array
                this.acceptedDonor.push({
                  name: surveyData['name'],
                  aadharnumber: surveyData['aadharnumber'],
                  gender: surveyData['gender'],
                  phone: surveyData['phone'],
                  bloodgroup: surveyData['bloodgroup']
                });
              });
            });

            console.log('Accepted Donors:', this.acceptedDonor);
          } else {
            console.log('No donor acknowledgements found.');
          }
        } else {
          console.log('No document found with the selectedPatientId.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      console.log('No Selected Patient ID found in local storage.');
    }
  }

  

  checkupform(){
    
    this.router.navigate(['/checkupform']);
  }
}
