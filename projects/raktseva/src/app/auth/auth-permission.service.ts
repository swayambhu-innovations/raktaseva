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
// import { Auth, signInWithPhoneNumber, ConfirmationResult, getAuth, RecaptchaVerifier, signOut } from '@angular/fire/auth';
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
// logout(): void {
//   signOut(this.auth).then(() => {
//     console.log('User signed out');
//     this.router.navigate(['/']); 
//   }).catch((error) => {
//     console.error('Error during sign out:', error);
//   });
// }
// }


import { Injectable } from '@angular/core';
import { Auth, signInWithPhoneNumber, ConfirmationResult, getAuth, RecaptchaVerifier } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { confirmSignIn, confirmSignUp, signOut } from 'aws-amplify/auth';


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
    
      this.recaptchaVerifier = new RecaptchaVerifier(this.auth, containerId, {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        }
      });

      this.recaptchaVerifier.render().then((widgetId: any) => {
        console.log('reCAPTCHA rendered with widget ID:', widgetId);
      })
  }

  login(phoneNumber: string): void {
    if (!this.recaptchaVerifier) {
      console.error('RecaptchaVerifier not initialized.');
      return;
    }

    // this.currentPhoneNumber = phoneNumber;
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

  // get phoneNumber(): string | null {
  //   return this.currentPhoneNumber;
  // }
 async logout() {

    try {
      await signOut();
      localStorage.clear();
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);

    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  isUserExist:any=false;
  phone:any;
  uid:any=''
  async verifyOTP(otp: string) {
    if (this.isUserExist) {
      console.log('handleSignInConfirmation')
      return await this.handleSignInConfirmation(otp);
    }
    else{
    console.log('confirmSignUp')
      return await this.confirmSignUp(otp);
    }
  }
  // async confirmSignUp(otp:any) {
  //   try {
  //     const { isSignUpComplete, nextStep } = await confirmSignUp({
  //       username: `+91${this.phone}`,
  //       confirmationCode: otp,
  //     });
  //     console.log(isSignUpComplete, nextStep);
  //     console.log('Sign up confirmed');
  //     console.log(this.uid)
  //     // await this.setUserData(this.uid,this.phone);
  //     this.router.navigate(['/','userdetail']);

  //   } catch (error) {
  //     console.error('Error confirming sign up:', error);
  //   }
  // }

  async confirmSignUp(otp: any) {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: `+91${this.phone}`,
        confirmationCode: otp,
      });
      console.log(isSignUpComplete, nextStep);
      console.log('Sign up confirmed');
      console.log(this.uid);
  
      // Check if detailFormData exists in local storage
      const detailFormData = localStorage.getItem('detailFormData');
      
      if (detailFormData) {
        // Navigate to 'home' if detailFormData exists
        this.router.navigate(['home']);
      } else {
        // Navigate to 'userdetail' if detailFormData does not exist
        this.router.navigate(['userdetail']);
      }
  
    } catch (error) {
      console.error('Error confirming sign up:', error);
    }
  }


  async handleSignInConfirmation(otp:any) {
    try {
      await confirmSignIn({ challengeResponse: otp }).then((res) => {
        console.log(res);
        this.router.navigate(['/','userdetail']);
      
      });
    } catch (error) {
      console.log(error);
    }
  }
}
