import { Component } from '@angular/core';
import { Router } from '@angular/router';
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



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 userData: any = {};
  private userDataSubscription: Subscription | null = null;
  number: string = '';
  constructor(private router: Router,private firestore: Firestore,){}

notification(){
  this.router.navigate(['notification']);
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
            id: user.id,
            name: user.username,

          };

    

          // this.profileForm.patchValue(this.userData);
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
}
