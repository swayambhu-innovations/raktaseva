import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-navbar',
  standalone: true,
  imports: [],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.scss'
})
export class BottomNavbarComponent {
constructor(private router: Router){}
home(){
  this.router.navigate(['home']);
}

history(){
  this.router.navigate(['history']);
}

profile(){
  this.router.navigate(['profile']);
}
}
