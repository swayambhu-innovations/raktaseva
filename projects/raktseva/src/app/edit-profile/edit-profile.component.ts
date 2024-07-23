// import { Component } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list'; 
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { Location } from '@angular/common';


// @Component({

//   selector: 'app-edit-profile',
//   standalone: true,
//   imports: [ MatCardModule,
//     MatIconModule,
//     MatListModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatButtonModule,],
//   templateUrl: './edit-profile.component.html',
//   styleUrl: './edit-profile.component.scss'
// })
// export class EditProfileComponent {

//   constructor(private location: Location){}

//   goBack() {
//     this.location.back();
//   }
   
//   onSubmit(){

//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { finalize } from 'rxjs/operators';
// import { Location } from '@angular/common';
// // import { UserDetailService } from '../services/user-detail.service';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list'; 
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common';
// import { UserDetailService } from '../userdetail/service/user-detail.service';

// @Component({
//   selector: 'app-edit-profile',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatCardModule,
//     MatIconModule,
//     MatListModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatButtonModule
//   ],
//   templateUrl: './edit-profile.component.html',
//   styleUrls: ['./edit-profile.component.scss']
// })
// export class EditProfileComponent implements OnInit {
//   profileForm: FormGroup;
//   profileImageUrl: string | null = null;
//   userId: string = 'currentUserId'; 

//   constructor(
//     private fb: FormBuilder,
//     private location: Location,
//     private storage: AngularFireStorage,
//     private userDetailService:UserDetailService
//   ) {
//     this.profileForm = this.fb.group({
//       fullName: ['', Validators.required],
//       gender: ['', Validators.required],
//       bloodGroup: ['', Validators.required],
//       aadharNumber: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
//       city: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
   
//   }

 
//   goBack(): void {
//     this.location.back();
//   }

//   async onSubmit(): Promise<void> {
//     if (this.profileForm.valid) {
//       try {
//         const profileData = {
//           ...this.profileForm.value,
//           photoURL: this.profileImageUrl
//         };
//         await this.userDetailService.saveFormData(profileData);
//         this.goBack(); 
//       } catch (error) {
//         console.error('Error updating profile:', error);
//       }
//     }
//   }
// }



import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { UserDetailService } from '../userdetail/service/user-detail.service';

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
    ReactiveFormsModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  profileForm: FormGroup;
  profileImageUrl: string | null = null;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private userDetailService:UserDetailService

  ) {
    this.profileForm = this.fb.group({
      fullName: [''],
      gender: [''],
      bloodGroup: [''],
      aadharNumber: [''],
      city: ['']
    });
  }

  goBack() {
    this.location.back();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const filePath = `profile_pictures/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.profileImageUrl = url;
            
          });
        })
      ).subscribe();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.profileForm.valid) {
      try {
        const profileData = {
          ...this.profileForm.value,
          photoURL: this.profileImageUrl
        };
        await this.userDetailService.saveFormData(profileData);
        this.goBack(); 
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  }
}


