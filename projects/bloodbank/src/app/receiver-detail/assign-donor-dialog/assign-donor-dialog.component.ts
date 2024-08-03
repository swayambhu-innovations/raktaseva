// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';
// import { Firestore, collectionData } from '@angular/fire/firestore';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { Subscription, from, combineLatest } from 'rxjs';
// import { map, switchMap, catchError } from 'rxjs/operators';
// import { CommonModule } from '@angular/common';
// import { MatInputModule } from '@angular/material/input';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-assign-donor-dialog',
//   standalone: true,
//   imports: [CommonModule, MatInputModule, MatDialogModule, MatFormFieldModule, FormsModule],
//   templateUrl: './assign-donor-dialog.component.html',
//   styleUrls: ['./assign-donor-dialog.component.scss'],
// })
// export class AssignDonorDialogComponent implements OnInit, OnDestroy {
//   constructor(private router: Router, private firestore: Firestore) {}

//   userData: any[] = [];
//   private userDataSubscription: Subscription | null = null;
//   number: string = '';

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

//       const requirement$ = from(getDocs(q)).pipe(
//         map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
//       );

//       this.userDataSubscription = requirement$
//         .pipe(
//           switchMap(usersList => {
//             if (usersList.length > 0) {
//               return combineLatest(
//                 usersList.map(user => {
//                   const donorAcknowledgeCollection = collection(
//                     this.firestore,
//                     `requirement/${user.id}/donor-acknowledge`
//                   );
//                   const donorAcknowledgeQuery = query(donorAcknowledgeCollection, where('active', '==', true));
//                   return from(getDocs(donorAcknowledgeQuery)).pipe(
//                     map(donorSnapshot => donorSnapshot.docs.map(doc => doc.id)),
//                     switchMap(donorIDs => {
//                       const surveyCollection = collection(this.firestore, 'survey');
//                       return from(getDocs(surveyCollection)).pipe(
//                         map(surveySnapshot => {
//                           const matchedSurveyDocs = surveySnapshot.docs
//                             .filter(surveyDoc => donorIDs.includes(surveyDoc.id))
//                             .map(surveyDoc => surveyDoc.data());
//                           return {
//                             ...user,
//                             donorIDs,
//                             donorIDSum: donorIDs.length,
//                             matchedSurveyDocs,
//                           };
//                         })
//                       );
//                     })
//                   );
//                 })
//               );
//             } else {
//               console.log('No users found for the provided phone number.');
//               return [];
//             }
//           }),
//           catchError(error => {
//             console.error('Error fetching user data:', error);
//             return [];
//           })
//         )
//         .subscribe(userDataWithDonorInfo => {
//           this.userData = userDataWithDonorInfo;
//           console.log('Fetched User Data with Donor Info:', this.userData);
//         });
//     } else {
//       console.error('Phone number is not set.');
//     }
//   }
// }


import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, query, where, onSnapshot, CollectionReference } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { combineLatest, of } from 'rxjs';

interface Requirement {
  id: string;
  [key: string]: any;
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

  userdata() {
    if (this.number) {
      const requirementRef: CollectionReference = collection(this.firestore, 'requirement');
      const requirementQuery = query(requirementRef, where('phone', '==', this.number));

      // Real-time listener for requirements
      const requirement$ = new Observable<Requirement[]>(subscriber => {
        const unsubscribe = onSnapshot(requirementQuery, snapshot => {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Requirement));
          subscriber.next(data);
        }, error => {
          console.error('Error fetching requirements:', error);
          subscriber.error(error);
        });

        return () => unsubscribe();
      });

      const getActiveDonorIDs$ = (userId: string) => {
        const donorAcknowledgeRef = collection(this.firestore, `requirement/${userId}/donor-acknowledge`);
        const donorAcknowledgeQuery = query(donorAcknowledgeRef, where('active', '==', true));

        return new Observable<string[]>(subscriber => {
          const unsubscribe = onSnapshot(donorAcknowledgeQuery, snapshot => {
            const donorIDs = snapshot.docs.map(doc => doc.id);
            subscriber.next(donorIDs);
          }, error => {
            console.error(`Error fetching active donor IDs for user ${userId}:`, error);
            subscriber.error(error);
          });

          return () => unsubscribe();
        });
      };

      const getMatchedSurveys$ = (donorIDs: string[]) => {
        const surveyRef = collection(this.firestore, 'survey');
        const surveyQuery = query(surveyRef, where('id', 'in', donorIDs)); // Adjust this query if necessary

        return new Observable<any[]>(subscriber => {
          const unsubscribe = onSnapshot(surveyQuery, snapshot => {
            const matchedSurveyDocs = snapshot.docs.map(doc => doc.data());
            subscriber.next(matchedSurveyDocs);
          }, error => {
            console.error('Error fetching matched surveys:', error);
            subscriber.error(error);
          });

          return () => unsubscribe();
        });
      };

      // Combine all observables to fetch user data with donor info
      this.userDataSubscription = requirement$
        .pipe(
          switchMap(usersList => {
            if (usersList.length > 0) {
              const userObservables = usersList.map(user => {
                return getActiveDonorIDs$(user.id).pipe(
                  switchMap(donorIDs => {
                    return getMatchedSurveys$(donorIDs).pipe(
                      map(matchedSurveyDocs => ({
                        ...user,
                        donorIDs,
                        donorIDSum: donorIDs.length,
                        matchedSurveyDocs
                      }))
                    );
                  })
                );
              });

              return combineLatest(userObservables);
            } else {
              console.log('No users found for the provided phone number.');
              return of([]);
            }
          }),
          catchError(error => {
            console.error('Error processing user data:', error);
            return of([]);
          })
        )
        .subscribe(userDataWithDonorInfo => {
          this.userData = userDataWithDonorInfo;
          console.log('Fetched User Data with Donor Info:', this.userData);
          this.cdr.detectChanges(); // Manually trigger change detection
        });
    } else {
      console.error('Phone number is not set.');
    }
  }
}

