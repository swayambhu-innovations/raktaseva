import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  showLogout = false;
  constructor(
    private authService: AuthService,
    // private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogout = this.router.url.includes('dashboard');
      }
    });
  }

  triggerSignout() {
    console.log('hello');
    this.authService
      .signout()
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  }

  home(){
    this.router.navigate(['home']);
  }
  bloodInventory(){
    this.router.navigate(['bloodInventory']);
  }
  receiverDetail(){
    this.router.navigate(['receiverDetail']);
  }
  donorDetail(){
    this.router.navigate(['donorDetail']);
  }
  userPermission(){
    this.router.navigate(['userPermission']);
  }

}
