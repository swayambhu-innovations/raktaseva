// import { Component } from '@angular/core';
// import { HeaderWithBackComponent } from "../shared/header-with-back/header-with-back/header-with-back.component";
// import { BottomNavbarComponent } from "../shared/bottom-navbar/bottom-navbar.component";

// @Component({
//   selector: 'app-history',
//   standalone: true,
//   imports: [HeaderWithBackComponent, BottomNavbarComponent],
//   templateUrl: './history.component.html',
//   styleUrl: './history.component.scss'
// })
// export class HistoryComponent {

// }



import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderWithBackComponent } from "../shared/header-with-back/header-with-back/header-with-back.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  Firestore,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection, query, where } from 'firebase/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [HeaderWithBackComponent,HeaderWithBackComponent,CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent  {

  constructor(private router: Router, private firestore: Firestore) {}

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

  userdata() {
    if (this.number) {
      const q = query(
        collection(this.firestore, 'requirement'),
        where('phone', '==', this.number)
      );
      this.userDataSubscription = collectionData(q, {
        idField: 'id',
      }).subscribe(
        (usersList: any[]) => {
          if (usersList.length > 0) {
            // Map through all matching users and capitalize their status
            this.userData = usersList.map(user => ({
              id: user.id,
              patientname: user.patientname,
              status: this.capitalizeFirstLetter(user.status),
              aadharnumber: user.aadharnumber,
            }));

            console.log('Fetched User Data:', this.userData);
          } else {
            console.log('No users found for the provided phone number.');
          }
        },
        (error: any) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('Phone number is not set.');
    }
  }

  capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  
  userData: any[] = [];
  private userDataSubscription: Subscription | null = null;
  number: string = '';
  btn1Active = true;
  btn2Active = false;

  changeColor(buttonId: string): void {
    if (buttonId === 'btn1') {
      this.btn1Active = true;
      this.btn2Active = false;
    } else if (buttonId === 'btn2') {
      this.btn1Active = false;
      this.btn2Active = true;
    }
  }

  getButtonClass(status: string): string {
    switch (status) {
      case 'Approved':
        return 'approved';
      case 'Rejected':
        return 'rejected';
      default:
        return 'pending';
    }
  }

  
}

