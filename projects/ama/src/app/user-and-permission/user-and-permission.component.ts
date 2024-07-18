// import { Component, Injectable } from '@angular/core';
// import { Firestore } from '@angular/fire/firestore';
// import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

// @Component({
//   selector: 'app-user-and-permission',
//   standalone: true,
//   imports: [],
//   templateUrl: './user-and-permission.component.html',
//   styleUrl: './user-and-permission.component.scss',
// })
// export class UserAndPermissionComponent {
//   constructor(private firestore: Firestore) {}

//   async click() {
//     let donor: any[] = [];
//     const donorList = await getDocs(collection(this.firestore, 'survey'));
//     donorList.docs.forEach((state: any) => {
//       let data = state.data();
//       if (data.city == 'Allahabad' && data.bloodgroup == 'A+') {
//         donor.push({
//           city: data.city,
//           bloodgroup: data.bloodgroup,
//           email: data.email,
//         });
//       }
//     });
//     console.log(donor);
//     return donor;
//   }
// }

import { Component, OnDestroy } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection, query, where } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { EmailService } from './email.service';


@Component({
  selector: 'app-user-and-permission',
  standalone: true,
  imports: [],
  templateUrl: './user-and-permission.component.html',
  styleUrls: ['./user-and-permission.component.scss'],
})
export class UserAndPermissionComponent implements OnDestroy {
  private donor: any[] = [];
  private donorSubscription: Subscription | null = null;


  constructor(private firestore: Firestore, private emailService: EmailService) {
    // this.listenToDonorChanges();
  }

  listenToDonorChanges() {
    const q = query(
      collection(this.firestore, 'survey'),
      where('city', '==', 'Allahabad'),
      where('bloodgroup', '==', 'A+')
    );

    this.donorSubscription = collectionData(q, { idField: 'id' }).subscribe(
      (donorList: any) => {
        this.donor = donorList.map((data: any) => ({
          city: data.city,
          bloodgroup: data.bloodgroup,
          email: data.email,
        }));
        console.log(this.donor);
      }
    );
  }

  ngOnDestroy() {
    if (this.donorSubscription) {
      this.donorSubscription.unsubscribe();
    }
  }

  sendEmail() {
    this.emailService.sendEmail('ambarmishra740@gmail.com', 'Test Subject', 'Test Message')
      // .subscribe(response => {
      //   console.log('Email sent successfully', response);
      // }, error => {
      //   console.error('Error sending email', error);
      // });
  }
}

