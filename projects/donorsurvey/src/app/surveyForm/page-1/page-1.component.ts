import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  Storage,
} from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './page-1.component.html',
  styleUrl: './page-1.component.scss',
})
export class Page1Component implements OnInit {
  surveyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storage: Storage,
    private router: Router
  ) {
    this.surveyForm = this.fb.group({
      name: [''],
      dob: [''],
      gender: [''],
      phone: [''],
      email: ['',Validators.email],
      street: [''],
      city: [''],
      state: [''],
    });
  }

  ngOnInit(): void {}

  submit() {
    // Get the form values
    const formData = this.surveyForm.value;

    // Store the form data in local storage
    localStorage.setItem('surveyFormData', JSON.stringify(formData));
    console.log('Form data saved:', formData);

    this.router.navigate(['page-2']);
  }
  //Function for interacting with service file
  // async onSubmit(): Promise<void> {
  //   if (this.requirementForm.valid) {
  //     try {
  //       // Set the current timestamp
  //       this.requirementForm.patchValue({
  //         timestamp: new Date().toISOString(),
  //       });

  //       await this.requirementFormService.saveFormData(
  //         this.requirementForm.value
  //       );
  //       this.requirementForm.reset();
  //     } catch (error) {
  //       console.error('Error saving data: ', error);
  //     }
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }
}
