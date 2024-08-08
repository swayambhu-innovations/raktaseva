import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, Location } from '@angular/common';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  Storage,
} from '@angular/fire/storage';
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
    CommonModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  isImgSizeValid: boolean = false;
  profileForm: FormGroup;
  userData: any = {};
  private userDataSubscription: Subscription | null = null;
  number: string = '';
  constructor(
    private storage: Storage,
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
      img: ['', Validators.required],
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
              img:user.img
            };
            this.profileForm.patchValue({
              fullName: this.userData.name,
              gender: this.userData.gender,
              bloodGroup: this.userData.bloodgroup,
              aadharNumber: this.userData.aadharnumber,
              city: this.userData.city,
              img:this.userData.img
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
          img: updatedData.img
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

 // Photo changing TS file
 async changePhoto(e: any) {
  const file = e.target.files[0];
  const fileSizeKB = file.size / 1024;
  const maxSizeKB = 500;

  if (fileSizeKB > maxSizeKB) {
    this.isImgSizeValid = true;
    return;
  } else {
    this.isImgSizeValid = false;
    try {
      const fileName = `${this.profileForm.value.report}.${file.name
        .split('.')
        .pop()}`;
      const filePath = `userAvatar/${fileName}`;

      // Upload file to storage
      const storageRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Get download URL and update form value
      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);

      this.profileForm.patchValue({
        img: downloadURL,
      });

      console.log('File uploaded successfully:', downloadURL);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
}

  onImageError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = 'home/profile.png';
  }
}







