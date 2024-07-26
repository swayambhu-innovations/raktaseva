import { Injectable } from '@angular/core';
import {
    Router,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
    UrlTree
} from '@angular/router';
import { Observable, take } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { AuthService } from './auth.service';

@Injectable({
    providedIn:'root'
})

export class AuthGuard {
    constructor(private auth:AuthService, private router:Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let token = localStorage.getItem('token');
        if(token) {
            return true;
        }
        this.router.navigate(['home']);
        return false
    }
}