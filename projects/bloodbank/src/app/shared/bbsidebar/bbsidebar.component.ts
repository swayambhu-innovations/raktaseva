import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bbsidebar',
  standalone: true,
  imports: [],
  templateUrl: './bbsidebar.component.html',
  styleUrl: './bbsidebar.component.scss'
})
export class BbsidebarComponent {
  constructor(
    // private firestore: Firestore,
    private router: Router
  ) {}
  dashboard(){}
  pendingpage(){}
  approvepage(){}
  cancelpage(){}
  readydonor(){}
  userpermission(){}
  triggerSignout(){}


  receiverDetail(){
    this.router.navigate(['receiverDetail']);
  }

}
