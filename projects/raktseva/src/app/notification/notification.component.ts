// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';

// import {
//   Firestore,
//   collectionData,
//   doc,
//   updateDoc,
// } from '@angular/fire/firestore';
// import { collection, query, where } from 'firebase/firestore';
// import { Subscription } from 'rxjs';
// import { CommonModule } from '@angular/common';
// import { BottomNavbarComponent } from '../shared/bottom-navbar/bottom-navbar.component';
// import { HeaderWithBackComponent } from '../shared/header-with-back/header-with-back/header-with-back.component';

// interface Notification {
//   id: string;
//   status: string;
//   patientname: string;
// }

// @Component({
//   selector: 'app-notification',
//   standalone: true,
//   imports: [HeaderWithBackComponent, BottomNavbarComponent, CommonModule],
//   templateUrl: './notification.component.html',
//   styleUrls: ['./notification.component.scss']
// })
// export class NotificationComponent implements OnInit, OnDestroy {
//   userData: Notification[] = [];
//   private userDataSubscription: Subscription | null = null;
//   number: string = '';
//   private touchStartX: number = 0;
//   private touchEndX: number = 0;
//   private swipeThreshold: number = 50; // Minimum swipe distance in pixels

//   constructor(private router: Router, private firestore: Firestore) {}

//   ngOnInit(): void {
//     const storedUserData = localStorage.getItem('loginFormData');
//     if (storedUserData) {
//       const storedData = JSON.parse(storedUserData);
//       this.number = storedData.mobileNumber;
//     }
//     console.log('Phone Number:', this.number);
//     this.userdata();
//   }

//   ngOnDestroy(): void {
//     if (this.userDataSubscription) {
//       this.userDataSubscription.unsubscribe();
//     }
//   }

//   userdata() {
//     if (this.number) {
//       const q = query(
//         collection(this.firestore, 'requirement'),
//         where('phone', '==', this.number)
//       );

//       this.userDataSubscription = collectionData(q, { idField: 'id' }).subscribe(
//         (usersList: Notification[]) => {
//           // Fetch current status from Firestore
//           this.userData = usersList
//             .map(user => ({
//               id: user.id,
//               status: user.status,
//               patientname: user.patientname
//             }))
//             .filter(user => !this.isRemoved(user.id) || this.isStatusUpdated(user)); // Check for updated status

//           if (this.userData.length > 0) {
//             console.log('Fetched User Data:', this.userData);
//           } else {
//             console.log('No users found for the provided phone number.');
//           }
//         },
//         (error: any) => {
//           console.error('Error fetching user data:', error);
//         }
//       );
//     } else {
//       console.error('Phone number is not set.');
//     }
//   }

//   onTouchStart(event: TouchEvent, index: number) {
//     this.touchStartX = event.touches[0].clientX;
//   }

//   onTouchEnd(event: TouchEvent, index: number) {
//     this.touchEndX = event.changedTouches[0].clientX;
//     const distance = this.touchStartX - this.touchEndX;

//     if (Math.abs(distance) > this.swipeThreshold) {
//       if (distance > 0) {
//         this.removeItem(index);
//       }
//     }
//   }

//   removeItem(index: number) {
//     const itemToRemove = this.userData[index];
//     this.userData.splice(index, 1);
//     this.saveRemovedNotification(itemToRemove);
//   }

//   private saveRemovedNotification(item: Notification) {
//     let removedNotifications: Notification[] = JSON.parse(localStorage.getItem('removedNotifications') || '[]');
//     const existingIndex = removedNotifications.findIndex(removed => removed.id === item.id);
//     if (existingIndex === -1) {
//       removedNotifications.push(item);
//       localStorage.setItem('removedNotifications', JSON.stringify(removedNotifications));
//     }
//   }

//   private isRemoved(id: string): boolean {
//     const removedNotifications: Notification[] = JSON.parse(localStorage.getItem('removedNotifications') || '[]');
//     return removedNotifications.some(removed => removed.id === id);
//   }

//   private isStatusUpdated(updatedNotification: Notification): boolean {
//     const removedNotifications: Notification[] = JSON.parse(localStorage.getItem('removedNotifications') || '[]');
//     const removedNotification = removedNotifications.find(removed => removed.id === updatedNotification.id);
//     return removedNotification ? removedNotification.status !== updatedNotification.status : false;
//   }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import {
  Firestore,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection, query, where } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BottomNavbarComponent } from '../shared/bottom-navbar/bottom-navbar.component';
import { HeaderWithBackComponent } from '../shared/header-with-back/header-with-back/header-with-back.component';

interface Notification {
  id: string;
  status: string;
  patientname: string;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [HeaderWithBackComponent, BottomNavbarComponent, CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  userData: Notification[] = [];
  private userDataSubscription: Subscription | null = null;
  number: string = '';
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private swipeThreshold: number = 50; // Minimum swipe distance in pixels

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

      this.userDataSubscription = collectionData(q, { idField: 'id' }).subscribe(
        (usersList: Notification[]) => {
          this.userData = usersList.filter(user => this.isStatusUpdated(user));
          console.log('Fetched User Data:', this.userData);
        },
        (error: any) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('Phone number is not set.');
    }
  }

  onTouchStart(event: TouchEvent, index: number) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent, index: number) {
    this.touchEndX = event.changedTouches[0].clientX;
    const distance = this.touchStartX - this.touchEndX;

    if (Math.abs(distance) > this.swipeThreshold) {
      if (distance > 0) {
        this.removeItem(index);
      }
    }
  }

  removeItem(index: number) {
    const itemToRemove = this.userData[index];
    this.userData.splice(index, 1);
    this.saveRemovedNotification(itemToRemove);
  }

  private saveRemovedNotification(item: Notification) {
    let removedNotifications: Notification[] = JSON.parse(localStorage.getItem('removedNotifications') || '[]');
    const existingIndex = removedNotifications.findIndex(removed => removed.id === item.id);
    if (existingIndex === -1) {
      removedNotifications.push(item);
    } else {
      removedNotifications[existingIndex].status = item.status;
    }
    localStorage.setItem('removedNotifications', JSON.stringify(removedNotifications));
  }

  private isRemoved(id: string): boolean {
    const removedNotifications: Notification[] = JSON.parse(localStorage.getItem('removedNotifications') || '[]');
    return removedNotifications.some(removed => removed.id === id);
  }

  private isStatusUpdated(notification: Notification): boolean {
    const removedNotifications: Notification[] = JSON.parse(localStorage.getItem('removedNotifications') || '[]');
    const removedNotification = removedNotifications.find(removed => removed.id === notification.id);

    if (removedNotification) {
      if (removedNotification.status !== notification.status) {
        // Status has changed, remove from localStorage
        this.removeNotificationFromStorage(notification.id);
        return true;
      }
      return false; // Status has not changed, keep hidden
    }
    return true; // Notification was not removed, show it
  }

  private removeNotificationFromStorage(id: string) {
    let removedNotifications: Notification[] = JSON.parse(localStorage.getItem('removedNotifications') || '[]');
    removedNotifications = removedNotifications.filter(removed => removed.id !== id);
    localStorage.setItem('removedNotifications', JSON.stringify(removedNotifications));
  }
}
