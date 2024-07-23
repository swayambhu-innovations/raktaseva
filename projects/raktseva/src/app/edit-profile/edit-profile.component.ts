import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
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

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  profileForm: FormGroup;
  userData: any = {};
  private userDataSubscription: Subscription | null = null;
  number: string = '';

  constructor(
    private location: Location,
    private firestore: Firestore,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      fullName: [''],
      gender: [''],
      bloodGroup: [''],
      aadharNumber: ['', [Validators.minLength(12), Validators.maxLength(12)]],
      city: [''],
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('loginFormData');
    if (storedUserData) {
      const storedData = JSON.parse(storedUserData);
      this.number = storedData.mobileNumber;
      this.profileForm.patchValue({ fullName: this.userData.name });
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
              gender: user.gender,
              bloodgroup: user.bloodgroup,
              aadharnumber: user.aadharnumber,
              city: user.cityname,
            };

            this.profileForm.patchValue({
              fullName: this.userData.name,
              gender: this.userData.gender,
              bloodGroup: this.userData.bloodgroup,
              aadharNumber: this.userData.aadharnumber,
              city: this.userData.city,
            });

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

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;

      if (this.userData.id) {
        const userDocRef = doc(this.firestore, `users/${this.userData.id}`);

        updateDoc(userDocRef, {
          username: updatedData.fullName,
          gender: updatedData.gender,
          bloodgroup: updatedData.bloodGroup,
          aadharnumber: updatedData.aadharNumber,
          cityname: updatedData.city,
        })
          .then(() => {
            console.log('Profile updated successfully.');

            this.router.navigate(['home']);
          })
          .catch((error) => {
            console.error('Error updating profile:', error);
          });
      } else {
        console.error('Phone number is not set.');
      }
    } else {
      console.error('Form is not valid.');
    }
  }
}

