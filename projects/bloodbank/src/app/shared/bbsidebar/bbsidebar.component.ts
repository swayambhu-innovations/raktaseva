import { Component } from '@angular/core';

@Component({
  selector: 'app-bbsidebar',
  standalone: true,
  imports: [],
  templateUrl: './bbsidebar.component.html',
  styleUrl: './bbsidebar.component.scss'
})
export class BbsidebarComponent {
  dashboard(){}
  pendingpage(){}
  approvepage(){}
  cancelpage(){}
  readydonor(){}
  userpermission(){}
  triggerSignout(){}

}
