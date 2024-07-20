import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; 
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { InviteFriendModalComponent } from '../invite-friend-modal/invite-friend-modal.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthPermissionService } from '../auth/auth-permission.service';




@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ MatCardModule,
    MatIconModule,
    MatListModule,],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private route:Router ,private location: Location,private dialog: MatDialog,private authService: AuthPermissionService){}

  openInviteFriendModal() {
    this.dialog.open(InviteFriendModalComponent, {
      width: '100%', 
      height:' 100vh',
      panelClass: 'custom-dialog-container',
      disableClose: true
    });
  }
  routing(){
    this.route.navigate(['editprofile'])
  }

  logout(): void {
    this.authService.logout();
  }







  // editProfile() {
  //   this.router.navigate(['/edit-profile']);
  // }


}



