// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-requirement-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './requirement-form.component.html',
//   styleUrls: ['./requirement-form.component.scss']
// })
// export class RequirementFormComponent implements OnInit {
//   requirementForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.requirementForm = this.fb.group({
//       patientname: [''],
//       // gender: [''],
//       // aadharnumber: [''],
//       // hospitalname: [''],
//       // cityname: [''],
//       // bloodcount: [''],
//       // bednumber: ['']
//     });
//   }

//   ngOnInit(): void {}

//   onSubmit(): void {
//     if (this.requirementForm.valid) {
//       console.log('Form Submitted', this.requirementForm.value);
//     }
//     else{
//       console.log("No")
//     }
//   }

//   onReportImage(): void {
//     // Handle the report image upload
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { doc, setDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-requirement-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.scss']
})
export class RequirementFormComponent implements OnInit {
  requirementForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.requirementForm = this.fb.group({
      patientname: [''],
      gender: [''],
      aadharnumber: [''],
      hospitalname: [''],
      cityname: [''],
      bloodcount: [''],
      bednumber: ['']
    });
  }

  ngOnInit(): void {}

  // async onSubmit(): Promise<void> {
  //   if (this.requirementForm.valid) {
  //     try {
  //       const formCollection = collection(this.firestore, 'form-data');
  //       await addDoc(formCollection, this.requirementForm.value);
  //       console.log(this.requirementForm.value)
  //       console.log('Data saved successfully');
  //     } catch (error) {
  //       console.error('Error saving data: ', error);
  //     }
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }

  async onSubmit(): Promise<void> {
    if (this.requirementForm.valid) {
      try {
        const formCollection = collection(this.firestore, 'form-data');
        const docRef = doc(formCollection); // Get a new document reference
        const formDataWithId = {
          ...this.requirementForm.value,
          id: docRef.id // Add the document ID to the form data
        };
  
        await setDoc(docRef, formDataWithId); // Use setDoc to set the document with the ID
        console.log(formDataWithId); // Log the form data with the document ID
        console.log('Data saved successfully');
      } catch (error) {
        console.error('Error saving data: ', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }

  onReportImage(): void {
   
  }
}
