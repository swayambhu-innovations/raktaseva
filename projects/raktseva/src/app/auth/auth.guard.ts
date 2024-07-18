// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };


// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   Router,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { DataProviderService } from '../core/data-provider.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class authGuard implements CanActivate{
//   constructor(
//     private router: Router,
//     private dataProvider: DataProviderService
//   ) {}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//       console.log(this.dataProvider.loggedIn ,
//         this.dataProvider?.currentUser?.user.uid,this.dataProvider)

//     if (
//       this.dataProvider.loggedIn &&
//       this.dataProvider?.currentUser?.user.uid !== undefined
//     ) {
//       console.log(this.dataProvider)
//       return true;
//     } else {
//       this.router.navigate(['unauthorized/login']);
//       return false;
//     }
//   }
// }



import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: Auth
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return authState(this.auth).pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      })
    );
  }
}
