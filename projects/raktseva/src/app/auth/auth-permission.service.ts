// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthPermissionService {

//   constructor() { }
// }



// import { Injectable } from '@angular/core';
// import {
//   ApplicationVerifier,
//   Auth,
//   User,
//   UserCredential,
//   signInWithPhoneNumber,
// } from '@angular/fire/auth';
// import { Firestore, docData } from '@angular/fire/firestore';
// import {
//   addDoc,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   limit,
//   orderBy,
//   query,
//   setDoc,
//   where,
// } from 'firebase/firestore';
// import { Router } from '@angular/router';
// import { from, map } from 'rxjs';
// import { DataProviderService } from '../core/data-provider.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthPermissionService {
//   initializeRecaptcha(arg0: string) {
//     throw new Error('Method not implemented.');
//   }
//   isProfileUpdated: boolean = false;
//   constructor(
//     private router: Router,
//     public auth: Auth,
//     private firestore: Firestore,
//     private dataProvider: DataProviderService
//   ) {
//     // this.onAuth()
//   }
  // onAuth(){
  //   this.dataProvider.checkingAuth = true;
  //   this.auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       this.getUserData(user.uid).subscribe(async (userData) => {
  //         let currUser={...user,'uid':userData?.['uid']}
  //         this.dataProvider.currentUser = {
  //           user: currUser,
  //           userData: userData,
  //         };
  //         this.dataProvider.currentUser$.next({
  //           user: currUser,
  //           userData: userData,
  //         });
  //         this.dataProvider.loggedIn = true;
  //         const status = await Network.getStatus();
  //         if (!status.connected) {
  //           this.router.navigate(['/no-internet']);
  //         } else if (!userData || !userData.name) {
  //           this.router.navigate(['/authorized/profile/profile-info']);
  //         } else {
  //           if (!this.isProfileUpdated) {
  //             this.router.navigate(['../../authorized/home']);
  //           }
  //         }
  //         this.dataProvider.checkingAuth = false;
  //       });
  //     } else {
  //       this.dataProvider.loggedIn = false;
  //       this.dataProvider.checkingAuth = false;
  //     }
  //   });
  // }

  // async loginWithPhoneNumber(phone:string,appVerifier:ApplicationVerifier){
  //   if(phone.length != 10){
  //     return Promise.reject(new Error("Invalid Phone Number"));
  //   }
  //   return signInWithPhoneNumber(this.auth,'+91'+phone,appVerifier);
  // }

  // getUserData(uid: string) {
  //   const userQuery = query(collection(this.firestore, 'users'), where('authId', '==', uid));
  //   const userDocsPromise = getDocs(userQuery);
  
  //   return from(userDocsPromise).pipe(
  //     map((userDocs) => {
  //       if (userDocs.docs.length > 0) {
  //         const firstUserDoc = userDocs.docs[0];
  //         return firstUserDoc.data();
  //       } else {
  //         return null; 
  //       }
  //     })
  //   );
  // }
// }


// import { Injectable } from '@angular/core';
// import { Auth, signInWithPhoneNumber, ConfirmationResult, getAuth, RecaptchaVerifier } from '@angular/fire/auth';
// import { FirebaseApp } from '@angular/fire/app';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthPermissionService {
//   private auth: Auth;
//   private recaptchaVerifier: RecaptchaVerifier | undefined;
//   // private router: Router;
//   private confirmationResult: ConfirmationResult | undefined;
//   private currentPhoneNumber: string | null = null; // Store the phone number

//   constructor(private router: Router) {
//     const app = inject(FirebaseApp);
//     this.auth = getAuth(app);
//   }

//   initializeRecaptcha(containerId: any): void {
//     this.recaptchaVerifier = new RecaptchaVerifier(this.auth, containerId, {
//       'size': 'invisible',
//       'callback': (response:any) => {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         // onSignInSubmit();
//       }
//     });

//     this.recaptchaVerifier.render().then((widgetId: any) => {
//       console.log('reCAPTCHA rendered with widget ID:', widgetId);
//     });
//   }

//   login(phoneNumber: string): void {
//     if (!this.recaptchaVerifier) {
//       console.error('RecaptchaVerifier not initialized.');
//       return;
//     }

//     this.currentPhoneNumber = phoneNumber; // Store the phone number
//     signInWithPhoneNumber(this.auth, phoneNumber, this.recaptchaVerifier)
//       .then((confirmationResult) => {
//         this.confirmationResult = confirmationResult;
//         console.log('SMS sent');
//         this.router.navigate(['/','otp']);
//       }).catch((error) => {
//         console.error('Error during signInWithPhoneNumber:', error);
//       });
//   }

//   resendOTP(): void {
//     if (this.currentPhoneNumber) {
//       this.login(this.currentPhoneNumber);
//     } else {
//       console.error('No phone number available for resending OTP.');
//     }
//   }
//   verifyCode(code: string): void {
//     if (this.confirmationResult) {
//       this.confirmationResult.confirm(code).then((result) => {
//         this.router.navigate(['/','userdetail']);
//         console.log('User signed in:', result.user);
//       }).catch((error) => {
//         console.error('Error during code verification:', error);
//       });
//     } else {
//       console.error('No confirmation result available for verification.');
//     }
//   }
//   get phoneNumber(): string | null {
//     return this.currentPhoneNumber;
//   }
// }


import { Injectable } from '@angular/core';
import { Auth, signInWithPhoneNumber, ConfirmationResult, getAuth, RecaptchaVerifier } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthPermissionService {
  private auth: Auth;
  private recaptchaVerifier: RecaptchaVerifier | undefined;
  private confirmationResult: ConfirmationResult | undefined;
  private currentPhoneNumber: string | null = null;

  constructor(private router: Router) {
    const app = inject(FirebaseApp);
    this.auth = getAuth(app);
  }

  initializeRecaptcha(containerId: any): void {
    try {
      this.recaptchaVerifier = new RecaptchaVerifier(this.auth, containerId, {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        }
      });

      this.recaptchaVerifier.render().then((widgetId: any) => {
        console.log('reCAPTCHA rendered with widget ID:', widgetId);
      }).catch((error) => {
        console.error('Error rendering reCAPTCHA:', error);
        // Potentially re-render or handle error as needed
      });
    } catch (error) {
      console.error('Error initializing reCAPTCHA:', error);
      // Handle initialization error
    }
  }

  login(phoneNumber: string): void {
    if (!this.recaptchaVerifier) {
      console.error('RecaptchaVerifier not initialized.');
      return;
    }

    this.currentPhoneNumber = phoneNumber;
    signInWithPhoneNumber(this.auth, phoneNumber, this.recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        console.log('SMS sent');
        this.router.navigate(['/','otp']);
      }).catch((error) => {
        console.error('Error during signInWithPhoneNumber:', error);
      });
  }

  resendOTP(): void {
    if (this.currentPhoneNumber) {
      this.login(this.currentPhoneNumber);
    } else {
      console.error('No phone number available for resending OTP.');
    }
  }

  verifyCode(code: string): void {
    if (this.confirmationResult) {
      this.confirmationResult.confirm(code).then((result) => {
        this.router.navigate(['/','userdetail']);
        console.log('User signed in:', result.user);
      }).catch((error) => {
        console.error('Error during code verification:', error);
      });
    } else {
      console.error('No confirmation result available for verification.');
    }
  }

  get phoneNumber(): string | null {
    return this.currentPhoneNumber;
  }
}
