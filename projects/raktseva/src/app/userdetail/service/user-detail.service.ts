import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor(private firestore: Firestore) { }

   //Function for sending data to firebase 
   async saveFormData(formData: any): Promise<void> {
    try {
      const formCollection = collection(this.firestore, 'users');
      const docRef = doc(formCollection);
      const formDataWithId = {
        ...formData,
        id: docRef.id,
      };

      await setDoc(docRef, formDataWithId);
      console.log(formDataWithId);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data: ', error);
      throw error;
    }
  }
}

// import { Injectable } from '@angular/core';
// import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { from, Observable } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserDetailService {

//   constructor(private firestore: Firestore, private afAuth: AngularFireAuth) {}

//   getUserProfile(): Observable<any> {
//     return this.afAuth.user.pipe(
//       switchMap(user => {
//         if (user) {
//           const userDocRef = doc(this.firestore, `users/${user.uid}`);
//           return from(getDoc(userDocRef)).pipe(
//             switchMap(docSnap => {
//               if (docSnap.exists()) {
//                 return [docSnap.data()];
//               } else {
//                 return [{}];
//               }
//             })
//           );
//         } else {
//           return [{}];
//         }
//       })
//     );
//   }

//   async updateUserProfile(profileData: any): Promise<void> {
//     const user = await this.afAuth.currentUser;
//     if (user) {
//       const userDocRef = doc(this.firestore, `users/${user.uid}`);
//       await setDoc(userDocRef, profileData, { merge: true });
//     }
//   }
// }
