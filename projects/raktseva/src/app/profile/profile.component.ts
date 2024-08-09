import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; 
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
// import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthPermissionService } from '../auth/auth-permission.service';
import { HeaderWithBackComponent } from '../shared/header-with-back/header-with-back/header-with-back.component';
import { BottomNavbarComponent } from "../shared/bottom-navbar/bottom-navbar.component";
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BrowserModule } from '@angular/platform-browser';
import { InviteFriendModalComponent } from '../invite-friend-modal/invite-friend-modal.component';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule,
    MatIconModule,
    MatListModule, HeaderWithBackComponent, BottomNavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private router: Router,private dialog: MatDialog , private location: Location,private authService: AuthPermissionService){}
 
  // openInviteFriendBottomSheet() {
  //   this.bottomSheet.open(InviteFriendModalComponent);
  // }
  openInviteFriendModal() {
      const dialogRef = this.dialog.open(InviteFriendModalComponent, {
    
        width: '85vw',  
        maxWidth: '100vw',  
        height: 'auto',  
        maxHeight: '100vh',  
        position: { top: '-50vh',left: '30px' }, 
        panelClass: 'full-screen-dialog' 
      });
  }
  routing(){
    this.router.navigate(['editprofile'])
  }

  logout(): void {
    this.authService.logout();
  }



  testimonial(){
    this.router.navigate(['testimonial']);
  }

  contact(){
    this.router.navigate(['contact']);
  }
  help(){
    this.router.navigate(['help']);
  }


  editprofile() {
    this.router.navigate(['edit-profile']);
  }


}



