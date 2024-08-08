import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  Firestore,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection, query, where } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { InviteFriendModalComponent } from '../invite-friend-modal/invite-friend-modal.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthPermissionService } from '../auth/auth-permission.service';
import { HeaderWithBackComponent } from '../shared/header-with-back/header-with-back/header-with-back.component';
import { BottomNavbarComponent } from '../shared/bottom-navbar/bottom-navbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    HeaderWithBackComponent,
    BottomNavbarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private authService: AuthPermissionService,
    private firestore: Firestore,
    private fb: FormBuilder
  ) {}

  userData: any = {};
  private userDataSubscription: Subscription | null = null;
  number: string = '';

  openInviteFriendModal() {
    this.dialog.open(InviteFriendModalComponent, {
      width: '100%',
      height: ' 100vh',
      panelClass: 'custom-dialog-container',
      disableClose: true,
    });
  }
  routing() {
    this.router.navigate(['editprofile']);
  }

  logout(): void {
    this.authService.logout();
  }

  testimonial() {
    this.router.navigate(['testimonial']);
  }

  contact() {
    this.router.navigate(['contact']);
  }
  help() {
    this.router.navigate(['help']);
  }

  editprofile() {
    this.router.navigate(['edit-profile']);
  }

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('loginFormData');
    if (storedUserData) {
      const storedData = JSON.parse(storedUserData);
      this.number = storedData.mobileNumber;

      this.userData = storedData;
    }
    console.log('Phone Number', this.number);
    this.userdata();
  }
  userdata() {
    if (this.number) {
      const q = query(
        collection(this.firestore, 'users'),
        where('phone', '==', this.number)
      );
      this.userDataSubscription = collectionData(q, {
        idField: 'id',
      }).subscribe(
        (usersList: any[]) => {
          if (usersList.length > 0) {
            const user = usersList[0];
            this.userData = {
              name: user.username,
              img:user.img
            };
            
     
            console.log('Fetched User Data:', this.userData);
          } else {
            console.log('No users found for the provided phone number.');
          }
        },
        (error: any) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      console.error('Phone number is not set.');
    }
  }
  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'home/profile.png'; // Path to your default image
  }
}
