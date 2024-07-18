// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class DataProviderService {

//   constructor() { }
// }



import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ConfirmationResult, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {
  isFirstTime: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loggedIn: boolean = false;
  userMobile: string = '';
  
  checkingAuth: boolean = true;
  loginConfirmationResult: ConfirmationResult | undefined;
  currentUser:
    | {
        user: User;
        userData: any;
      }
    | undefined;
  currentUser$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  isPageLoaded$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() {}
}
