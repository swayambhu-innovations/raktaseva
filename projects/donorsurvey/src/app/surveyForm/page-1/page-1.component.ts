// import { Component, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import {
//   deleteObject,
//   getDownloadURL,
//   ref,
//   uploadBytesResumable,
//   Storage,
// } from '@angular/fire/storage';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-page-1',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './page-1.component.html',
//   styleUrl: './page-1.component.scss',
// })
// export class Page1Component implements OnInit {
//   surveyForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private storage: Storage,
//     private router: Router
//   ) {
//     this.surveyForm = this.fb.group({
//       name: [''],
//       dob: [''],
//       gender: [''],
//       phone: [''],
//       email: ['',Validators.email],
//       street: [''],
//       city: [''],
//       state: [''],
//     });
//   }

//   ngOnInit(): void {}

//   submit() {
//     // Get the form values
//     const formData = this.surveyForm.value;

//     // Store the form data in local storage
//     localStorage.setItem('surveyFormData', JSON.stringify(formData));
//     console.log('Form data saved:', formData);

//     this.router.navigate(['page-2']);
//   }
//   //Function for interacting with service file
//   // async onSubmit(): Promise<void> {
//   //   if (this.requirementForm.valid) {
//   //     try {
//   //       // Set the current timestamp
//   //       this.requirementForm.patchValue({
//   //         timestamp: new Date().toISOString(),
//   //       });

//   //       await this.requirementFormService.saveFormData(
//   //         this.requirementForm.value
//   //       );
//   //       this.requirementForm.reset();
//   //     } catch (error) {
//   //       console.error('Error saving data: ', error);
//   //     }
//   //   } else {
//   //     console.log('Form is invalid');
//   //   }
//   // }
// }






// import { Component, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   ReactiveFormsModule,
// } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-page-1',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './page-1.component.html',
//   styleUrl: './page-1.component.scss',
// })
// export class Page1Component implements OnInit {
//   surveyForm: FormGroup;
//   // currentStep: number = 0; 
//   // progressSteps: string[] = ['Step 1', 'Step 2', 'Step 3'];
//   progressSteps = ['Step 1', 'Step 2', 'Step 3'];
//   currentStep = 0;  
//   constructor(
//     private fb: FormBuilder,
//     private router: Router
//   ) {
//     this.surveyForm = this.fb.group({
//       name: ['', Validators.required],
//       dob: ['', Validators.required],
//       gender: ['', Validators.required],
//       aadhar: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
//       phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
//       email: ['', [Validators.required, Validators.email]],
//       street: ['', Validators.required],
//       city: ['', Validators.required],
//       state: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {
//     this.surveyForm.valueChanges.subscribe(() => {
//       this.updateButtonState();
//     });

//     this.updateButtonState();
//   }

//   updateButtonState() {
//     const formInvalid = !this.surveyForm.valid;
//   }

//   submit() {
//     if (this.surveyForm.valid) {
//       const formData = this.surveyForm.value;
//       localStorage.setItem('surveyFormData', JSON.stringify(formData));
//       console.log('Form data saved:', formData);

//       this.router.navigate(['page-2']);
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './page-1.component.html',
  styleUrl: './page-1.component.scss',
})
export class Page1Component implements OnInit {
  surveyForm: FormGroup;
  progressSteps = ['Step 1', 'Step 2', 'Step 3'];
  currentStep = 0;
  cities$: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private firestore: Firestore
  ) {
    this.surveyForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      aadhar: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });

    // Initialize the cities$ observable to fetch the cities from Firestore
    const citiesCollection = collection(this.firestore, 'donor-city');
    this.cities$ = collectionData(citiesCollection, { idField: 'id' });
  }

  ngOnInit(): void {
    this.surveyForm.valueChanges.subscribe(() => {
      this.updateButtonState();
    });

    this.updateButtonState();
  }

  updateButtonState() {
    const formInvalid = !this.surveyForm.valid;
  }

  submit() {
    if (this.surveyForm.valid) {
      const formData = this.surveyForm.value;
      localStorage.setItem('surveyFormData', JSON.stringify(formData));
      console.log('Form data saved:', formData);

      this.router.navigate(['page-2']);
    }
  }
}
